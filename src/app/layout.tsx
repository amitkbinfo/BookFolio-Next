import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { BooksProvider } from '@/context/BooksContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default:  'BookFolio — Your Literary Universe',
    template: '%s | BookFolio',
  },
  description:
    'Discover, explore, and catalog your favorite books. BookFolio is the premium destination for readers who take their literary journey seriously.',
  keywords: ['books', 'reading', 'library', 'book catalog', 'literature', 'fiction', 'non-fiction'],
  authors:  [{ name: 'BookFolio' }],
  openGraph: {
    title:       'BookFolio — Your Literary Universe',
    description: 'Discover, explore, and catalog your favorite books.',
    type:        'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cream min-h-screen flex flex-col">
        <AuthProvider>
          <BooksProvider>
            <Navbar />
            <main className="flex-1 page-enter">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#372e27',
                  color:      '#faf8f5',
                  fontFamily: 'Inter, sans-serif',
                  fontSize:   '14px',
                  borderRadius: '8px',
                  padding:    '12px 16px',
                },
                success: {
                  iconTheme: { primary: '#4a7c54', secondary: '#faf8f5' },
                },
                error: {
                  iconTheme: { primary: '#dc2626', secondary: '#faf8f5' },
                },
              }}
            />
          </BooksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
