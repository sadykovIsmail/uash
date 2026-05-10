import PageHero from '../components/PageHero'

export default function Discover() {
  return (
    <>
      <PageHero
        eyebrow="Discover Uzbekistan"
        title="A Land of Timeless Culture and Tradition"
        subtitle="Nestled at the crossroads of the ancient Silk Road, Uzbekistan is a treasure trove of history, culture, and artistry."
      />

      <section className="py-16 lg:py-24 bg-surface-50">
        <div className="container-page max-w-3xl">
          <p className="text-lg text-ink-body leading-relaxed mb-16">
            With its rich heritage and vibrant traditions, this Central Asian gem invites
            travelers to explore its fascinating cultural tapestry. From its grand
            architecture to its warm hospitality, Uzbekistan offers a cultural experience
            like no other.
          </p>

          {SECTIONS.map((s, i) => (
            <article key={s.title} className={i > 0 ? 'mt-14' : ''}>
              <h2 className="font-display text-3xl md:text-4xl text-ink-primary leading-tight mb-5">
                {s.title}
              </h2>
              <p className="text-ink-body leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 bg-brand-500 text-white">
        <div className="container-page max-w-3xl">
          <p className="font-display text-2xl md:text-3xl leading-snug italic">
            Uzbekistan is a cultural haven that weaves together history, art, and community.
            Whether you&rsquo;re wandering through ancient cities, sampling its delicious
            cuisine, or engaging with its warm-hearted people, Uzbekistan promises a journey
            that will linger in your heart forever.
          </p>
        </div>
      </section>
    </>
  )
}

const SECTIONS = [
  {
    title: 'Architectural Marvels: A Glimpse into History',
    body:
      "Uzbekistan is home to some of the world's most breathtaking architectural masterpieces. Cities like Samarkand, Bukhara, and Khiva showcase majestic mosques, intricate madrasas, and ornate minarets that stand as testaments to the region's golden era. The Registan Square in Samarkand, with its turquoise domes and elaborate tilework, is a UNESCO World Heritage site that epitomizes the beauty of Islamic architecture.",
  },
  {
    title: 'Artisanal Traditions: Craftsmanship Passed Down Generations',
    body:
      'The people of Uzbekistan are master artisans, preserving ancient crafts with skill and dedication. From handwoven silk carpets to delicate ceramics and vibrant Suzani embroidery, each piece tells a story of creativity and cultural pride. In the bustling bazaars, travelers can witness artisans at work, using techniques that have been handed down through generations.',
  },
  {
    title: 'Cuisine: A Feast for the Senses',
    body:
      "Uzbek cuisine is a delightful fusion of flavors, reflecting the region's diverse cultural influences. Signature dishes like plov, a savory rice dish cooked with meat and spices, and samsa, a flaky pastry filled with meat or vegetables, are beloved staples. Sharing meals is a cherished tradition, embodying the hospitality and warmth of Uzbek culture.",
  },
  {
    title: 'Music and Dance: Rhythms of the Silk Road',
    body:
      'Traditional music and dance are integral to Uzbek celebrations. The melodious strains of the dutar, a two-stringed instrument, and the rhythmic beats of the doira drum accompany lively dances that captivate audiences with their elegance and energy. Festivals and cultural events across the country provide a window into these enchanting performances.',
  },
  {
    title: 'A Warm Welcome: Hospitality as a Way of Life',
    body:
      'Hospitality is at the heart of Uzbek culture. Visitors are often welcomed with open arms and a steaming pot of green tea. Families take pride in hosting guests, offering them a glimpse into the customs and traditions that define Uzbek life.',
  },
]
