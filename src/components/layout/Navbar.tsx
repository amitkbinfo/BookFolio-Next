'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import {
  FiMenu, FiX, FiChevronDown, FiUser, FiPlusCircle,
  FiSettings, FiLogOut, FiBook,
} from 'react-icons/fi';

const NAV_LINKS = [
  { href: '/',       label: 'Home'  },
  { href: '/items',  label: 'Books' },
  { href: '/about',  label: 'About' },
];

export default function Navbar() {
  const pathname    = usePathname();
  const router      = useRouter();
  const { user, logout } = useAuth();

  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out. Happy reading! 📚');
    router.push('/');
    setDropdownOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const initials = user?.displayName
    ? user.displayName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?';

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink-900/95 backdrop-blur-md shadow-lg shadow-ink-950/20'
          : 'bg-ink-900',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <FiBook className="text-ink-900 w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold text-cream tracking-tight">
              Book<span className="text-amber-400">Folio</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  isActive(href)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-ink-200 hover:text-cream hover:bg-white/8',
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 hover:bg-white/15 transition-all duration-200 text-cream group"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-ink-900 text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {user.displayName ?? user.email?.split('@')[0]}
                  </span>
                  <FiChevronDown
                    className={clsx('w-4 h-4 text-ink-300 transition-transform duration-200', dropdownOpen && 'rotate-180')}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-ink-800 border border-ink-700 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-ink-700">
                      <p className="text-cream font-medium text-sm truncate">{user.displayName ?? 'Reader'}</p>
                      <p className="text-ink-400 text-xs truncate mt-0.5">{user.email}</p>
                    </div>
                    {/* Actions */}
                    <div className="py-1">
                      <Link
                        href="/items/add"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-200 hover:bg-white/8 hover:text-cream transition-colors"
                      >
                        <FiPlusCircle className="w-4 h-4 text-amber-400" />
                        Add a Book
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-200 hover:bg-white/8 hover:text-cream transition-colors"
                      >
                        <FiSettings className="w-4 h-4 text-amber-400" />
                        Manage Books
                      </Link>
                    </div>
                    <div className="border-t border-ink-700 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-ink-200 hover:text-cream transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-ink-900 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-ink-200 hover:text-cream hover:bg-white/8 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ink-700 pb-4 pt-2 space-y-1 animate-fade-in">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive(href)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-ink-200 hover:text-cream hover:bg-white/8',
                )}
              >
                {label}
              </Link>
            ))}

            <div className="pt-2 border-t border-ink-700 mt-2">
              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-ink-900 text-sm font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-cream text-sm font-medium truncate">{user.displayName ?? 'Reader'}</p>
                      <p className="text-ink-400 text-xs truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/items/add"    className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-200 hover:text-cream hover:bg-white/8 rounded-lg"><FiPlusCircle className="w-4 h-4 text-amber-400" />Add a Book</Link>
                  <Link href="/items/manage" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-200 hover:text-cream hover:bg-white/8 rounded-lg"><FiSettings className="w-4 h-4 text-amber-400" />Manage Books</Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 rounded-lg">
                    <FiLogOut className="w-4 h-4" />Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-4 pt-2">
                  <Link href="/login"    className="block px-4 py-2.5 text-center text-sm text-ink-200 border border-ink-700 rounded-lg hover:text-cream hover:border-ink-500 transition-colors">Sign In</Link>
                  <Link href="/register" className="block px-4 py-2.5 text-center text-sm font-medium bg-amber-500 hover:bg-amber-400 text-ink-900 rounded-lg transition-colors">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
