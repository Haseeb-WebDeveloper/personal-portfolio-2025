"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
        lerp: 0.1, 
        duration: 1.5,
         }}>
      <div className="lenis-wrapper">
        {children}
      </div>
    </ReactLenis>
  );
}

export default SmoothScrolling;