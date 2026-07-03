import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, ChevronDown, ChevronUp } from 'lucide-react';

const comparison = [
  { feature: 'Looks natural', implant: 'Yes', bridge: 'Yes', denture: 'Usually' },
  { feature: 'Permanent', implant: 'Yes', bridge: 'Yes', denture: 'Removable' },
  { feature: 'Preserves jawbone', implant: 'Yes', bridge: 'No', denture: 'No' },
  { feature: 'Affects adjacent teeth', implant: 'No', bridge: 'Yes', denture: 'No' },
  { feature: 'Longevity', implant: '20+ years', bridge: '10–15 years', denture: '5–8 years' },
  { feature: 'Daily care', implant: 'Brush & floss normally', bridge: 'Special flossing', denture: 'Remove & clean daily' },
];

const steps = [
  { num: '1', title: 'Consultation', desc: 'Dr. Shetty evaluates bone density and health.' },
  { num: '2', title: 'Implant Placement', desc: 'Oral surgery specialist places the titanium post.' },
  { num: '3', title: 'Healing', desc: 'Over 3–6 months the implant fuses with your jawbone.' },
  { num: '4', title: 'Abutment Placement', desc: 'Connector piece attached to the implant.' },
  { num: '5', title: 'Crown Placement', desc: 'Dr. Shetty places your custom natural-looking crown.' },
];

const faqs = [
  { q: 'How long do dental implants last?', a: 'With proper care, dental implants can last 20+ years — often a lifetime. Regular checkups and good oral hygiene are key.' },
  { q: 'Is the implant procedure painful?', a: 'The implant placement is performed by an oral surgeon with local anesthesia. Most patients report minimal discomfort, similar to a tooth extraction.' },
  { q: 'Am I a candidate for dental implants?', a: 'Most adults with healthy gums and sufficient bone density are candidates. Dr. Shetty will evaluate your specific situation during your consultation.' },
];

export default function DentalImplants() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Dental Implants in Sulphur Springs, TX</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Permanent, natural-looking tooth replacement that lasts a lifetime.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-dark leading-relaxed">A dental implant is a titanium post placed into the jawbone acting as an artificial tooth root. Dr. Shetty handles the crown (visible tooth) at Broadway Smiles and coordinates with a trusted oral surgeon for the implant placement.</p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Implant vs. Bridge vs. Denture</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm border border-warm-border overflow-hidden">
              <thead>
                <tr className="bg-accent text-white">
                  <th className="text-left px-4 py-3 font-semibold text-sm">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold text-sm">Implant</th>
                  <th className="text-center px-4 py-3 font-semibold text-sm">Bridge</th>
                  <th className="text-center px-4 py-3 font-semibold text-sm">Denture</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-accent-light/50'}>
                    <td className="px-4 py-3 text-sm font-medium text-primary-dark">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-center text-green-700 font-medium">{row.implant}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted">{row.bridge}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted">{row.denture}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-12">The 5-Step Implant Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-accent text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Frequently Asked Questions</h2>
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
          <h2 className="text-3xl md:text-4xl mb-4">Ready to restore your smile?</h2>
          <p className="text-white/80 mb-6">Schedule a consultation with Dr. Shetty to see if implants are right for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2">
              <Calendar size={18} />
              Book a Consultation
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
