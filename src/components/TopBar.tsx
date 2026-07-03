import { MapPin, Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-accent text-white h-10 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span className="hidden sm:inline">1707 S Broadway St Suite 10, Sulphur Springs, TX 75482</span>
          <span className="sm:hidden">Sulphur Springs, TX</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:903-951-1244" className="flex items-center gap-1 hover:underline">
            <Phone size={14} />
            <span>903-951-1244</span>
          </a>
          <span className="hidden md:inline-block bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            Accepting New Patients
          </span>
        </div>
      </div>
    </div>
  );
}
