import { Link } from 'react-router-dom';
import { Baby, Sparkles, Shield, Layers, Smile, Heart, Crown, Puzzle, Apple, Calendar, Phone } from 'lucide-react';

const services = [
  { icon: Baby, title: "Baby's First Dental Visit", desc: 'First visit recommended at 6 months. Gentle, fun, and stress-free.' },
  { icon: Sparkles, title: 'Preventive Cleanings', desc: 'Regular checkups and cleanings to keep growing smiles cavity-free.' },
  { icon: Shield, title: 'Fluoride Treatments', desc: 'Safe applications that strengthen enamel and prevent decay.' },
  { icon: Layers, title: 'Dental Sealants', desc: 'Thin protective coatings applied to back teeth to block cavity-causing bacteria.' },
  { icon: Smile, title: 'Tooth-Colored Fillings', desc: 'Composite fillings that blend naturally and restore cavity-affected teeth.' },
  { icon: Heart, title: 'Pulpotomies (Baby Root Canals)', desc: 'Saves the tooth and relieves pain when decay reaches the pulp.' },
  { icon: Crown, title: 'Stainless Steel Crowns', desc: 'Durable crowns that protect badly decayed baby teeth until they fall out naturally.' },
  { icon: Puzzle, title: 'Space Maintainers', desc: 'Custom appliances that hold space for permanent teeth when a baby tooth is lost early.' },
  { icon: Apple, title: 'Nutritional Counseling', desc: "Guidance on diet and habits that protect children's teeth as they grow." },
];

export default function ChildrensDentistry() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Children's Dentistry in Sulphur Springs, TX</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Building healthy smiles and happy dental visits from the very first tooth. We accept Texas Medicaid CHIP.</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-dark leading-relaxed">Broadway Smiles is your family's home for pediatric dental care. We see children from 6 months of age. The American Academy of Pediatric Dentistry (AAPD) recommends a first dental visit by 6 months of age or when the first tooth appears — whichever comes first.</p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-xl p-6 shadow-sm border border-warm-border hover:shadow-md transition-shadow">
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <s.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">{s.title}</h3>
                <p className="text-sm text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medicaid Callout */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-accent rounded-xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">We Accept Texas Medicaid CHIP</h3>
            <p className="text-white/90">Cost should never be a barrier to your child's dental health.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Schedule your child's first visit</h2>
          <p className="text-white/80 mb-6">Gentle, fun, and stress-free — we make dental visits something kids look forward to.</p>
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

      {/* Insurance Banner */}
      <section className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl md:text-3xl mb-3">We Accept ALL Insurances</h2>
          <p className="text-white/90 mb-6">Texas Medicaid, CHIP, Adult Medicare, and all PPO plans.</p>
          <Link to="/insurance" className="inline-block bg-white text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
            See All Insurance →
          </Link>
        </div>
      </section>
    </div>
  );
}
