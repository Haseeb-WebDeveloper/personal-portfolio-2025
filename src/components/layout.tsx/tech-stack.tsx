"use client"

import FallingText from "../ui/falling-text";
import { useState, useEffect } from "react";
export default function TechStack() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth < 768);
        });
    }, []);

    return (
        <div className="py-[6vw]">
            <section className="section">
                <h1 className="text-[10vw] lg:text-[4vw] font-medium lg:font-bold">Tech Stack 🔥</h1>
                <FallingText
                    text={`React Nextjs TypeScript NodeJS Express MongoDB Notion Discord Google Meet Figma Shadcn Gsap TailwindCSS Wordpress Framer OPENAI API`}
                    highlightWords={["Nextjs", "TypeScript", "Express", "MongoDB", "Notion", "Figma", "Wordpress", "Framer", "OPENAI", "API"]}
                    highlightClass="highlighted"
                    trigger={isMobile ? "scroll" : "hover"}
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="2rem"
                    mouseConstraintStiffness={0.9}
                />
            </section>
        </div>
    )
}