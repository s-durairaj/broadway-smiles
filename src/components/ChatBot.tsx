import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';

type Role = 'bot' | 'user';

interface Message {
  id: number;
  role: Role;
  text: string;
}

type Flow = 'appointment' | 'question' | null;

type Step =
  | 'greeting'
  | 'name'
  | 'phone'
  | 'question_text'
  | 'date'
  | 'time'
  | 'reason'
  | 'confirm'
  | 'done'
  | 'error';

interface Collected {
  name: string;
  phone: string;
  question: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
}

const EMPTY: Collected = {
  name: '',
  phone: '',
  question: '',
  preferred_date: '',
  preferred_time: '',
  reason: '',
};

const TIME_REPLIES = ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Any time works'];
const REASON_REPLIES = ['Cleaning & Exam', 'Tooth Pain / Emergency', 'Dental Implants', "Children's Dentistry", 'Other'];

let msgId = 0;
const makeMsg = (role: Role, text: string): Message => ({ id: ++msgId, role, text });

function confirmText(c: Collected, flow: Flow) {
  if (flow === 'question') {
    return `Here's what we'll send:\n\n• Name: ${c.name}\n• Phone: ${c.phone}\n• Question: ${c.question}\n\nShall I submit this?`;
  }
  return `Here's your request:\n\n• Name: ${c.name}\n• Phone: ${c.phone}\n• Preferred Date: ${c.preferred_date}\n• Preferred Time: ${c.preferred_time}\n• Reason: ${c.reason}\n\nShall I submit this?`;
}

function buildMessage(c: Collected, flow: Flow) {
  if (flow === 'question') {
    return `Chat inquiry — ${c.question}`;
  }
  return `Appointment request via chat — Preferred: ${c.preferred_date}, ${c.preferred_time}. Reason: ${c.reason}`;
}

