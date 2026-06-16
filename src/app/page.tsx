import HeroSection        from '@/components/sections/HeroSection';
import FeaturesSection    from '@/components/sections/FeaturesSection';
import FeaturedBooksSection from '@/components/sections/FeaturedBooksSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABannerSection   from '@/components/sections/CTABannerSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedBooksSection />
      <TestimonialsSection />
      <CTABannerSection />
    </>
  );
}
