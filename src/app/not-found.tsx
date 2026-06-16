import Link from 'next/link';
import { FiBook, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FiBook className="w-10 h-10 text-amber-500" />
        </div>
        <h1 className="font-display text-6xl font-bold text-ink-900 mb-2">404</h1>
        <h2 className="font-display text-2xl font-semibold text-ink-700 mb-4">Page not found</h2>
        <p className="text-ink-500 mb-8 leading-relaxed">
          Looks like this page wandered off the shelf. Let&apos;s get you back to the catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-ink-900 font-medium text-sm rounded-xl transition-all group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link
            href="/items"
            className="inline-flex items-center justify-center px-6 py-3 border border-ink-200 hover:border-ink-300 text-ink-600 text-sm font-medium rounded-xl transition-all"
          >
            Browse Books
          </Link>
        </div>
      </div>
    </div>
  );
}
