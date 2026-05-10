import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Check, ArrowRight } from 'lucide-react'

export default function Membership() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Join the Uzbek American Society of Houston"
        subtitle="As a member of UASH, you will be part of a vibrant community dedicated to preserving and promoting Uzbek culture."
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl text-ink-primary mb-8 leading-tight">
            Membership benefits include:
          </h2>
          <ul className="space-y-5">
            {BENEFITS.map(b => (
              <li key={b} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-ink-body leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-200">
        <div className="container-page">
          <div className="eyebrow mb-4">Membership Levels</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink-primary leading-tight mb-12">
            Choose your level of support
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEVELS.map(level => (
              <div
                key={level.name}
                className="p-8 bg-surface-50 border border-brand-500/10 hover:border-brand-500 transition-colors flex flex-col"
              >
                <h3 className="font-display text-2xl text-ink-primary mb-2">
                  {level.name}
                </h3>
                <div className="font-display text-3xl text-brand-500 mb-6">
                  {level.price}
                  <span className="text-base text-ink-muted ml-1">/ year</span>
                </div>
                <Link to="/become-a-member" className="btn-primary justify-center mt-auto text-xs">
                  Become a Member
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/become-a-member" className="btn-ghost">
              Sign up now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

const BENEFITS = [
  'Right to vote on important corporate actions such as electing and removing directors and board members.',
  'Access to exclusive events and workshops.',
  'Discounts on classes and cultural programs.',
  'Networking opportunities with like-minded individuals.',
  'A platform to share your ideas and contribute to our mission.',
]

const LEVELS = [
  { name: 'Individual',  price: '$100' },
  { name: 'Family',      price: '$200' },
  { name: 'Student',     price: '$50'  },
  { name: 'Corporate',   price: '$500' },
]
