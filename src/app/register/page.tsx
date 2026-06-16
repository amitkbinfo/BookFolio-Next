'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBook, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const PASSWORD_RULES = [
  { label: 'At least 8 characters',   test: (p: string) => p.length >= 8         },
  { label: 'One uppercase letter',     test: (p: string) => /[A-Z]/.test(p)       },
  { label: 'One number',              test: (p: string) => /\d/.test(p)           },
];

export default function RegisterPage() {
  const router = useRouter();
  const { user, register, loginWithGoogle } = useAuth();

  const [name,       setName]       = useState('');
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [confirm,    setConfirm]    = useState('');
  const [showPass,   setShowPass]   = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [errors,     setErrors]     = useState<{ name?: string; email?: string; password?: string; confirm?: string; general?: string }>({});

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim())                 e.name     = 'Full name is required';
    if (!email.trim())                e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password)                    e.password = 'Password is required';
    else if (password.length < 8)    e.password = 'Password must be at least 8 characters';
    if (!confirm)                     e.confirm  = 'Please confirm your password';
    else if (confirm !== password)    e.confirm  = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      await register(email, password, name.trim());
      toast.success('Account created! Welcome to BookFolio 📚');
      router.replace('/');
    } catch (err: any) {
      const code = err?.code ?? '';
      if (code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered. Try signing in.' });
      } else if (code === 'auth/invalid-email') {
        setErrors({ email: 'Please enter a valid email address.' });
      } else if (code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak. Please use a stronger one.' });
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
      toast.success('Account created! Welcome to BookFolio 📚');
      router.replace('/');
    } catch {
      toast.error('Google sign-up failed. Please try again.');
    } finally {
      setGoogleLoad(false);
    }
  };

  const passStrength = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const strengthColors = ['bg-red-400', 'bg-amber-400', 'bg-amber-400', 'bg-sage-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen bg-parchment flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(250,248,245,1) 0, rgba(250,248,245,1) 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/3 pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center">
            <FiBook className="text-ink-900 w-4 h-4" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold text-cream">
            Book<span className="text-amber-400">Folio</span>
          </span>
        </Link>

        {/* Benefits */}
        <div className="relative space-y-6">
          <h2 className="font-display text-3xl font-bold text-cream leading-tight">
            Join 15,000+ readers who trust BookFolio
          </h2>
          <ul className="space-y-4">
            {[
              'Access 12,000+ curated book titles',
              'Add and manage your own reading picks',
              'Discover books by genre, rating, and more',
              'Join a community of passionate readers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheck className="w-3 h-3 text-amber-400" />
                </div>
                <span className="text-ink-300 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative border-l-2 border-amber-500/40 pl-5">
          <p className="text-ink-400 text-sm italic">
            &ldquo;Not all readers are leaders, but all leaders are readers.&rdquo;
          </p>
          <p className="text-amber-400 text-xs mt-1">— Harry S. Truman</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-10 overflow-y-auto">
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

          <h1 className="font-display text-3xl font-bold text-ink-900 mb-1">Create your account</h1>
          <p className="text-ink-500 text-sm mb-8">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-700 hover:text-amber-600 font-medium">
              Sign in
            </Link>
          </p>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoad}
            className="w-full flex items-center justify-center gap-3 py-3 border border-ink-200 hover:border-ink-300 bg-white hover:bg-ink-50 disabled:opacity-60 text-ink-700 text-sm font-medium rounded-xl transition-all mb-5"
          >
            <FcGoogle className="w-5 h-5" />
            {googleLoad ? 'Connecting…' : 'Sign up with Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-ink-200" />
            <span className="text-xs text-ink-400">or with email</span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>

          {errors.general && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Full name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
                  placeholder="Jane Austen"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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
                    errors.email ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-10 pr-11 py-3 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
                >
                  {showPass ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passStrength ? strengthColors[passStrength] : 'bg-ink-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      {PASSWORD_RULES.map((r) => (
                        <span key={r.label} className={`text-xs flex items-center gap-1 ${r.test(password) ? 'text-sage-600' : 'text-ink-400'}`}>
                          <FiCheck className={`w-3 h-3 ${r.test(password) ? 'opacity-100' : 'opacity-30'}`} />
                          {r.label}
                        </span>
                      ))}
                    </div>
                    <span className={`text-xs font-medium ml-2 shrink-0 ${strengthColors[passStrength]?.replace('bg-', 'text-')}`}>
                      {strengthLabels[passStrength]}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Confirm password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
                    errors.confirm ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                  }`}
                />
                {confirm && confirm === password && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    <FiCheck className="w-4 h-4 text-sage-500" />
                  </div>
                )}
              </div>
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-xs text-ink-400 mt-6">
            By creating an account, you agree to our{' '}
            <span className="text-amber-700">Terms of Service</span> and{' '}
            <span className="text-amber-700">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
