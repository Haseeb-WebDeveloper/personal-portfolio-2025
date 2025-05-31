import Navbar from "@/components/layout.tsx/navbar";
import HeroSection from "@/components/layout.tsx/hero-section";
import HeroProjects from "@/components/projects/hero-projects";
import GSAPCardsAnimation from "@/components/layout.tsx/cards";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroProjects />
    </>
  );
}
