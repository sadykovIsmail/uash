import PageHero from '../components/PageHero'
import { Check } from 'lucide-react'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        subtitle="A Houston nonprofit dedicated to celebrating, sharing, and preserving Uzbek heritage for our community and the next generation."
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page max-w-3xl">
          <p className="text-ink-body leading-relaxed text-lg">
            The Uzbek American Society of Houston (UASH) is a nonprofit organization
            with the mission to preserve, promote, and celebrate Uzbek culture and
            heritage. Established in December 2022 by a group of Uzbek immigrants in
            Houston, UASH seeks to strengthen cultural ties, educate the public about
            Uzbekistan&rsquo;s rich traditions, and create a welcoming space for community
            members to connect and thrive.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-200">
        <div className="container-page max-w-4xl">
          <div className="eyebrow mb-4">What We Do</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink-primary mb-10 leading-tight">
            Connecting community, culture, and opportunity
          </h2>
          <ul className="space-y-5">
            {WHAT_WE_DO.map(item => (
              <li key={item} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-ink-body leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-brand-500 text-white">
        <div className="container-page max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold mb-4">
            Our Vision
          </div>
          <p className="font-display text-3xl md:text-4xl leading-snug italic">
            A vibrant, united community where Uzbek heritage is cherished, celebrated,
            and shared with pride.
          </p>
        </div>
      </section>
    </>
  )
}

const WHAT_WE_DO = [
  'Host cultural festivals and traditional celebrations, such as Navruz and Independence Day.',
  'Offer language classes, art workshops, and culinary demonstrations.',
  'Collaborate with educational institutions and cultural organizations to raise awareness about Uzbek culture.',
  'Provide opportunities for cross-cultural engagement through community partnerships and events.',
  "Promote Tourism to Uzbekistan: Inspire people in Houston and beyond to explore Uzbekistan's breathtaking history, architecture, and landscapes by organizing informational sessions and supporting travel initiatives.",
  'Support Business Relationships: Facilitate connections between businesses in Houston and Uzbekistan, encouraging trade, investment, and cultural exchange.',
]
