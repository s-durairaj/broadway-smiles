import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

const scenarios = [
  { icon: '😣', title: 'Severe Toothache', desc: 'Intense throbbing pain is a sign of infection or nerve damage.' },
  { icon: '🦷', title: 'Knocked-Out Tooth', desc: 'Keep moist in milk or saliva and call immediately — time is critical.' },
  { icon: '💔', title: 'Broken or Cracked Tooth', desc: 'Can expose the nerve and worsen rapidly.' },
  { icon: '🧩', title: 'Lost Filling or Crown', desc: 'We can re-cement or replace same day.' },
  { icon: '🔴', title: 'Dental Abscess', desc: 'Painful swelling can signal a dangerous infection.' },
  { icon: '🩸', title: 'Soft Tissue Injury', desc: 'Lacerations to gums, cheek, or tongue need prompt evaluation.' },
  { icon: '😬', title: 'Loose Permanent Tooth', desc: 'Needs urgent attention to prevent loss.' },
  { icon: '🌡️', title: 'Jaw Pain or Swelling', desc: 'May indicate a serious infection.' },
  { icon: '💊', title: 'Post-Procedure Pain', desc: 'Unusual pain after a recent procedure — call us right away.' },
];

const firstAid = [
  { title: 'Call Us First', desc: '903-951-1244. We\'ll triage and get you seen fast.' },
  { title: 'Control Bleeding', desc: 'Bite on clean gauze 10–15 minutes.' },
  { title: 'Manage Pain', desc: 'OTC pain reliever + cold pack 20 min on/off.' },
  { title: 'Save the Tooth', desc: 'Rinse gently, keep moist in milk, get to us within 60 minutes.' },
  { title: 'Don\'t Self-Treat', desc: 'Don\'t place aspirin on gum tissue or probe the area.' },
];

const faqs = [
  { q: 'Do you offer same-day emergency appointments?', a: 'Yes — we reserve time each day for emergencies. Call 903-951-1244 first thing in the morning for the best chance of same-day care.' },
  { q: 'What if my emergency happens after hours?', a: 'Our AI phone agent answers calls 24/7 and can connect you to the on-call dentist for urgent situations.' },
  { q: 'Is emergency dental care more expensive?', a: 'We charge our standard rates for emergency visits. We accept all insurances including Texas Medicaid and CHIP.' },
  { q: 'What should I bring to an emergency visit?', a: 'Bring your ID, insurance card, and a list of any medications you take. If you have a knocked-out tooth, bring it with you.' },
  { q: 'Can children receive emergency dental care?', a: 'Absolutely. We treat dental emergencies for patients of all ages, including young children.' },
];

export default function EmergencyDental() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-emergency text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle size={48} className="text-white/80" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4">Emergency Dentist in Sulphur Springs, TX</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">Same-day emergency appointments. Call us now — don't wait through the pain.</p>
          <a href="tel:903-951-1244" className="inline-flex items-center gap-2 bg-white text-emergency font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-colors animate-pulse-slow">
            <Phone size={20} />
            Call 903-951-1244 Now
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-emergency transition-colors">
              Book Online
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6">Same-day appointments · Open Mon/Tue/Thu/Fri · AI phone answers after hours</p>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-12">Common Dental Emergencies We Treat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((s) => (
              <div key={s.title} className="bg-accent-light rounded-xl p-6 border border-warm-border hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First Aid Guide */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-12">Emergency First Aid Guide</h2>
          <div className="space-y-4">
            {firstAid.map((step, i) => (
              <div key={step.title} className="bg-white rounded-xl p-6 border border-warm-border flex gap-4 items-start">
                <div className="bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-primary-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Emergency FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-accent-light rounded-xl border border-warm-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-primary-dark text-sm">{faq.q}</span>
                  {openIndex === i ? <ChevronUp size={18} className="text-accent shrink-0" /> : <ChevronDown size={18} className="text-accent shrink-0" />}
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-4 text-sm text-muted">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">Don't wait through the pain.</h2>
          <p className="text-white/90 mb-6">Same-day emergency appointments available. Call now.</p>
          <a href="tel:903-951-1244" className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-colors">
            <Phone size={20} />
            Call 903-951-1244
          </a>
        </div>
      </section>
    </div>
  );
}
