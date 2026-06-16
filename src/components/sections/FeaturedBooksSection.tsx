import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { BOOKS } from '@/data/books';
import BookCard from '@/components/ui/BookCard';

export default function FeaturedBooksSection() {
  const featured = BOOKS.filter((b) => b.rating >= 4.5).slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-parchment" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-2">
              Editors&apos; Picks
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">
              Highly rated reads
            </h2>
          </div>
          <Link
            href="/items"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-700 hover:text-amber-600 group whitespace-nowrap"
          >
            View all books
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Book grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
