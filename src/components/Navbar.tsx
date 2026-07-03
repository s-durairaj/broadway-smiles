import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/general-dentistry' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 h-[96px] shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-xl px-3 py-1.5">
            <img src="/images/logo.png" alt="Broadway Smiles" className="h-16 w-auto object-contain" />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent-light ${
                location.pathname === link.path ? 'text-accent-light' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:903-951-1244" className="flex items-center gap-2 text-sm font-medium hover:text-accent-light transition-colors">
            <Phone size={16} />
            903-951-1244
          </a>
          <Link
            to="/contact"
            className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Book Appointment
          </Link>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium py-1 ${
                  location.pathname === link.path ? 'text-accent-light' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:903-951-1244" className="flex items-center gap-2 text-sm font-medium py-1">
              <Phone size={16} />
              903-951-1244
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-lg text-center"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
