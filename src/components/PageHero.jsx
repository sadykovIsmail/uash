export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-surface-200 border-b border-brand-500/10">
      <div className="container-page py-20 lg:py-28">
        {eyebrow && (
          <div className="eyebrow mb-4">{eyebrow}</div>
        )}
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ink-primary leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-ink-body max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
