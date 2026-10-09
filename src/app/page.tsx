import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import HomePageClient from './home/components/HomePageClient';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="pt-16">
        <HomePageClient />
      </main>
      <Footer />
    </div>
  );
}
