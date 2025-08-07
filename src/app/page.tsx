import businessHeroSection from "@/components/layout.tsx/hero-section";
import HeroProjects from "@/components/projects/hero-projects";
import TechStack from "@/components/layout.tsx/tech-stack";
import CTALarge from "@/components/ui/cta-large";
import CTAMobile from "@/components/ui/cta-mobile";
import TextPressure from "@/components/ui/text-pressure";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroProjects />
      <div className="mt-[8vw] mb-[4vw]">
        <TechStack />
      </div>
      {/* <div className="mt-[10vw] mb-[8vw] hidden lg:block">
        <CTALarge />
      </div> */}
      <div className="mt-[15vw] md:mt-[10vw] md:mb-[10vw] mb-[24vw] ">
        <CTAMobile />
      </div>
    </>
  );
}
