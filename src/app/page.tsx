import HeroSection from "@/components/layout.tsx/hero-section";
import HeroProjects from "@/components/projects/hero-projects";
import GSAPCardsAnimation from "@/components/layout.tsx/cards";
import CTASection from "@/components/cta-section";
import TechStack from "@/components/layout.tsx/tech-stack";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroProjects />
      <div className="mt-[8vw] mb-[4vw]">
      <TechStack />
      </div>
      <div className="mt-[10vw] mb-[8vw]">
        <CTASection />
      </div>
    </>
  );
}
