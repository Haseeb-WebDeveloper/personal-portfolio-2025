"use client";

import { useState, useRef, useEffect } from "react";
import Form from "./form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CTALarge() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Wait for images to load
  useEffect(() => {
    const allImages = document.querySelectorAll('img');
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === allImages.length) {
        setImagesLoaded(true);
      }
    };

    if (allImages.length === 0) {
      setImagesLoaded(true);
      return;
    }

    allImages.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad); // Count errors as loaded to prevent hanging
      }
    });

    return () => {
      allImages.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, []);

  useGSAP(() => {
    if (!imagesLoaded) return; // Don't initialize animation until images are loaded

    const section = sectionRef.current;
    const textContainer = textContainerRef.current;
    
    if (!section || !textContainer) return;

    // Get the scroll distance needed
    const getScrollAmount = () => {
      const textWidth = textContainer.scrollWidth;
      const windowWidth = window.innerWidth;
      return -(textWidth - windowWidth);
    };

    // Create the animation with a slight delay to ensure proper calculations
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: true, // Remove this in production
        }
      });

      tl.to(textContainer, {
        x: getScrollAmount,
        ease: "none",
      });
    }, 100);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imagesLoaded]); // Re-run when images are loaded

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <section 
        ref={sectionRef}
        className="main-section flex w-full h-screen items-center bg-red-500 overflow-hidden"
      >
        <div
          ref={textContainerRef}
          className="text-container flex gap-[2vw] will-change-transform"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <h3 className="text whitespace-nowrap uppercase font-semibold text-[18vw] md:text-[14.5vw] lg:text-[12vw] tracking-tighter leading-none px-[8vw]">
            Not just websites 🥗{" "}
            <span
              onClick={handleFormOpen}
              className="cursor-pointer lowercase [-webkit-text-stroke:1px_rgb(171,255,79)] hover:text-primary/[0.02] text-transparent"
            >
              build brand
              <span className="absolute h-[0.05vw] w-full left-0 top-[88%] bg-foreground/10"></span>
            </span>
          </h3>
        </div>
      </section>
      {isFormOpen && <Form handleFormOpen={handleFormOpen} />}
    </>
  );
}