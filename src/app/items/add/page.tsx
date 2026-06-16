'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ui/ProtectedRoute';
import { useBooks } from '@/context/BooksContext';
import { useAuth }  from '@/context/AuthContext';
import { GENRES }   from '@/data/books';
import toast        from 'react-hot-toast';
import { FiUpload, FiBook, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

interface FormData {
  title:           string;
  author:          string;
  genre:           string;
  price:           string;
  rating:          string;
  description:     string;
  fullDescription: string;
  coverImage:      string;
  pages:           string;
  language:        string;
  publisher:       string;
  publishYear:     string;
  isbn:            string;
  tags:            string;
}

const INITIAL: FormData = {
  title: '', author: '', genre: 'Fiction', price: '', rating: '',
  description: '', fullDescription: '', coverImage: '', pages: '',
  language: 'English', publisher: '', publishYear: '', isbn: '', tags: '',
};

function InputField({
  label, name, type = 'text', placeholder, required, value, onChange, error,
}: {
  label: string; name: string; type?: string; placeholder?: string;
  required?: boolean; value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 mb-1.5">
        {label} {required && <span className="text-amber-600">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 transition-all ${
          error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function AddBookPage() {
  const router      = useRouter();
  const { addBook } = useBooks();
  const { user }    = useAuth();

  const [form,       setForm]       = useState<FormData>(INITIAL);
  const [errors,     setErrors]     = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof FormData) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.title.trim())       e.title       = 'Title is required';
    if (!form.author.trim())      e.author      = 'Author is required';
    if (!form.description.trim()) e.description = 'Short description is required';
    if (!form.fullDescription.trim()) e.fullDescription = 'Full description is required';
    if (!form.price || Number(form.price) <= 0) e.price = 'Valid price required';
    if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5)
      e.rating = 'Rating must be between 1 and 5';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await addBook({
        title:           form.title.trim(),
        author:          form.author.trim(),
        genre:           form.genre,
        price:           parseFloat(form.price),
        rating:          parseFloat(form.rating),
        description:     form.description.trim(),
        fullDescription: form.fullDescription.trim(),
        coverImage:      form.coverImage.trim() || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
        pages:           form.pages ? parseInt(form.pages) : 0,
        language:        form.language || 'English',
        publisher:       form.publisher.trim(),
        publishYear:     form.publishYear ? parseInt(form.publishYear) : new Date().getFullYear(),
        isbn:            form.isbn.trim(),
        inStock:         true,
        tags:            form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        addedBy:         user?.uid,
      });
      toast.success('Book added to the catalog! 📚');
      setForm(INITIAL);
      router.push('/items/manage');
    } catch {
      toast.error('Failed to add book. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="bg-ink-900 py-10 lg:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/items/manage" className="inline-flex items-center gap-2 text-ink-400 hover:text-cream text-sm mb-4 group">
              <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Manage Books
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                <FiBook className="w-5 h-5 text-ink-900" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream">Add a Book</h1>
                <p className="text-ink-400 text-sm mt-0.5">Share a book with the BookFolio community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <form onSubmit={handleSubmit} noValidate>
            {/* Core Info */}
            <section className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
              <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Core Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Book Title" name="title" placeholder="The Great Gatsby" required value={form.title} onChange={set('title')} error={errors.title} />
                <InputField label="Author" name="author" placeholder="F. Scott Fitzgerald" required value={form.author} onChange={set('author')} error={errors.author} />

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">Genre <span className="text-amber-600">*</span></label>
                  <select
                    value={form.genre}
                    onChange={(e) => set('genre')(e.target.value)}
                    className="w-full px-4 py-2.5 border border-ink-200 rounded-xl text-sm text-ink-800 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                  >
                    {GENRES.filter((g) => g !== 'All').map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <InputField label="Price ($)" name="price" type="number" placeholder="14.99" required value={form.price} onChange={set('price')} error={errors.price} />
                <InputField label="Rating (1–5)" name="rating" type="number" placeholder="4.5" required value={form.rating} onChange={set('rating')} error={errors.rating} />
                <InputField label="ISBN" name="isbn" placeholder="978-0000000000" value={form.isbn} onChange={set('isbn')} />
              </div>
            </section>

            {/* Descriptions */}
            <section className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
              <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Descriptions</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Short Description <span className="text-amber-600">*</span>
                    <span className="text-ink-400 font-normal ml-1">(1–2 lines)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => set('description')(e.target.value)}
                    placeholder="A gripping tale of…"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 resize-none transition-all ${
                      errors.description ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                    }`}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-ink-700 mb-1.5">
                    Full Description <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    rows={6}
                    value={form.fullDescription}
                    onChange={(e) => set('fullDescription')(e.target.value)}
                    placeholder="Write a detailed description of the book…"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-ink-800 placeholder-ink-400 bg-white focus:outline-none focus:ring-2 resize-none transition-all ${
                      errors.fullDescription ? 'border-red-300 focus:ring-red-100' : 'border-ink-200 focus:border-amber-400 focus:ring-amber-100'
                    }`}
                  />
                  {errors.fullDescription && <p className="text-red-500 text-xs mt-1">{errors.fullDescription}</p>}
                </div>
              </div>
            </section>

            {/* Additional Details */}
            <section className="bg-white rounded-2xl border border-ink-100 p-6 mb-5">
              <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Additional Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Publisher" name="publisher" placeholder="Penguin Books" value={form.publisher} onChange={set('publisher')} />
                <InputField label="Publish Year" name="publishYear" type="number" placeholder="2024" value={form.publishYear} onChange={set('publishYear')} />
                <InputField label="Pages" name="pages" type="number" placeholder="320" value={form.pages} onChange={set('pages')} />
                <InputField label="Language" name="language" placeholder="English" value={form.language} onChange={set('language')} />
              </div>
            </section>

            {/* Image & Tags */}
            <section className="bg-white rounded-2xl border border-ink-100 p-6 mb-6">
              <h2 className="font-display text-lg font-semibold text-ink-900 mb-5">Image & Tags</h2>
              <div className="space-y-4">
                <InputField
                  label="Cover Image URL"
                  name="coverImage"
                  placeholder="https://images.unsplash.com/…"
                  value={form.coverImage}
                  onChange={set('coverImage')}
                />
                {form.coverImage && (
                  <div className="relative w-28 h-40 rounded-xl overflow-hidden border border-ink-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <InputField
                  label="Tags (comma-separated)"
                  name="tags"
                  placeholder="fiction, bestseller, drama"
                  value={form.tags}
                  onChange={set('tags')}
                />
              </div>
            </section>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-ink-900 font-semibold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                <FiUpload className="w-4 h-4" />
                {submitting ? 'Adding Book…' : 'Add to Catalog'}
              </button>
              <Link
                href="/items/manage"
                className="px-6 py-3.5 border border-ink-200 text-ink-600 hover:border-ink-300 text-sm font-medium rounded-xl transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
