import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiBook, FiHeart, FiUsers, FiStar } from 'react-icons/fi';
import { STATS } from '@/data/books';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about BookFolio — built for readers who take their literary journey seriously.',
};

const TEAM = [
  {
    name:   'Alexandra Reed',
    role:   'Founder & Curator',
    bio:    'Former librarian with 12 years of experience. Passionate about connecting readers with the right book at the right time.',
    avatar: 'AR',
    color:  'bg-amber-500',
  },
  {
    name:   'Marcus Chen',
    role:   'Head of Technology',
    bio:    'Full-stack developer and avid reader. Builds tools that feel as good as curling up with a great novel.',
    avatar: 'MC',
    color:  'bg-sage-500',
  },
  {
    name:   'Priya Sharma',
    role:   'Editorial Lead',
    bio:    'Literature PhD and book critic. Every title on BookFolio passes through her discerning eye first.',
    avatar: 'PS',
    color:  'bg-ink-500',
  },
];

const TIMELINE = [
  { year: '2021', title: 'The Idea',      desc: 'Started as a personal spreadsheet tracking 500 books—a reading log that outgrew itself.'     },
  { year: '2022', title: 'First Version', desc: 'Launched with 1,000 hand-curated titles and a small community of 200 beta readers.'            },
  { year: '2023', title: 'Community',     desc: 'Opened submissions. Readers added 4,000 titles in the first month. We knew we were onto something.' },
  { year: '2024', title: 'Today',         desc: 'Over 12,000 books, 15,000 readers, and a mission to be the definitive home for serious reading.' },
];

const VALUES = [
  { icon: FiBook,  title: 'Quality First',   desc: 'Every book is reviewed before it hits the catalog. We prioritize substance over quantity.'    },
  { icon: FiHeart, title: 'Reader-Centered', desc: 'Every feature is built around readers, not algorithms. We surface books people actually love.' },
  { icon: FiUsers, title: 'Community',       desc: 'BookFolio is built with — and for — a community of thoughtful, curious readers worldwide.'     },
  { icon: FiStar,  title: 'Honest Reviews',  desc: 'No paid placements. No sponsored picks. Ratings reflect genuine reader experiences.'          },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-ink-900 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.08)_0%,_transparent_60%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/15 border border-amber-500/30 rounded-full mb-6">
            <FiBook className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-300 text-xs font-medium tracking-wide">Our Story</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6">
            Built for readers who{' '}
            <span className="text-amber-400">mean it</span>
          </h1>
          <p className="text-ink-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            BookFolio started as a personal reading log and grew into the community
            it was always meant to become. We believe every reader deserves a
            catalog as serious as their curiosity.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-parchment py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl sm:text-4xl font-bold text-amber-600 mb-1">{value}</p>
                <p className="text-sm text-ink-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 mb-5">
                The right book at the right moment changes everything
              </h2>
              <div className="space-y-4 text-ink-600 leading-relaxed">
                <p>
                  We started BookFolio because finding great books was too hard. 
                  Recommendation algorithms optimized for engagement, not enlightenment. 
                  Bestseller lists optimized for sales, not quality. We wanted something different.
                </p>
                <p>
                  BookFolio is a curated catalog built by readers, for readers. Every title 
                  is here because a human — not an algorithm — decided it deserved to be. 
                  We value depth over breadth, and quality over quantity.
                </p>
                <p>
                  Whether you&apos;re looking for your next literary obsession or the perfect 
                  gift for a fellow bookworm, BookFolio is the place to start.
                </p>
              </div>
              <Link
                href="/items"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-ink-900 font-medium text-sm rounded-xl transition-all group"
              >
                Explore the Catalog
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image collage */}
            <div className="relative h-80 lg:h-[480px]">
              <div className="absolute top-0 left-0 w-48 h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=530&fit=crop"
                  alt="Books on a shelf"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=530&fit=crop"
                  alt="Reading"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-cream">
                <Image
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=320&h=420&fit=crop"
                  alt="A great book"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-parchment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">Our values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">{title}</h3>
                <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider mb-3">How We Got Here</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900">Our journey</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-ink-200 lg:left-1/2" />

            <div className="space-y-10">
              {TIMELINE.map(({ year, title, desc }, idx) => (
                <div
                  key={year}
                  className={`relative flex items-start gap-6 lg:gap-0 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Dot */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2 shadow-md">
                    <span className="text-ink-900 text-xs font-bold">{year.slice(2)}</span>
                  </div>

                  {/* Content */}
                  <div className={`bg-white rounded-2xl border border-ink-100 p-5 flex-1 lg:w-5/12 lg:flex-none ${idx % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                    <p className="text-amber-600 text-xs font-semibold mb-1">{year}</p>
                    <h3 className="font-display text-lg font-semibold text-ink-900 mb-1">{title}</h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-ink-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">The People</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream">Meet the team</h2>
            <p className="text-ink-400 mt-3">A small team with a big love for books</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, bio, avatar, color }) => (
              <div key={name} className="text-center">
                <div className={`w-20 h-20 ${color} rounded-2xl flex items-center justify-center text-ink-900 font-display text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                  {avatar}
                </div>
                <h3 className="font-display text-xl font-semibold text-cream mb-0.5">{name}</h3>
                <p className="text-amber-400 text-sm mb-3">{role}</p>
                <p className="text-ink-400 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 mb-4">
            Ready to find your next great read?
          </h2>
          <p className="text-ink-500 mb-8 leading-relaxed">
            Join BookFolio for free and explore a catalog curated with care by readers who mean it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-ink-900 font-semibold text-sm rounded-xl transition-all group"
            >
              Get Started Free
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-ink-200 hover:border-ink-300 text-ink-600 hover:text-ink-800 font-medium text-sm rounded-xl transition-all"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
