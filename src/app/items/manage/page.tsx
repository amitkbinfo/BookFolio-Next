'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import { useBooks } from '@/context/BooksContext';
import StarRating  from '@/components/ui/StarRating';
import toast       from 'react-hot-toast';
import {
  FiPlus, FiEye, FiTrash2, FiBook, FiAlertTriangle,
  FiSearch, FiGrid, FiList,
} from 'react-icons/fi';
import clsx from 'clsx';

export default function ManageBooksPage() {
  const { books, deleteBook, loading } = useBooks();
  const router = useRouter();

  const [search,      setSearch]      = useState('');
  const [viewMode,    setViewMode]    = useState<'table' | 'grid'>('table');
  const [deleteModal, setDeleteModal] = useState<{ id: string; title: string } | null>(null);
  const [deleting,    setDeleting]    = useState(false);

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await deleteBook(deleteModal.id);
      toast.success(`"${deleteModal.title}" removed.`);
      setDeleteModal(null);
    } catch {
      toast.error('Failed to delete. Try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-ink-900 py-10 lg:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">Manage Books</h1>
              <p className="text-ink-400 text-sm mt-1">{books.length} titles in the catalog</p>
            </div>
            <Link
              href="/items/add"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-ink-900 font-medium text-sm rounded-xl transition-all"
            >
              <FiPlus className="w-4 h-4" />
              Add Book
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
            <div className="relative w-full sm:max-w-xs">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="text"
                placeholder="Search books…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-ink-200 rounded-lg text-sm text-ink-700 placeholder-ink-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={clsx('p-2 rounded-lg border transition-all', viewMode === 'table' ? 'bg-ink-900 text-cream border-ink-900' : 'border-ink-200 text-ink-500 hover:border-ink-300')}
              >
                <FiList className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={clsx('p-2 rounded-lg border transition-all', viewMode === 'grid' ? 'bg-ink-900 text-cream border-ink-900' : 'border-ink-200 text-ink-500 hover:border-ink-300')}
              >
                <FiGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white h-16 rounded-xl animate-pulse border border-ink-100" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FiBook className="w-12 h-12 text-ink-200 mx-auto mb-4" />
              <h3 className="font-display text-xl text-ink-700 mb-2">No books found</h3>
              <Link href="/items/add" className="px-5 py-2.5 bg-amber-500 text-ink-900 text-sm font-medium rounded-xl hover:bg-amber-400 transition-colors inline-block mt-2">
                Add Your First Book
              </Link>
            </div>
          ) : viewMode === 'table' ? (
            /* Table View */
            <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-ink-50 border-b border-ink-100">
                      <th className="text-left px-5 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Book</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider hidden sm:table-cell">Genre</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider hidden md:table-cell">Rating</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Price</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider hidden lg:table-cell">Stock</th>
                      <th className="text-right px-5 py-3 text-xs font-semibold text-ink-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-50">
                    {filtered.map((book) => (
                      <tr key={book.id} className="hover:bg-ink-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-8 h-12 rounded overflow-hidden shrink-0 bg-parchment">
                              <Image
                                src={book.coverImage || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop'}
                                alt={book.title}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-ink-900 truncate max-w-[180px]">{book.title}</p>
                              <p className="text-xs text-ink-400">{book.author}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">{book.genre}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <StarRating rating={book.rating} size="sm" />
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-medium text-ink-800">${book.price.toFixed(2)}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${book.inStock ? 'bg-sage-50 text-sage-700' : 'bg-red-50 text-red-600'}`}>
                            {book.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => router.push(`/items/${book.id}`)}
                              className="p-1.5 rounded-lg text-ink-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                              title="View"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteModal({ id: book.id, title: book.title })}
                              className="p-1.5 rounded-lg text-ink-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((book) => (
                <div key={book.id} className="bg-white rounded-2xl border border-ink-100 overflow-hidden group">
                  <div className="relative h-40 bg-parchment">
                    <Image
                      src={book.coverImage || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop'}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => router.push(`/items/${book.id}`)}
                        className="p-2 bg-white/90 rounded-lg text-ink-700 hover:bg-white transition-colors"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ id: book.id, title: book.title })}
                        className="p-2 bg-white/90 rounded-lg text-red-600 hover:bg-white transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-amber-600 font-medium mb-0.5">{book.genre}</p>
                    <h3 className="font-medium text-ink-900 text-sm truncate">{book.title}</h3>
                    <p className="text-xs text-ink-400">{book.author}</p>
                    <div className="flex items-center justify-between mt-2">
                      <StarRating rating={book.rating} size="sm" />
                      <span className="text-sm font-semibold text-ink-800">${book.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete confirmation modal */}
        {deleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-900 text-center mb-2">Remove Book?</h3>
              <p className="text-ink-500 text-sm text-center mb-6">
                Are you sure you want to remove <strong className="text-ink-800">&ldquo;{deleteModal.title}&rdquo;</strong> from the catalog? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="flex-1 py-2.5 border border-ink-200 text-ink-600 text-sm font-medium rounded-xl hover:border-ink-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  {deleting ? 'Removing…' : 'Yes, Remove'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
