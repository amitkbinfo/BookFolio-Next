'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiBook } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { user, login, loginWithGoogle } = useAuth();

  const [email,       setEmail]       = useState('');
  const [password,    setPassword]    = useState('');
  const [showPass,    setShowPass]    = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [googleLoad,  setGoogleLoad]  = useState(false);
  const [errors,      setErrors]      = useState<{ email?: string; password?: string; general?: string }>({});

  const redirect = searchParams.get('redirect') || '/';

  // Already logged in → redirect
  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, router, redirect]);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim())               e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password)                   e.password = 'Password is required';
    else if (password.length < 6)   e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await login(email, password);
      toast.success('Welcome back! 📚');
      router.replace(redirect);
    } catch (err: any) {
      const code = err?.code ?? '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setErrors({ general: 'Invalid email or password. Please try again.' });
      } else if (code === 'auth/too-many-requests') {
        setErrors({ general: 'Too many attempts. Please wait a moment and try again.' });
      } else {
        setErrors({ general: 'Something went wrong. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoad(true);
    try {
      await loginWithGoogle();
      toast.success('Signed in with Google! 📚');
      router.replace(redirect);
    } catch {
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoad(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex">
      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(250,248,245,1) 0, rgba(250,248,245,1) 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3 pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
            <FiBook className="text-ink-900 w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold text-cream">
            Book<span className="text-amber-400">Folio</span>
          </span>
        </Link>

        {/* Quote */}
        <div className="relative">
          <blockquote className="font-display text-2xl lg:text-3xl text-cream leading-relaxed mb-6">
            &ldquo;A reader lives a thousand lives before he dies. The man who never reads lives only one.&rdquo;
          </blockquote>
          <cite className="text-amber-400 text-sm font-medium not-italic">— George R.R. Martin</cite>
        </div>

        {/* Bottom book spines decoration */}
        <div className="relative flex items-end gap-1 h-24">
          {['bg-amber-600','bg-sage-600','bg-ink-600','bg-amber-800','bg-sage-800','bg-amber-500','bg-ink-700'].map((c, i) => (
            <div
              key={i}
              className={`${c} rounded-t-sm opacity-60`}
              style={{ width: `${24 + (i % 3) * 8}px`, height: `${50 + (i % 4) * 15}px` }}
            />
          ))}
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-amber-500 rounded-sm flex items-center justify-center">
              <FiBook className="text-ink-900 w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold text-ink-900">
              Book<span className="text-amber-600">Folio</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-ink-900 mb-1">Welcome back</h1>
          <p className="text-ink-500 text-sm mb-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-amber-700 hover:text-amber-600 font-medium">
              Create one free
            </Link>
          </p>

          {/* General error */}
          {errors.general && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-700">Password</label>
                <button type="button" className="text-xs text-amber-700 hover:text-amber-600">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-ink-200" />
            <span className="text-xs text-ink-400">or continue with</span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoad}
            className="w-full flex items-center justify-center gap-3 py-3 border border-ink-200 hover:border-ink-300 bg-white hover:bg-ink-50 disabled:opacity-60 text-ink-700 text-sm font-medium rounded-xl transition-all"
          >
            <FcGoogle className="w-5 h-5" />
            {googleLoad ? 'Connecting…' : 'Continue with Google'}
          </button>

          <p className="text-center text-xs text-ink-400 mt-8">
            By signing in, you agree to our{' '}
            <span className="text-amber-700">Terms of Service</span> and{' '}
            <span className="text-amber-700">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
