import { useState, useEffect } from 'react';
import { Phone, ChevronDown, ChevronUp } from 'lucide-react';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Does Broadway Smiles accept Texas Medicaid?","acceptedAnswer":{"@type":"Answer","text":"Yes. We accept Texas Medicaid for children and qualifying adults, plus CHIP and Adult Medicare."}},
    {"@type":"Question","name":"Do you offer emergency dental care?","acceptedAnswer":{"@type":"Answer","text":"Yes — same-day emergency appointments. Call 903-951-1244."}},
    {"@type":"Question","name":"When should my child first see a dentist?","acceptedAnswer":{"@type":"Answer","text":"The AAPD recommends a first visit at 6 months or when the first tooth appears."}},
    {"@type":"Question","name":"Do you offer dental implants?","acceptedAnswer":{"@type":"Answer","text":"Yes. Dr. Shetty handles the crown; a trusted oral surgeon handles implant placement."}},
    {"@type":"Question","name":"Do you offer financing?","acceptedAnswer":{"@type":"Answer","text":"Yes — CareCredit with 0% interest from 6 to 48 months."}}
  ]
};

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const sections: FAQSection[] = [
  {
    title: 'Appointments & Scheduling',
    items: [
      { q: 'How do I schedule an appointment?', a: 'Book online 24/7 at our website, call 903-951-1244, or use the contact form. New patients always welcome.' },
      { q: 'What are your office hours?', a: 'Monday, Tuesday, Thursday, Friday 9:00 AM – 5:00 PM. Closed Wednesday, Saturday, Sunday.' },
      { q: 'Do you accept new patients?', a: 'Yes — all ages, all insurances.' },
      { q: 'How early should I arrive for my first appointment?', a: '15 minutes early to complete paperwork.' },
    ],
  },
  {
    title: 'Insurance & Payment',
    items: [
      { q: 'Does Broadway Smiles accept Texas Medicaid?', a: 'Yes. We accept Texas Medicaid for children and qualifying adults, plus CHIP, Adult Medicare, and Medicare Waiver.' },
      { q: 'Do you accept PPO insurance?', a: 'Yes, we file as a courtesy for all PPO dental plans.' },
      { q: 'Do you offer financing?', a: 'Yes — CareCredit with 0% interest from 6 to 48 months.' },
      { q: 'What payment do you accept?', a: 'Cash, credit/debit cards, CareCredit, and insurance. No personal checks.' },
    ],
  },
  {
    title: "Children's Dentistry",
    items: [
      { q: 'When should my child first see a dentist?', a: 'AAPD recommends first visit at 6 months or when the first tooth appears.' },
      { q: 'Do you accept CHIP?', a: 'Yes, we accept Texas CHIP for children.' },
      { q: 'My child is nervous — what do you do?', a: 'Gentle approach + nitrous oxide (laughing gas) available for nervous young patients.' },
    ],
  },
  {
    title: 'Services & Treatments',
    items: [
      { q: 'Do you do dental implants?', a: 'Yes — Dr. Shetty handles the crown; an oral surgeon specialist handles placement.' },
      { q: 'How often do I need a cleaning?', a: 'Every 6 months for most patients; every 3–4 months for gum disease patients.' },
      { q: 'Can I get same-day for a toothache?', a: 'We do our best. Call 903-951-1244 first thing in the morning.' },
    ],
  },
  {
    title: 'Emergency Dental',
    items: [
      { q: 'Do you offer emergency dental care?', a: 'Yes — same-day emergency appointments in Sulphur Springs. Call 903-951-1244.' },
      { q: 'What do I do if I knock out a tooth?', a: 'Rinse gently, keep moist in milk or saliva, call us — get to us within 60 minutes.' },
      { q: 'What counts as an emergency?', a: 'Severe pain, swelling, bleeding, broken teeth, lost crowns, facial injuries.' },
    ],
  },
  {
    title: 'Sedation & Comfort',
    items: [
      { q: 'Do you offer sedation?', a: 'Yes — nitrous oxide for mild anxiety and oral sedation for deeper relaxation. Adults and children.' },
      { q: 'Do you offer payment plans?', a: 'Yes — CareCredit 0% interest from 6 to 48 months. No personal checks.' },
    ],
  },
];

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Frequently Asked Questions</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Everything you need to know about Broadway Smiles.</p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl md:text-2xl font-heading text-primary-dark mb-6 pb-2 border-b border-warm-border">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => {
                  const key = `${section.title}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="bg-accent-light rounded-xl border border-warm-border overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <span className="font-semibold text-primary-dark text-sm pr-4">{item.q}</span>
                        {isOpen ? <ChevronUp size={18} className="text-accent shrink-0" /> : <ChevronDown size={18} className="text-accent shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-sm text-muted">{item.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">Still have questions?</h2>
          <p className="text-white/90 mb-6">Our friendly team is happy to help.</p>
          <a href="tel:903-951-1244" className="inline-flex items-center gap-2 bg-white text-primary-dark font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/90 transition-colors">
            <Phone size={20} />
            Call 903-951-1244
          </a>
        </div>
      </section>
    </div>
  );
}
