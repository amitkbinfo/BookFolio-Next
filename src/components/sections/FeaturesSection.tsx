import { FEATURES } from '@/data/books';

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">
            Why BookFolio
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-4">
            Built for real readers
          </h2>
          <p className="text-ink-500 text-lg leading-relaxed">
            Whether you read one book a year or one a week, BookFolio gives you the
            tools to make every choice count.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 border border-ink-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50 transition-all duration-300 relative overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="text-3xl mb-4 leading-none">{feature.icon}</div>
              <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
