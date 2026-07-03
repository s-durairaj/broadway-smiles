import { Link } from 'react-router-dom';
import { Stethoscope, Shield, Crown, Drill, Sparkles, Scissors, Smile, HeartPulse, Moon, Cloud, Calendar, Phone, AlertTriangle } from 'lucide-react';

const services = [
  { icon: Stethoscope, title: 'Exams & Cleanings', desc: 'Comprehensive oral exams and professional cleanings to prevent cavities and gum disease.' },
  { icon: Shield, title: 'Dental Fillings', desc: 'Tooth-colored composite fillings that restore strength and blend naturally with your smile.' },
  { icon: Crown, title: 'Dental Crowns', desc: 'Custom crowns that protect and restore damaged or weakened teeth.' },
  { icon: Drill, title: 'Root Canal Treatment', desc: 'Gentle, effective root canal therapy to save infected teeth and relieve pain.' },
  { icon: Sparkles, title: 'Teeth Whitening', desc: 'Professional-grade whitening to brighten your smile safely and effectively.' },
  { icon: Scissors, title: 'Tooth Extractions', desc: 'Simple and surgical extractions performed with care and precision.' },
  { icon: Smile, title: 'Dentures & Partials', desc: 'Custom dentures and partial dentures to restore function and confidence.' },
  { icon: HeartPulse, title: 'Gum Disease Treatment', desc: 'Scaling and root planing to treat periodontal disease and protect gum health.' },
  { icon: Moon, title: 'Night Guards', desc: 'Custom mouthguards to protect against grinding and clenching while you sleep.' },
  { icon: Cloud, title: 'Nitrous Oxide', desc: 'Nitrous oxide (laughing gas) available for patients with dental anxiety. Safe, effective, and available for adults and children.' },
];

export default function GeneralDentistry() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">General Dentistry in Sulphur Springs, TX</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">From routine cleanings to root canals — all your dental needs under one roof.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-dark leading-relaxed">At Broadway Smiles, Dr. Praveena Shetty provides comprehensive general dentistry for patients of all ages using state-of-the-art technology, digital X-rays, and a gentle approach that puts your comfort first.</p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 shadow-sm border border-warm-border flex gap-4 hover:shadow-md transition-shadow">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                  <s.icon size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-dark mb-1">{s.title}</h3>
                  <p className="text-sm text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Banner */}
      <section className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl mb-3">We Accept ALL Insurances</h2>
          <p className="text-white/90 mb-6">Including Texas Medicaid, CHIP, and all PPO plans.</p>
          <Link to="/insurance" className="inline-block bg-white text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
            See All Insurance →
          </Link>
        </div>
      </section>

      {/* Emergency Callout */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-emergency/10 border border-emergency/20 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4">
            <AlertTriangle size={32} className="text-emergency shrink-0" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-primary-dark">Dental Emergency?</h3>
              <p className="text-sm text-muted">We offer same-day emergency appointments for toothaches, broken teeth, and urgent pain.</p>
            </div>
            <Link to="/emergency-dental" className="bg-emergency text-white font-bold px-5 py-2.5 rounded-lg hover:bg-emergency/90 transition-colors whitespace-nowrap">
              Emergency Care →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Ready for your checkup?</h2>
          <p className="text-white/80 mb-6">New patients welcome — all ages, all insurances.</p>
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
