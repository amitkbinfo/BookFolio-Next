'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useBooks } from '@/context/BooksContext';
import StarRating from '@/components/ui/StarRating';
import BookCard   from '@/components/ui/BookCard';
import {
  FiArrowLeft, FiBook, FiTag, FiCalendar,
  FiBookOpen, FiGlobe, FiDollarSign, FiHash,
} from 'react-icons/fi';

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { books } = useBooks();

  const book = books.find((b) => b.id === params.id);

  if (!book) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FiBook className="w-12 h-12 text-ink-200 mx-auto mb-4" />
          <h2 className="font-display text-2xl text-ink-700 mb-2">Book not found</h2>
          <p className="text-ink-400 mb-4">This book may have been removed.</p>
          <Link href="/items" className="px-5 py-2.5 bg-amber-500 text-ink-900 font-medium text-sm rounded-xl hover:bg-amber-400 transition-colors">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const related = books
    .filter((b) => b.genre === book.genre && b.id !== book.id)
    .slice(0, 4);

  const specs = [
    { icon: FiBookOpen, label: 'Pages',     value: `${book.pages} pages`           },
    { icon: FiGlobe,    label: 'Language',  value: book.language                   },
    { icon: FiCalendar, label: 'Published', value: book.publishYear?.toString()     },
    { icon: FiBook,     label: 'Publisher', value: book.publisher                   },
    { icon: FiHash,     label: 'ISBN',      value: book.isbn                        },
    { icon: FiTag,      label: 'Genre',     value: book.genre                       },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-parchment border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors group"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <span className="text-ink-300">/</span>
          <Link href="/items" className="text-sm text-ink-500 hover:text-ink-900">Books</Link>
          <span className="text-ink-300">/</span>
          <span className="text-sm text-ink-700 truncate max-w-[200px]">{book.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 mb-16">
          {/* Left: Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-ink-900/20 bg-parchment">
                <Image
                  src={book.coverImage || "https://i.ibb.co/0RZBD1gN/On-the-Origin-of-Species.jpg"}
                  alt={`${book.title} cover`}
                  fill
                  loading='lazy'
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                //   priority
                />
              </div>

              {/* Price & stock */}
              <div className="mt-6 bg-white rounded-2xl p-5 border border-ink-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-bold text-ink-900">
                    ${book.price.toFixed(2)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book.inStock
                      ? 'bg-sage-50 text-sage-700 border border-sage-200'
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}>
                    {book.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <StarRating rating={book.rating} size="md" />
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            {/* Genre badge */}
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full mb-4">
              {book.genre}
            </span>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight mb-3">
              {book.title}
            </h1>
            <p className="text-xl text-ink-500 mb-6">by <span className="font-medium text-ink-700">{book.author}</span></p>

            {/* Short description */}
            <p className="text-lg text-ink-600 leading-relaxed border-l-4 border-amber-300 pl-5 mb-8 italic">
              {book.description}
            </p>

            {/* Full description */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">About this book</h2>
              <div className="prose prose-ink max-w-none">
                {book.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-ink-600 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Specs grid */}
            <div className="mb-10">
              <h2 className="font-display text-xl font-semibold text-ink-900 mb-4">Specifications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-ink-100">
                    <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-ink-400 font-medium">{label}</p>
                      <p className="text-sm text-ink-800 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {book.tags && book.tags.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-900 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-ink-100 text-ink-600 text-sm rounded-lg hover:bg-ink-200 transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-ink-900">
                More in {book.genre}
              </h2>
              <Link
                href={`/items?genre=${encodeURIComponent(book.genre)}`}
                className="text-sm text-amber-700 hover:text-amber-600 font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
