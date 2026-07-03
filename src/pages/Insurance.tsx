import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ChevronDown, ChevronUp, CreditCard, DollarSign, Shield, Baby, Heart, FileText } from 'lucide-react';

const insuranceCards = [
  { icon: Shield, title: 'Texas Medicaid', desc: 'We are a proud Texas Medicaid provider for children and qualifying adults.' },
  { icon: Baby, title: 'CHIP', desc: "Children's Health Insurance Program dental coverage accepted." },
  { icon: Heart, title: 'Adult Medicare', desc: 'We accept Adult Medicare dental programs.' },
  { icon: FileText, title: 'PPO Insurance', desc: 'We file as a courtesy for all PPO dental insurance plans.' },
];

const faqs = [
  { q: 'Does Broadway Smiles accept Texas Medicaid?', a: 'Yes. We accept Texas Medicaid for children and qualifying adults, plus CHIP and Adult Medicare.' },
  { q: 'Do you accept PPO insurance?', a: 'Yes, we file as a courtesy for all PPO dental plans.' },
  { q: 'Do you offer financing?', a: 'Yes — CareCredit with 0% interest from 6 to 48 months.' },
];

export default function Insurance() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Insurance & Financing at Broadway Smiles</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">We believe cost should never stand between you and a healthy smile.</p>
        </div>
      </section>

      {/* Insurance Cards */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceCards.map((card) => (
              <div key={card.title} className="bg-accent-light rounded-xl p-8 border border-warm-border hover:shadow-md transition-shadow">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <card.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">{card.title}</h3>
                <p className="text-muted">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CareCredit */}
      <section className="bg-accent-light py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-accent rounded-xl p-8 text-center text-white">
            <CreditCard size={40} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">CareCredit Financing Available</h3>
            <p className="text-white/90 mb-6">0% interest from 6 to 48 months</p>
            <a href="https://www.carecredit.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
              Apply for CareCredit →
            </a>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl mb-6">Payment Methods Accepted</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cash', 'Credit/Debit Cards', 'CareCredit', 'Insurance'].map((m) => (
              <span key={m} className="bg-accent-light text-primary-dark text-sm font-medium px-4 py-2 rounded-full border border-warm-border flex items-center gap-2">
                <DollarSign size={14} className="text-accent" />
                {m}
              </span>
            ))}
            <span className="bg-emergency/10 text-emergency text-sm font-medium px-4 py-2 rounded-full border border-emergency/20 flex items-center gap-2">
              No personal checks
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Insurance FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-warm-border overflow-hidden">
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

      {/* CTA */}
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Questions about your coverage?</h2>
          <p className="text-white/80 mb-6">Our team will verify your benefits before your appointment.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2">
              <Calendar size={18} />
              Book Online Now
            </Link>
            <a href="tel:903-951-1244" className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary-dark transition-colors flex items-center gap-2">
              <Phone size={18} />
              Call 903-951-1244
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
