import { Link } from 'react-router-dom';
import { Calendar, Phone, GraduationCap } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarai Ayala',
    role: 'Office Manager',
    image: '/images/sarai1.png?v=3',
  },
  {
    name: 'Faith Watkins',
    role: 'Insurance Specialist',
    image: '/images/faith2.png',
  },
  {
    name: 'Teresa Juarez',
    role: 'Registered Dental Assistant (RDA)',
    image: '/images/Teresa.jpg?v=2',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Meet the Broadway Smiles Team</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Experienced, compassionate dental care — right here in Sulphur Springs since 2013.</p>
        </div>
      </section>

      {/* Dr. Shetty */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-accent-light rounded-2xl border-2 border-accent p-2">
              <img
                src="/images/Dr.Praveena.PNG?v=2"
                alt="Dr. Praveena Shetty"
                className="rounded-xl w-full object-cover object-top aspect-[3/4]"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-accent text-sm font-bold tracking-wider uppercase">Lead Dentist & Founder</span>
            <h2 className="text-3xl md:text-4xl mt-2 mb-4">Dr. Praveena Shetty, DMD</h2>
            <p className="text-muted mb-4 flex items-center gap-2">
              <GraduationCap size={18} />
              Boston University Goldman School of Dental Medicine
            </p>
            <div className="space-y-4 text-primary-dark leading-relaxed">
              <p>Dr. Shetty has been practicing in Sulphur Springs since 2013 and has called Hopkins County home ever since. She brings a gentle touch, a sharp diagnostic eye, and a deep commitment to honest, conservative care. She firmly believes in educating her patients — you'll never leave her chair confused about your treatment plan or your bill.</p>
              <p>Dr. Shetty is deeply committed to giving back to the Sulphur Springs community. Since 2013, she has organized free dental care events for uninsured and underinsured residents of Hopkins County — because she believes everyone deserves access to quality dental care, regardless of their ability to pay. She is also actively involved in local schools, bringing dental health education to children across the county.</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
      {['DMD', 'Boston University', 'Practicing since 2013', 'Community Care since 2013'].map((badge) => (
                <span key={badge} className="bg-accent-light text-primary-dark text-xs font-semibold px-3 py-1.5 rounded-full border border-warm-border">{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Team */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-accent-light rounded-xl overflow-hidden border border-warm-border">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-primary-dark">{member.name}</h3>
                  <p className="text-sm text-muted mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl mb-4">Ready to meet the team?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-primary-dark font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              <Calendar size={18} />
              Book Your First Appointment
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
