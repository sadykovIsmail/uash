import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section className="bg-surface-50 border-b border-brand-500/10">
        <div className="container-page pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-4xl">
            <div className="eyebrow mb-5">Houston, Texas</div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ink-primary">
              Welcome to the Uzbek American Society of Houston (UASH)
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-brand-500 font-display italic max-w-3xl leading-snug">
              Preserving and Celebrating Uzbekistan&rsquo;s Rich Heritage in the Heart of Texas
            </p>

            <p className="mt-6 text-base md:text-lg text-ink-body max-w-2xl leading-relaxed">
              At UASH, we are committed to preserving and promoting the vibrant cultural
              identity, traditions, and values of Uzbekistan. Through community events,
              educational programs, and cultural celebrations, we aim to connect generations,
              foster understanding, and share the beauty of Uzbek heritage with the Greater
              Houston area.
            </p>

            <p className="mt-5 text-base md:text-lg text-ink-primary max-w-2xl leading-relaxed font-medium">
              Join us on this journey to celebrate Uzbekistan&rsquo;s unique legacy while
              building bridges across cultures.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/become-a-member" className="btn-primary">
                Become a Member <ArrowRight size={16} />
              </Link>
              <a href="#about" className="btn-ghost">
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  ABOUT  ───────────────────────── */}
      <section id="about" className="py-20 lg:py-28 bg-surface-50">
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="eyebrow mb-4">About Us</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink-primary leading-tight">
              Who We Are
            </h2>
            <p className="mt-6 text-ink-body leading-relaxed">
              The Uzbek American Society of Houston (UASH) is a nonprofit organization
              with the mission to preserve, promote, and celebrate Uzbek culture and heritage.
              Established in December 2022 by a group of Uzbek immigrants in Houston, UASH
              seeks to strengthen cultural ties, educate the public about Uzbekistan&rsquo;s
              rich traditions, and create a welcoming space for community members to connect
              and thrive.
            </p>
            <div className="mt-8">
              <Link to="/about-us" className="btn-ghost">
                Know More <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div>
            <img
              src="/images/about.jpg"
              alt="UASH community gathering"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────  GET INVOLVED  ───────────────────────── */}
      <section className="py-20 lg:py-24 bg-surface-200">
        <div className="container-page">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">Get Involved</div>
            <h2 className="font-display text-4xl md:text-5xl text-ink-primary leading-tight">
              Support Uzbek Culture in Houston
            </h2>
            <p className="mt-5 text-ink-body max-w-xl leading-relaxed">
              Your involvement is vital to the success of our mission. Here are ways
              you can help:
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INVOLVED.map(card => (
              <div
                key={card.title}
                className="group p-8 bg-surface-50 border border-brand-500/10 hover:border-brand-500 transition-colors"
              >
                <img
                  src={card.icon}
                  alt=""
                  className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-display text-2xl text-ink-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-ink-body leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────  GALLERY  ───────────────────────── */}
      <section className="py-20 lg:py-28 bg-surface-50">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <div className="eyebrow mb-4">Gallery</div>
              <h2 className="font-display text-4xl md:text-5xl text-ink-primary leading-tight">
                Discover the Beauty of Uzbek Culture
              </h2>
            </div>
            <Link to="/gallery" className="btn-ghost">
              View the Full Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {GALLERY_THUMBS.map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden bg-surface-300 ${
                  i === 0 || i === 3 ? 'row-span-2 aspect-[3/5]' : 'aspect-square'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

const INVOLVED = [
  {
    icon: '/images/icon-volunteer.png',
    title: 'Volunteer',
    body: 'Share your time and skills by assisting at events or teaching a workshop.',
  },
  {
    icon: '/images/icon-donate.png',
    title: 'Donate',
    body: 'Support our programs and initiatives with a one-time or recurring gift.',
  },
  {
    icon: '/images/icon-sponsor.png',
    title: 'Sponsor an Event',
    body: 'Partner with us to make our cultural events even more impactful.',
  },
  {
    icon: '/images/icon-collaborate.png',
    title: 'Collaborate',
    body: 'Work with us to create meaningful cross-cultural connections.',
  },
]

const GALLERY_THUMBS = [
  '/images/gallery-22-50-19.jpg',
  '/images/gallery-22-51-04.jpg',
  '/images/gallery-22-50-25.jpg',
  '/images/gallery-22-35-38.jpg',
  '/images/gallery-23-04-16.jpg',
  '/images/gallery-22-50-36.jpg',
  '/images/gallery-23-03-57.jpg',
  '/images/gallery-22-58-11.jpg',
]
