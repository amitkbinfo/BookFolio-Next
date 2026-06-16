'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { STATS } from '@/data/books';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-ink-900 overflow-hidden flex items-center">
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 40px, rgba(250,248,245,1) 40px, rgba(250,248,245,1) 41px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 40px, rgba(250,248,245,1) 40px, rgba(250,248,245,1) 41px
          )`,
        }}
      />

      {/* Amber glow accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-xs font-medium tracking-wide uppercase">
                Your Literary Universe
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.08] tracking-tight mb-6">
              Every great{' '}
              <span className="relative inline-block">
                <span className="text-amber-400">story</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M0 6 C50 2, 150 2, 200 6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>{' '}
              begins with the right{' '}
              <em className="not-italic text-parchment">shelf.</em>
            </h1>

            <p className="text-ink-300 text-lg leading-relaxed mb-8 max-w-lg">
              Discover thousands of curated books across every genre. From
              midnight literary fiction to hard science — find titles that
              match exactly where you are as a reader.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/items"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-ink-900 font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 group"
              >
                Browse the Catalog
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink-600 hover:border-ink-400 text-ink-200 hover:text-cream font-medium text-sm rounded-xl transition-all duration-200"
              >
                Join Free
              </Link>
            </div>

            {/* Quick Search Hint */}
            <div className="flex items-center gap-3 text-ink-500">
              <FiSearch className="w-4 h-4" />
              <p className="text-sm">
                Search by title, author, or genre — or filter by price and rating.
              </p>
            </div>
          </div>

          {/* Right: Book Stack Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96">
              {/* Stack of book covers */}
              {[
                { src: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop', rotate: '-rotate-6', z: 'z-10', translate: '-translate-x-8 translate-y-4' },
                { src: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=450&fit=crop', rotate: 'rotate-3',  z: 'z-20', translate: 'translate-x-2 -translate-y-1' },
                { src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop', rotate: '-rotate-1', z: 'z-30', translate: 'translate-x-12 translate-y-6' },
              ].map(({ src, rotate, z, translate }, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 ${rotate} ${z} ${translate} transition-transform duration-700 hover:scale-105`}
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="w-48 h-64 rounded-lg overflow-hidden shadow-2xl shadow-ink-950/60 border border-white/10">
                    <Image
                      src={src}
                      alt="Featured book"
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-ink-800 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center lg:text-left">
              <p className="font-display text-2xl sm:text-3xl font-bold text-amber-400 mb-1">
                {value}
              </p>
              <p className="text-sm text-ink-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
