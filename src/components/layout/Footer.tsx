import Link from 'next/link';
import { FiBook, FiTwitter, FiInstagram, FiGithub, FiHeart } from 'react-icons/fi';

const FOOTER_LINKS = {
  Explore: [
    { href: '/items',  label: 'Browse Books'    },
    { href: '/about',  label: 'About BookFolio' },
    { href: '/items/add', label: 'Add a Book'   },
  ],
  Genres: [
    { href: '/items?genre=Fiction',          label: 'Fiction'         },
    { href: '/items?genre=Science+Fiction',  label: 'Science Fiction' },
    { href: '/items?genre=Fantasy',          label: 'Fantasy'         },
    { href: '/items?genre=Biography',        label: 'Biography'       },
    { href: '/items?genre=Self-Help',        label: 'Self-Help'       },
  ],
  Account: [
    { href: '/login',         label: 'Sign In'       },
    { href: '/register',      label: 'Create Account'},
    { href: '/items/manage',  label: 'My Books'      },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
                <FiBook className="text-ink-900 w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-cream">
                Book<span className="text-amber-400">Folio</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ink-400 max-w-xs">
              A curated space for serious readers. Discover titles that matter,
              track what you&apos;ve read, and share the books that changed you.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: FiTwitter,  href: '#', label: 'Twitter'  },
                { icon: FiInstagram, href: '#', label: 'Instagram'},
                { icon: FiGithub,   href: '#', label: 'GitHub'   },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-ink-800 text-ink-400 hover:bg-amber-500 hover:text-ink-900 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-ink-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-ink-800" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">
            © {year} BookFolio. All rights reserved.
          </p>
          <p className="text-xs text-ink-500 flex items-center gap-1">
            Made with <FiHeart className="w-3 h-3 text-amber-500 fill-amber-500" /> for book lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
