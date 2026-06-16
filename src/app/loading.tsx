import { FiBook } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mx-auto animate-pulse">
          <FiBook className="w-6 h-6 text-ink-900" />
        </div>
        <p className="text-ink-400 text-sm">Loading…</p>
      </div>
    </div>
  );
}
