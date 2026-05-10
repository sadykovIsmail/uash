import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-700 text-surface-200 mt-20">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="font-display text-2xl text-surface-50 mb-3">UASH</div>
          <p className="text-sm text-surface-200/80 leading-relaxed mb-5 max-w-xs">
            {/* TODO: Paste UASH's preferred footer tagline here. */}
            A Houston-based community celebrating Uzbek heritage, culture, and connection.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-brand-200"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-brand-200"><Instagram size={18} /></a>
            <a href="#" aria-label="X" className="hover:text-brand-200"><Twitter size={18} /></a>
          </div>
        </div>

        {/* Menu */}
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-300 mb-4">Menu</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-200">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-brand-200">About Us</Link></li>
            <li><Link to="/program-and-events" className="hover:text-brand-200">Program and Events</Link></li>
            <li><Link to="/membership" className="hover:text-brand-200">Membership</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-200">Gallery</Link></li>
            <li><Link to="/contact-us" className="hover:text-brand-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs uppercase tracking-widest text-brand-300 mb-4">Contact</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 text-brand-300" />
              <a href="mailto:info@uzbekamericansh.org" className="hover:text-brand-200">
                info@uzbekamericansh.org
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 text-brand-300" />
              <a href="tel:+18324544376" className="hover:text-brand-200">(832) 454-4376</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-brand-300" />
              <span>Katy, TX 77449</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-surface-200/10">
        <div className="container-page py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-surface-200/60">
          <div>© {new Date().getFullYear()} Uzbek American Society of Houston. All Rights Reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-brand-200">Privacy Policy</a>
            <a href="#" className="hover:text-brand-200">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