async function submitToNetlify(c: Collected, flow: Flow) {
  const params: Record<string, string> = {
    'form-name': 'contact',
    name: c.name,
    phone: c.phone,
    email: '',
    'preferred-date': c.preferred_date,
    message: buildMessage(c, flow),
  };
  await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params).toString(),
  });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>('greeting');
  const [flow, setFlow] = useState<Flow>(null);
  const [input, setInput] = useState('');
  const [collected, setCollected] = useState<Collected>(EMPTY);
  const [unread, setUnread] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([makeMsg('bot', "Hi there! I'm the Broadway Smiles virtual assistant. Would you like to request an appointment, or do you just have a question?")]);
      setStep('greeting');
    }
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!open && messages.length > 0 && messages[messages.length - 1].role === 'bot') {
      setUnread(true);
    }
  }, [messages, open]);

  const add = (...msgs: Message[]) => setMessages((prev) => [...prev, ...msgs]);

  const handleSubmit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || submitting) return;
    setInput('');

    const userMsg = makeMsg('user', trimmed);

    // Greeting branch
    if (step === 'greeting') {
      const isAppointment = trimmed.toLowerCase().includes('book') || trimmed.toLowerCase().includes('appointment');
      if (isAppointment) {
        setFlow('appointment');
        add(userMsg, makeMsg('bot', "Great! What's your full name?"));
        setStep('name');
      } else {
        setFlow('question');
        add(userMsg, makeMsg('bot', "Happy to help! What's your full name?"));
        setStep('name');
      }
      return;
    }

    // Collect fields
    const next = { ...collected };
    if (step === 'name') next.name = trimmed;
    if (step === 'phone') next.phone = trimmed;
    if (step === 'question_text') next.question = trimmed;
    if (step === 'date') next.preferred_date = trimmed;
    if (step === 'time') next.preferred_time = trimmed;
    if (step === 'reason') next.reason = trimmed;
    setCollected(next);

    // Determine next step
    if (step === 'name') {
      add(userMsg, makeMsg('bot', 'What phone number should we use to call you back?'));
      setStep('phone');
      return;
    }

    if (step === 'phone') {
      if (flow === 'question') {
        add(userMsg, makeMsg('bot', "What's your question?"));
        setStep('question_text');
      } else {
        add(userMsg, makeMsg('bot', 'What date works best for you? (e.g., July 15 or Next Tuesday)'));
        setStep('date');
      }
      return;
    }

    if (step === 'question_text') {
      add(userMsg, makeMsg('bot', confirmText(next, flow)));
      setStep('confirm');
      return;
    }

    if (step === 'date') {
      add(userMsg, makeMsg('bot', 'What time of day do you prefer?'));
      setStep('time');
      return;
    }

    if (step === 'time') {
      add(userMsg, makeMsg('bot', 'What brings you in? Select or type your reason.'));
      setStep('reason');
      return;
    }

    if (step === 'reason') {
      add(userMsg, makeMsg('bot', confirmText(next, flow)));
      setStep('confirm');
      return;
    }

    if (step === 'confirm') {
      const affirm = trimmed.toLowerCase();
      if (affirm.includes('yes') || affirm.includes('submit') || affirm.includes('confirm')) {
        add(userMsg);
        setSubmitting(true);
        try {
          await submitToNetlify(next, flow);
          add(makeMsg('bot', "Thanks! We'll call you back within 1 business hour."));
          setStep('done');
        } catch {
          add(makeMsg('bot', "We're sorry — something went wrong. Please call us at (903) 951-1244."));
          setStep('error');
        } finally {
          setSubmitting(false);
        }
      } else {
        add(userMsg, makeMsg('bot', "No problem! Let's start over. What's your full name?"));
        setCollected(EMPTY);
        setStep('name');
      }
      return;
    }
  };

  const reset = () => {
    setMessages([]);
    setStep('greeting');
    setFlow(null);
    setCollected(EMPTY);
    setTimeout(() => setMessages([makeMsg('bot', "Hi there! I'm the Broadway Smiles virtual assistant. Would you like to request an appointment, or do you just have a question?")]), 50);
  };

  const quickReplies: string[] =
    step === 'greeting' ? ['Yes, book an appointment', 'Just have a question'] :
    step === 'time' ? TIME_REPLIES :
    step === 'reason' ? REASON_REPLIES :
    step === 'confirm' ? ['Yes, submit', 'No, start over'] :
    [];

  const isDone = step === 'done' || step === 'error';

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && unread && (
          <span className="absolute -top-1 -right-1 bg-emergency text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">1</span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-warm-border overflow-hidden animate-in">
          <div className="bg-gradient-to-r from-primary to-[#6B4226] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 rounded-full p-1.5">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">Broadway Smiles</p>
                <p className="text-white/75 text-xs mt-0.5">Virtual Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors" aria-label="Minimize chat">
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-accent-light/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-br-sm'
                    : 'bg-white text-primary-dark border border-warm-border rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {submitting && (
              <div className="flex justify-start">
                <div className="bg-white border border-warm-border rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {quickReplies.length > 0 && !isDone && (
            <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 bg-white border-t border-warm-border">
              {quickReplies.map((r) => (
                <button
                  key={r}
                  onClick={() => handleSubmit(r)}
                  className="text-xs bg-accent-light text-primary-dark border border-warm-border rounded-full px-3 py-1 hover:bg-accent hover:text-white hover:border-accent transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {!isDone && (
            <div className="px-3 py-3 bg-white border-t border-warm-border flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(input); }}
                placeholder="Type a message…"
                disabled={submitting}
                className="flex-1 text-sm bg-accent-light rounded-full px-4 py-2 outline-none border border-warm-border focus:border-accent transition-colors placeholder:text-muted/60 disabled:opacity-50"
              />
              <button
                onClick={() => handleSubmit(input)}
                disabled={!input.trim() || submitting}
                className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 hover:bg-accent/90 transition-colors disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          )}

          {isDone && (
            <div className="px-3 py-3 bg-white border-t border-warm-border">
              <button
                onClick={reset}
                className="w-full text-sm text-accent border border-accent rounded-full py-1.5 hover:bg-accent hover:text-white transition-colors"
              >
                Start a new request
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
