import { useState } from 'react';
import { Phone, MapPin, Printer, Clock, Calendar, AlertTriangle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
    });
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#6B4226] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Book an Appointment Online</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">Schedule 24/7 — no hold music required.</p>
        </div>
      </section>

      {/* Main Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Calendly Placeholder */}
          <div>
            <div className="bg-accent-light rounded-2xl border-2 border-dashed border-warm-border p-12 text-center">
              <Calendar size={48} className="text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary-dark mb-2">Online Booking</h3>
              <p className="text-muted mb-4">Our online scheduling system is coming soon. In the meantime, please call or use the form below.</p>
              <a href="tel:903-951-1244" className="inline-flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
                <Phone size={18} />
                Call 903-951-1244
              </a>
            </div>
          </div>

          {/* Right: Info Cards */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-warm-border shadow-sm flex gap-4">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Phone size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Phone</h3>
                <a href="tel:903-951-1244" className="text-accent font-semibold hover:underline">903-951-1244</a>
                <p className="text-sm text-muted">Mon/Tue/Thu/Fri 9am–5pm</p>
                <p className="text-sm text-muted">After hours: AI phone agent answers 24/7</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-warm-border shadow-sm flex gap-4">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <MapPin size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Location</h3>
                <p className="text-sm text-primary-dark">1707 S Broadway St Suite 10</p>
                <p className="text-sm text-primary-dark">Sulphur Springs, TX 75482</p>
                <a href="https://maps.google.com/?q=1707+S+Broadway+St+Suite+10+Sulphur+Springs+TX+75482" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-warm-border shadow-sm flex gap-4">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Printer size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Fax</h3>
                <p className="text-sm text-muted">903-335-8986</p>
                <p className="text-sm text-muted">Insurance & referrals</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-warm-border shadow-sm flex gap-4">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <Clock size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary-dark">Office Hours</h3>
                <p className="text-sm text-primary-dark">Mon/Tue/Thu/Fri: 9am–5pm</p>
                <p className="text-sm text-emergency font-semibold">Wed/Sat/Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Strip */}
      <section className="bg-emergency text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={28} />
            <span className="font-bold text-lg">Dental emergency? Call now.</span>
          </div>
          <a href="tel:903-951-1244" className="bg-white text-emergency font-bold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
            <Phone size={18} />
            Call 903-951-1244
          </a>
        </div>
      </section>

      {/* AI Phone Banner */}
      <section className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl mb-2">After hours? We still answer.</h3>
          <p className="text-white/80">Our AI phone agent answers 24/7 — get office hours, book appointments, or reach the on-call line for urgent situations.</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-accent-light py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Send Us a Message</h2>
          {submitted ? (
            <div className="bg-white rounded-xl p-8 text-center border border-warm-border">
              <div className="bg-green-100 text-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-xl font-bold text-primary-dark mb-2">Thank you!</h3>
              <p className="text-muted">We'll confirm your appointment by phone within 1 business day.</p>
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-8 border border-warm-border shadow-sm space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">Full Name</label>
                <input required type="text" name="name" className="w-full border border-warm-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-1">Phone Number</label>
                  <input required type="tel" name="phone" className="w-full border border-warm-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-1">Email</label>
                  <input required type="email" name="email" className="w-full border border-warm-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">Preferred Date</label>
                <input type="date" name="preferred-date" className="w-full border border-warm-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">Message</label>
                <textarea rows={4} name="message" className="w-full border border-warm-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors">
                Send Request
              </button>
              <p className="text-xs text-muted text-center">We'll confirm your appointment by phone within 1 business day.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
