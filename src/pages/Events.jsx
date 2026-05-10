import PageHero from '../components/PageHero'
import { Calendar } from 'lucide-react'

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Programs and Events"
        title="Experience Uzbek Culture with UASH"
        subtitle="We offer a wide range of programs and events designed to engage, educate, and inspire."
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map(p => (
              <article
                key={p.title}
                className="p-8 border border-brand-500/10 hover:border-brand-500 transition-colors"
              >
                <h3 className="font-display text-2xl text-ink-primary mb-3 leading-tight">
                  {p.title}
                </h3>
                <p className="text-ink-body leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-200">
        <div className="container-page max-w-4xl">
          <div className="eyebrow mb-4">Upcoming Events</div>
          <h2 className="font-display text-3xl md:text-4xl text-ink-primary leading-tight mb-10">
            Mark your calendar
          </h2>

          <ul className="space-y-4">
            {UPCOMING.map(e => (
              <li
                key={e.title}
                className="flex items-start gap-5 p-6 bg-surface-50 border border-brand-500/10"
              >
                <span className="flex-shrink-0 w-12 h-12 bg-brand-500 text-white flex items-center justify-center">
                  <Calendar size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <div className="font-display text-xl text-ink-primary leading-tight">
                    {e.title}
                  </div>
                  <div className="text-sm text-brand-500 mt-1 uppercase tracking-wider font-medium">
                    {e.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

const PROGRAMS = [
  {
    title: 'Cultural Festivals',
    body: 'Celebrate Navruz, Independence Day, and other traditional Uzbek holidays with music, dance, food, and community spirit.',
  },
  {
    title: 'Language & Art Classes',
    body: 'Learn Uzbek language, calligraphy, traditional crafts, and ceramic art in hands-on workshops.',
  },
  {
    title: 'Sport Activities',
    body: 'Organize weekly soccer games and other community sports.',
  },
  {
    title: 'Plov & Cuisine Nights',
    body: 'Explore the flavors of Uzbekistan with plov-cooking demonstrations, bread-making classes, and food-tasting events.',
  },
  {
    title: 'Educational Lectures',
    body: 'Attend talks about Uzbekistan\u2019s history, architecture, and contributions to art and science.',
  },
  {
    title: 'Youth Programs',
    body: 'Connect younger generations with Uzbek traditions through storytelling, games, and cultural mentoring.',
  },
]

const UPCOMING = [
  { title: 'Navruz Spring Festival',          date: 'March 2025'     },
  { title: 'Eid Celebration',                  date: 'April 2025'     },
  { title: 'Independence Day Celebration',     date: 'September 2025' },
]
