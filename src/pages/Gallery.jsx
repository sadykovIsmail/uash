import PageHero from '../components/PageHero'

const IMAGES = [
  '/images/gallery-22-50-19.jpg',
  '/images/gallery-22-51-04.jpg',
  '/images/gallery-22-50-25.jpg',
  '/images/gallery-22-35-38.jpg',
  '/images/gallery-23-04-16.jpg',
  '/images/gallery-22-50-36.jpg',
  '/images/gallery-23-03-57.jpg',
  '/images/gallery-22-58-11.jpg',
  '/images/gallery-22-43-05.jpg',
  '/images/gallery-22-40-34.jpg',
  '/images/gallery-22-44-30.jpg',
  '/images/gallery-22-49-25.jpg',
]

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Discover the Beauty of Uzbek Culture"
        subtitle="A look back at celebrations, gatherings, and the people who make UASH what it is."
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {IMAGES.map(src => (
              <div key={src} className="aspect-square overflow-hidden bg-surface-300">
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
