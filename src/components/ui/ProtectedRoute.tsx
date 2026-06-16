'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FiBook } from 'react-icons/fi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?redirect=' + encodeURIComponent(window.location.pathname));
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto animate-pulse">
            <FiBook className="w-6 h-6 text-ink-900" />
          </div>
          <p className="text-ink-400 text-sm">Loading your shelf…</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
