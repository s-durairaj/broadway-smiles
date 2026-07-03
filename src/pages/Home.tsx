import { Link } from 'react-router-dom';
import { Phone, Calendar, Check, Quote, MapPin } from 'lucide-react';

const services = [
  { icon: '🦷', title: 'General Dentistry', desc: 'Exams, cleanings, fillings, crowns, and root canals for the whole family.', link: '/general-dentistry' },
  { icon: '👶', title: "Children's Dentistry", desc: 'Gentle, fun visits from the very first tooth. We accept Texas Medicaid CHIP.', link: '/childrens-dentistry' },
  { icon: '🔩', title: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacement coordinated with a trusted specialist.', link: '/dental-implants' },
  { icon: '🚨', title: 'Emergency Dental Care', desc: 'Same-day emergency appointments for toothaches, broken teeth, and urgent pain.', link: '/emergency-dental' },
  { icon: '💳', title: 'Medicaid & Insurance', desc: 'Texas Medicaid, CHIP, Adult Medicare, and all PPO plans accepted.', link: '/insurance' },
  { icon: '🛡️', title: 'Preventive Care', desc: 'Cleanings, fluoride, sealants, and education to keep smiles healthy long-term.', link: '/general-dentistry' },
];

const whyItems = [
  'One-on-One Patient Education — Dr. Shetty explains every finding and every cost before treatment begins.',
  'State-of-the-Art Technology — Digital X-rays and modern instruments for accurate, comfortable care.',
  'Community-First Practice — Free dental care events for uninsured residents every year since 2013.',
  'Flexible Payment Options — CareCredit 0% financing, all insurances, Medicaid accepted.',
];

const locations = ['Sulphur Springs, TX', 'Como, TX', 'Cumby, TX', 'Emory, TX', 'Winnsboro, TX', 'Pittsburg, TX', 'Mt. Pleasant, TX', 'Sulphur Bluff, TX'];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-accent/20 text-accent-light text-sm font-semibold px-3 py-1 rounded-full border border-accent/30">
              Family dentist accepting Medicaid & CHIP
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              A Smile Your Whole Family Can Count On
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-xl">
              Dr. Praveena Shetty and the Broadway Smiles team provide gentle, comprehensive dental care for patients of all ages — from first visits to dental implants. We accept all insurances, including Texas Medicaid and CHIP.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2">
                <Calendar size={18} />
                Book Online Now
              </Link>
              <a href="tel:903-951-1244" className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors flex items-center gap-2">
                <Phone size={18} />
                Call 903-951-1244
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-white/80 pt-2">
              <span className="flex items-center gap-1"><Check size={14} className="text-accent-light" /> Book Online 24/7</span>
              <span className="flex items-center gap-1"><Check size={14} className="text-accent-light" /> Texas Medicaid & CHIP</span>
              <span className="flex items-center gap-1"><Check size={14} className="text-accent-light" /> Same-Day Emergency</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-primary-dark">
            <h3 className="flex items-center gap-2 text-xl font-heading mb-6">
              <Calendar className="text-accent" size={22} />
              Office Hours
            </h3>
            <div className="space-y-3 text-sm">
              {[
                ['Monday', '9:00 AM – 5:00 PM'],
                ['Tuesday', '9:00 AM – 5:00 PM'],
                ['Wednesday', 'Closed'],
                ['Thursday', '9:00 AM – 5:00 PM'],
                ['Friday', '9:00 AM – 5:00 PM'],
                ['Saturday – Sunday', 'Closed'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between border-b border-warm-border pb-2">
                  <span className="font-medium">{day}</span>
                  <span className={hours === 'Closed' ? 'text-emergency font-semibold' : 'text-muted'}>{hours}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-block mt-6 text-accent font-semibold hover:underline">
              Request an Appointment →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '13+', label: 'Years Serving Sulphur Springs' },
            { num: '2', label: 'Caring Dentists on Staff' },
            { num: 'All', label: 'Insurances Accepted' },
            { num: '5★', label: 'Patient-First Care' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl md:text-4xl font-heading text-accent">{stat.num}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-bold tracking-wider uppercase">What We Offer</span>
            <h2 className="text-3xl md:text-4xl mt-2 mb-4">Comprehensive Dental Care for Every Stage of Life</h2>
            <p className="text-muted max-w-2xl mx-auto">From your child's first dental visit to restorative implants, Broadway Smiles has you covered under one roof.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.title} to={s.link} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-warm-border group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-bold text-primary-dark mb-2 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Banner */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">We Accept ALL Insurances</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">Including Texas Medicaid, CHIP, Adult Medicare — so cost is never a barrier to your family's dental health.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Texas Medicaid', 'CHIP', 'Adult Medicare', 'PPO Plans', 'Most Private Insurance'].map((b) => (
              <span key={b} className="bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full">{b}</span>
            ))}
          </div>
          <Link to="/insurance" className="inline-block bg-white text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
            See All Insurance →
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent text-sm font-bold tracking-wider uppercase">Why Patients Choose Us</span>
            <h2 className="text-3xl md:text-4xl mt-2 mb-4">Dentistry Built Around You, Not a Template</h2>
            <p className="text-muted mb-8">Dr. Shetty takes an honest, conservative approach — she'll never recommend a procedure you don't need.</p>
            <div className="space-y-4">
              {whyItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check size={20} className="text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-primary-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-accent-light rounded-2xl p-8 shadow-lg">
            <Quote size={40} className="text-accent mb-4" />
            <blockquote className="text-lg text-primary-dark italic leading-relaxed mb-6">
              "I believe in providing the very best our profession has to offer — care tailored to fit into the lives and budgets of my patients."
            </blockquote>
            <div className="text-sm text-muted">
              <p className="font-bold text-primary-dark">— Dr. Praveena Shetty, DMD</p>
              <p>Boston University Goldman School of Dental Medicine</p>
            </div>
            <Link to="/about" className="inline-block mt-6 bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
              Meet Dr. Shetty →
            </Link>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <MapPin size={32} className="text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl mb-4">Proudly Serving Sulphur Springs & Surrounding Communities</h2>
          <p className="text-muted max-w-2xl mx-auto mb-8">Patients travel from across Hopkins County and beyond for Broadway Smiles' family-centered care.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <span key={loc} className="bg-white text-primary-dark text-sm font-medium px-4 py-2 rounded-full border border-warm-border shadow-sm">{loc}</span>
            ))}
          </div>
        </div>
      </section>

      {/* AI Phone Banner */}
      <section className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl mb-2">After hours? We still answer.</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">Our AI phone agent answers calls 24/7 — get office hours, book appointments, or reach the on-call line for urgent situations.</p>
          <a href="tel:903-951-1244" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
            <Phone size={18} />
            Call Now — 903-951-1244
          </a>
        </div>
      </section>
    </div>
  );
}
