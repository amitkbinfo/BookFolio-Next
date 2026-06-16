import { TESTIMONIALS } from '@/data/books';
import { FiStar } from 'react-icons/fi';

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-ink-900 relative overflow-hidden" id="testimonials">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Reader Stories
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4">
            Loved by book lovers
          </h2>
          <p className="text-ink-400 text-lg">
            From students to professors, BookFolio fits every kind of reader.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`bg-ink-800 border border-ink-700 rounded-2xl p-6 flex flex-col gap-4 hover:border-amber-500/30 hover:bg-ink-750 transition-all duration-300 ${
                idx >= 3 ? 'hidden lg:flex' : ''
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-ink-300 leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-ink-700">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-ink-900 font-bold text-sm shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-cream text-sm font-medium">{t.name}</p>
                  <p className="text-ink-500 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-amber-400 text-sm font-semibold">{t.booksRead}</p>
                  <p className="text-ink-500 text-xs">books read</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
