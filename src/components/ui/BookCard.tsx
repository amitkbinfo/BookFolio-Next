'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import clsx from 'clsx';

interface BookCardProps {
  book:      Book;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={clsx(
            'w-3 h-3',
            star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-ink-300',
          )}
        />
      ))}
      <span className="text-xs text-ink-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function BookCard({ book, className }: BookCardProps) {
  return (
    <article
      className={clsx(
        'group bg-white rounded-2xl overflow-hidden border border-ink-100 card-lift flex flex-col',
        className,
      )}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden bg-parchment">
        <Image
          src={book.coverImage || "https://i.ibb.co/0RZBD1gN/On-the-Origin-of-Species.jpg"}
          alt={`${book.title} cover`}
          fill
          loading='lazy'
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Genre badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-xs font-medium bg-ink-900/80 text-amber-400 rounded-full backdrop-blur-sm">
            {book.genre}
          </span>
        </div>
        {/* Out of stock overlay */}
        {!book.inStock && (
          <div className="absolute inset-0 bg-ink-900/40 flex items-center justify-center">
            <span className="px-3 py-1 bg-ink-900 text-ink-300 text-xs font-medium rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <p className="text-xs text-ink-400 font-medium mb-1 uppercase tracking-wide">
            {book.author}
          </p>
          <h3 className="font-display text-lg font-semibold text-ink-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
            {book.title}
          </h3>
        </div>

        <p className="text-sm text-ink-500 leading-relaxed line-clamp-2 flex-1 mb-4">
          {book.description}
        </p>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={book.rating} />
          <span className="text-lg font-semibold text-ink-900">
            ${book.price.toFixed(2)}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/items/${book.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-ink-900 hover:bg-amber-600 text-cream text-sm font-medium rounded-xl transition-all duration-200 group/btn"
        >
          View Details
          <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
