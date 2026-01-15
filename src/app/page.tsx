import Navbar from '@/components/layout/Navbar';
import HeroVideo from '@/components/sections/HeroVideo';
import DigitalExperience from '@/components/sections/DigitalExperience';
import ManifestoVideo from '@/components/sections/ManifestoSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <DigitalExperience />
        <ManifestoVideo />
      </main>
    </>
  );
}