import Navbar from "@/components/layout.tsx/navbar";
import HeroSection from "@/components/layout.tsx/hero-section";
import HeroProjects from "@/components/projects/hero-projects";
import GSAPCardsAnimation from "@/components/layout.tsx/cards";
import CTASection from "@/components/cta-section";
import TechStack from "@/components/layout.tsx/texh-stack";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroProjects />
      <TechStack />
      <CTASection />
      <Footer />
    </>
  );
}
