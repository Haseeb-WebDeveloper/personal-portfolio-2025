import Navbar from "@/components/layout.tsx/navbar";
import HeroSection from "@/components/layout.tsx/hero-section";
import ScrollFloat from "@/components/ui/text-scroll";
import HeroProjects from "@/components/projects/hero-projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HeroProjects />
    </>
  );
}
