import Link from 'next/link';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

export default function CTABannerSection() {
  return (
    <section className="py-20 lg:py-24 bg-cream" id="cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 rounded-3xl overflow-hidden px-8 py-14 lg:px-16 lg:py-20 text-center">
          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-amber-600/8 rounded-full blur-2xl pointer-events-none" />

          {/* Floating icon */}
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-amber-500/15 border border-amber-500/30 rounded-2xl mb-6 mx-auto">
            <FiBookOpen className="w-8 h-8 text-amber-400" />
          </div>

          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-4 max-w-2xl mx-auto">
            Start your reading journey today
          </h2>
          <p className="relative text-ink-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of readers who&apos;ve found their next favorite book on BookFolio.
            Free to join, free to explore.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-ink-900 font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 group"
            >
              Create Free Account
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-ink-600 hover:border-ink-400 text-ink-200 hover:text-cream font-medium text-sm rounded-xl transition-all duration-200"
            >
              Browse Without Account
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-ink-500 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-sage-400">✓</span> No credit card required
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-ink-700" />
            <span className="flex items-center gap-2">
              <span className="text-sage-400">✓</span> Cancel anytime
            </span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-ink-700" />
            <span className="flex items-center gap-2">
              <span className="text-sage-400">✓</span> 15,000+ readers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
