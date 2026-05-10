import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Mail, Phone } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about-us', label: 'About Us' },
  { to: '/program-and-events', label: 'Upcoming Events' },
  { to: '/membership', label: 'Membership' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/discover-uzbekistan', label: 'Discover Uzbekistan' },
  { to: '/contact-us', label: 'Contact Us' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-surface-50/95 backdrop-blur border-b border-brand-500/10">
      {/* Top contact strip */}
      <div className="bg-brand-500 text-surface-50 text-sm">
        <div className="container-page flex flex-wrap items-center justify-between py-2 gap-3">
          <div className="flex items-center gap-5">
            <a href="mailto:info@uzbekamericansh.org" className="inline-flex items-center gap-2 hover:text-brand-200">
              <Mail size={14} /> info@uzbekamericansh.org
            </a>
            <a href="tel:+18324544376" className="inline-flex items-center gap-2 hover:text-brand-200">
              <Phone size={14} /> (832) 454-4376
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/membership" className="hover:text-brand-200">Become a Member</Link>
            <span className="opacity-30">|</span>
            <Link to="/contact-us" className="hover:text-brand-200">Donate Now</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          {/* Replace /images/logo.png with your downloaded logo file */}
          <img
            src="/images/logo.png"
            alt="UASH"
            className="h-12 w-12 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="leading-tight">
            <div className="font-display text-xl text-brand-500">UASH</div>
            <div className="text-[11px] uppercase tracking-widest text-ink-primary/60">
              Uzbek American Society of Houston
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-500' : 'text-ink-primary hover:text-brand-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-brand-500"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="lg:hidden border-t border-brand-500/10 bg-surface-50">
          <div className="container-page py-3 flex flex-col">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 border-b border-brand-500/10 text-base ${
                    isActive ? 'text-brand-500 font-semibold' : 'text-ink-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
