import PageHero from '../components/PageHero'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Connect with UASH"
        title="Contact Us"
        subtitle="Have questions, suggestions, or want to get involved? We'd love to hear from you!"
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
                  Email
                </div>
                <a
                  href="mailto:info@uzbekamericansh.org"
                  className="font-display text-lg text-ink-primary hover:text-brand-500"
                >
                  info@uzbekamericansh.org
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
                  Phone
                </div>
                <a
                  href="tel:+18324544376"
                  className="font-display text-lg text-ink-primary hover:text-brand-500"
                >
                  (832) 454-4376
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-500 text-white flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
                  Address
                </div>
                <div className="font-display text-lg text-ink-primary">
                  Katy, TX 77449
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="aspect-[4/3] mt-6 border border-brand-500/10 overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Katy%2C%20TX%2077449&t=m&z=10&output=embed&iwloc=near"
                title="Katy, TX 77449"
                aria-label="Katy, TX 77449"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          <div className="p-8 lg:p-10 bg-surface-200">
            <h2 className="font-display text-3xl text-ink-primary mb-8">
              Send us a message
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-surface-50 border border-brand-500/20 focus:outline-none focus:border-brand-500 text-ink-primary placeholder:text-ink-muted"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 bg-surface-50 border border-brand-500/20 focus:outline-none focus:border-brand-500 text-ink-primary placeholder:text-ink-muted"
              />
              <textarea
                rows="6"
                placeholder="Your message"
                className="w-full px-4 py-3 bg-surface-50 border border-brand-500/20 focus:outline-none focus:border-brand-500 text-ink-primary placeholder:text-ink-muted"
              />
              <button type="button" className="btn-primary w-full justify-center">
                Send Message <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
