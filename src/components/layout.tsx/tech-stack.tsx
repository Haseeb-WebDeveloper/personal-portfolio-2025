"use client"

import FallingText from "../ui/falling-text";
import { useState, useEffect } from "react";

export default function TechStack() {
    const [isMobile, setIsMobile] = useState(false);

    const techStackItems = [
        "React",
        "Next JS",
        "TypeScript",
        "JavaScript",
        "Nodejs",
        "Express",
        "MongoDB",
        "Notion",
        "Discord",
        "Google Meet",
        "Figma",
        "Shadcn/UI",
        "GSAP",
        "Tailwind CSS",
        "WordPress",
        "Framer Motion",
        "OpenAI API",
        "Zod",
        "Cloudinary",
        "Vercel",
        "Netlify",
        "GitHub",
        "Sanity",
        "Firebase",
    ];


    const highlightedItems = [
        "Next JS",
        "TypeScript",
        "Express",
        "MongoDB",
        "Notion",
        "Figma",
        "WordPress",
        "Framer Motion",
        "GSAP"
    ];

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth < 768);
        });
    }, []);

    return (
        <div className="lg:py-[6vw] mt-[40vw] mb-[30vw] lg:mt-0 lg:mb-0">
            <section className="section">
                <h1 className="text-[10vw] lg:text-[4vw] font-medium lg:font-bold">Tech Stack 🔥</h1>
                <FallingText
                    text={techStackItems}
                    highlightWords={highlightedItems}
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