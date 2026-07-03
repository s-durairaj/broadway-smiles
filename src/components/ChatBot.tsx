import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Role = 'bot' | 'user';

interface Message {
  id: number;
  role: Role;
  text: string;
}

type Step =
  | 'greeting'
  | 'name'
  | 'phone'
  | 'date'
  | 'time'
  | 'reason'
  | 'confirm'
  | 'done'
  | 'error';

interface Collected {
  name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
}

const QUICK_REPLIES: Partial<Record<Step, string[]>> = {
  greeting: ['Yes, book an appointment', 'Just have a question'],
  time: ['Morning (8am–12pm)', 'Afternoon (12pm–5pm)', 'Any time works'],
  reason: [
    'Cleaning & Exam',
    'Tooth Pain / Emergency',
    'Dental Implants',
    "Children's Dentistry",
    'Other',
  ],
};

const BOT_MESSAGES: Record<Step, string> = {
  greeting:
    "Hi there! I'm the Broadway Smiles virtual assistant. Would you like to request an appointment?",
  name: "Great! What's your full name?",
  phone: 'What phone number should we use to contact you?',
  date: 'What date works best for you? (e.g., July 10 or Next Monday)',
  time: 'What time of day do you prefer?',
  reason: 'What brings you in? Please select or type your reason for the visit.',
  confirm: '', // generated dynamically
  done: "You're all set! We received your request and will call you within 1 business day to confirm your appointment. Thank you!",
  error:
    "We're sorry — something went wrong submitting your request. Please call us directly at (903) 951-1244.",
};

const NEXT_STEP: Record<Step, Step> = {
  greeting: 'name',
  name: 'phone',
  phone: 'date',
  date: 'time',
  time: 'reason',
  reason: 'confirm',
  confirm: 'done',
  done: 'done',
  error: 'error',
};

let msgId = 0;
const makeMsg = (role: Role, text: string): Message => ({ id: ++msgId, role, text });

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>('greeting');
  const [input, setInput] = useState('');
  const [collected, setCollected] = useState<Collected>({
    name: '',
    phone: '',
    preferred_date: '',
    preferred_time: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed greeting on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([makeMsg('bot', BOT_MESSAGES.greeting)]);
      setStep('greeting');
    }
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show unread badge when closed and a bot msg arrives
  useEffect(() => {
    if (!open && messages.length > 0 && messages[messages.length - 1].role === 'bot') {
      setUnread(true);
    }
  }, [messages, open]);

  const addMessages = (msgs: Message[]) =>
    setMessages((prev) => [...prev, ...msgs]);

  const confirmText = (c: Collected) =>
    `Here's your request summary:\n\n• Name: ${c.name}\n• Phone: ${c.phone}\n• Preferred Date: ${c.preferred_date}\n• Preferred Time: ${c.preferred_time}\n• Reason: ${c.reason}\n\nShall I submit this?`;

  const handleSubmit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput('');

    // Special case: user doesn't want appointment from greeting
    if (step === 'greeting' && trimmed.toLowerCase().includes('question')) {
      addMessages([
        makeMsg('user', trimmed),
        makeMsg(
          'bot',
          'Of course! Please call us at (903) 951-1244 or visit our Contact page and we\'ll be happy to help.'
        ),
      ]);
      setStep('done');
      return;
    }

    // Build updated collected state inline
    const next = { ...collected };
    if (step === 'name') next.name = trimmed;
    if (step === 'phone') next.phone = trimmed;
    if (step === 'date') next.preferred_date = trimmed;
    if (step === 'time') next.preferred_time = trimmed;
    if (step === 'reason') next.reason = trimmed;
    setCollected(next);

    const userMsg = makeMsg('user', trimmed);

    // Confirmation step
    if (step === 'reason') {
      addMessages([userMsg, makeMsg('bot', confirmText(next))]);
      setStep('confirm');
      return;
    }

    // User confirmed submission
    if (step === 'confirm') {
      const affirm = trimmed.toLowerCase();
      if (affirm.includes('yes') || affirm.includes('submit') || affirm.includes('confirm')) {
        addMessages([userMsg]);
        setLoading(true);
        const { error } = await supabase.from('appointment_requests').insert({
          name: collected.name,
          phone: collected.phone,
          preferred_date: collected.preferred_date,
          preferred_time: collected.preferred_time,
          reason: collected.reason,
        });
        setLoading(false);
        const nextStep: Step = error ? 'error' : 'done';
        addMessages([makeMsg('bot', BOT_MESSAGES[nextStep])]);
        setStep(nextStep);
      } else {
        addMessages([
          userMsg,
          makeMsg('bot', "No problem! Let's start over. What's your full name?"),
        ]);
        setCollected({ name: '', phone: '', preferred_date: '', preferred_time: '', reason: '' });
        setStep('name');
      }
      return;
    }

    // Default: advance to next step
    const nextStep = NEXT_STEP[step];
    addMessages([userMsg, makeMsg('bot', BOT_MESSAGES[nextStep])]);
    setStep(nextStep);
  };

  const handleQuickReply = (reply: string) => handleSubmit(reply);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit(input);
  };

  const isDone = step === 'done' || step === 'error';
  const quickReplies = QUICK_REPLIES[step] ?? [];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
        {!open && unread && (
          <span className="absolute -top-1 -right-1 bg-emergency text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            1
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-warm-border overflow-hidden animate-in">
          {/* Header */}
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
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Minimize chat"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-accent-light/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-br-sm'
                      : 'bg-white text-primary-dark border border-warm-border rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-warm-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-muted rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && !isDone && (
            <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 bg-white border-t border-warm-border">
              {quickReplies.map((r) => (
                <button
                  key={r}
                  onClick={() => handleQuickReply(r)}
                  className="text-xs bg-accent-light text-primary-dark border border-warm-border rounded-full px-3 py-1 hover:bg-accent hover:text-white hover:border-accent transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!isDone && (
            <div className="px-3 py-3 bg-white border-t border-warm-border flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                className="flex-1 text-sm bg-accent-light rounded-full px-4 py-2 outline-none border border-warm-border focus:border-accent transition-colors placeholder:text-muted/60"
              />
              <button
                onClick={() => handleSubmit(input)}
                disabled={!input.trim() || loading}
                className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center shrink-0 hover:bg-accent/90 transition-colors disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          )}

          {isDone && step === 'done' && (
            <div className="px-3 py-3 bg-white border-t border-warm-border">
              <button
                onClick={() => {
                  setMessages([]);
                  setStep('greeting');
                  setCollected({ name: '', phone: '', preferred_date: '', preferred_time: '', reason: '' });
                  setTimeout(() => setMessages([makeMsg('bot', BOT_MESSAGES.greeting)]), 50);
                }}
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
