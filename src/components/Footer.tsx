import { Link } from 'react-router-dom';
import { MapPin, Phone, Printer, Clock } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'General Dentistry', path: '/general-dentistry' },
  { label: "Children's Dentistry", path: '/childrens-dentistry' },
  { label: 'Dental Implants', path: '/dental-implants' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="bg-white rounded-xl inline-block px-4 py-2 mb-4">
            <img src="/images/logo.png" alt="Broadway Smiles" className="h-14 w-auto object-contain" />
          </div>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>1707 S Broadway St Suite 10<br />Sulphur Springs, TX 75482</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href="tel:903-951-1244" className="hover:text-white">903-951-1244</a>
            </div>
            <div className="flex items-center gap-2">
              <Printer size={16} className="shrink-0" />
              <span>903-335-8986</span>
            </div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-accent hover:text-accent-light transition-colors"
            >
              Follow us on Facebook
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-white/80 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-xl mb-4">Office Hours</h3>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0" />
              <div>
                <p>Monday, Tuesday, Thursday, Friday</p>
                <p className="font-semibold text-white">9:00 AM – 5:00 PM</p>
              </div>
            </div>
            <p>Wednesday, Saturday, Sunday: <span className="font-semibold text-white">Closed</span></p>
            <Link to="/emergency-dental" className="inline-block mt-2 text-accent hover:text-accent-light transition-colors">
              Emergency dental care
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs text-white/60">
          © 2026 Broadway Smiles. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
