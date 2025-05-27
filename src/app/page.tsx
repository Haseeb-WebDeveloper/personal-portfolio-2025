import Navbar from "@/components/layout.tsx/navbar";
import HeroSection from "@/components/layout.tsx/hero-section";
import ScrollFloat from "@/components/ui/text-scroll";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        <HeroSection />
        <div className="h-[100vh] w-full">
                    <h3>test</h3>
                </div>
      </div>
    </>
  );
}
