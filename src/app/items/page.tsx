'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useBooks } from '@/context/BooksContext';
import BookCard from '@/components/ui/BookCard';
import { GENRES } from '@/data/books';
import { FilterState } from '@/types';
import { FiSearch, FiFilter, FiX, FiBook, FiSliders } from 'react-icons/fi';
import clsx from 'clsx';

const SORT_OPTIONS = [
  { value: 'title',      label: 'Title A–Z'     },
  { value: 'price-asc',  label: 'Price: Low–High'},
  { value: 'price-desc', label: 'Price: High–Low'},
  { value: 'rating',     label: 'Top Rated'      },
  { value: 'year',       label: 'Newest First'   },
];

export default function BooksPage() {
  const { books, loading } = useBooks();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search:   '',
    genre:    'All',
    rating:   0,
    maxPrice: 50,
    sortBy:   'title',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Read genre from URL query param
  useEffect(() => {
    const genreParam = searchParams.get('genre');
    if (genreParam && GENRES.includes(genreParam as any)) {
      setFilters((f) => ({ ...f, genre: genreParam as any }));
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...books];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.genre !== 'All') {
      result = result.filter((b) => b.genre === filters.genre);
    }

    if (filters.rating > 0) {
      result = result.filter((b) => b.rating >= filters.rating);
    }

    result = result.filter((b) => b.price <= filters.maxPrice);

    switch (filters.sortBy) {
      case 'title':      result.sort((a, b) => a.title.localeCompare(b.title));        break;
      case 'price-asc':  result.sort((a, b) => a.price - b.price);                      break;
      case 'price-desc': result.sort((a, b) => b.price - a.price);                      break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating);                    break;
      case 'year':       result.sort((a, b) => (b.publishYear ?? 0) - (a.publishYear ?? 0)); break;
    }

    return result;
  }, [books, filters]);

  const clearFilters = () =>
    setFilters({ search: '', genre: 'All', rating: 0, maxPrice: 50, sortBy: 'title' });

  const hasActiveFilters =
    filters.search || filters.genre !== 'All' || filters.rating > 0 || filters.maxPrice < 50;

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-ink-900 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-3">
            Book Catalog
          </h1>
          <p className="text-ink-400 text-lg">
            {loading ? 'Loading…' : `${books.length} titles curated for curious minds`}
          </p>

          {/* Search bar */}
          <div className="relative mt-6 max-w-xl">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search by title, author, or tag…"
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              className="w-full pl-11 pr-4 py-3 bg-ink-800 border border-ink-700 text-cream placeholder-ink-500 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((f) => ({ ...f, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-cream"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((o) => !o)}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                showFilters
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-white border-ink-200 text-ink-600 hover:border-ink-300',
              )}
            >
              <FiSliders className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {/* Genre quick pills */}
            <div className="flex gap-2 flex-wrap">
              {['All', 'Fiction', 'Science Fiction', 'Fantasy', 'Biography'].map((g) => (
                <button
                  key={g}
                  onClick={() => setFilters((f) => ({ ...f, genre: g as any }))}
                  className={clsx(
                    'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                    filters.genre === g
                      ? 'bg-ink-900 text-cream'
                      : 'bg-white border border-ink-200 text-ink-600 hover:border-ink-300',
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + Result count */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-ink-400 whitespace-nowrap">{filtered.length} books</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as any }))}
              className="text-sm border border-ink-200 bg-white text-ink-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="bg-white border border-ink-100 rounded-2xl p-5 mb-6 grid sm:grid-cols-3 gap-6">
            {/* Genre full list */}
            <div>
              <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => setFilters((f) => ({ ...f, genre: e.target.value as any }))}
                className="w-full text-sm border border-ink-200 bg-white text-ink-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Minimum rating */}
            <div>
              <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
                Min. Rating: {filters.rating > 0 ? `${filters.rating}+` : 'Any'}
              </label>
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setFilters((f) => ({ ...f, rating: r }))}
                    className={clsx(
                      'flex-1 py-1.5 text-xs rounded-lg border transition-all',
                      filters.rating === r
                        ? 'bg-amber-50 border-amber-400 text-amber-700'
                        : 'border-ink-200 text-ink-500 hover:border-ink-300',
                    )}
                  >
                    {r === 0 ? 'All' : `${r}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Max price */}
            <div>
              <label className="block text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">
                Max Price: ${filters.maxPrice}
              </label>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={filters.maxPrice}
                onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-xs text-ink-400 mt-1">
                <span>$5</span><span>$50</span>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="sm:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700"
                >
                  <FiX className="w-4 h-4" /> Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-ink-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <FiBook className="w-12 h-12 text-ink-200 mx-auto mb-4" />
            <h3 className="font-display text-xl text-ink-700 mb-2">No books found</h3>
            <p className="text-ink-400 mb-4">Try adjusting your filters or search terms.</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-amber-500 text-ink-900 text-sm font-medium rounded-lg hover:bg-amber-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
