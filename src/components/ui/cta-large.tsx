"use client"

import { useState, useEffect, useRef } from "react"
import Form from "./form"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function CTALarge() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLHeadingElement>(null)

    const handleFormOpen = () => {
        setIsFormOpen(!isFormOpen)
    }

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const section = sectionRef.current
        const text = textRef.current

        if (section && text) {
            // Wait for layout to be complete
            const setupAnimation = () => {
                // Get actual dimensions
                const textWidth = text.scrollWidth
                const containerWidth = section.offsetWidth
                const scrollDistance = textWidth - containerWidth

                // Only animate if text is wider than container
                if (scrollDistance > 0) {
                    // Create timeline for better control
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top 20%",
                            end: `+=${scrollDistance + 200}`, // Add buffer
                            pin: true,
                            pinSpacing: true,
                            scrub: 1,
                            onUpdate: (self) => {
                                // Smooth animation based on progress
                                const progress = self.progress
                                gsap.set(text, {
                                    x: -scrollDistance * progress,
                                    force3D: true // Hardware acceleration
                                })
                            }
                        }
                    })

                    return tl
                }
            }

            // Setup animation after a small delay to ensure layout is ready
            const timer = setTimeout(setupAnimation, 100)

            // Handle resize
            const handleResize = () => {
                ScrollTrigger.refresh()
            }

            window.addEventListener('resize', handleResize)

            return () => {
                clearTimeout(timer)
                window.removeEventListener('resize', handleResize)
                ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            }
        }
    }, [])

    return (
        <>
            <section
                ref={sectionRef}
                className="flex w-full lg:h-[30vw] md:h-[40vw] h-[50vw] items-center overflow-hidden"
            >
                <div
                    ref={textRef}
                    className="flex gap-[2vw] will-change-transform"
                    style={{ transform: 'translate3d(0, 0, 0)' }} // Force hardware acceleration
                >
                    <h3 className="whitespace-nowrap uppercase font-semibold text-[18vw] md:text-[14.5vw] lg:text-[12vw] tracking-tighter leading-none px-[8vw]">
                        Not just websites 🥗 <span onClick={handleFormOpen} className="cursor-pointer relative lowercase [-webkit-text-stroke:1px_rgb(171,255,79)] hover:text-primary/[0.02] text-transparent">build brand
                            <span className="absolute h-[0.05vw] w-[100%] left-0 top-[88%] bg-foreground/10"></span>
                        </span>
                    </h3>
                </div>

            </section>
            {isFormOpen && (
                <Form handleFormOpen={handleFormOpen} />
            )}
        </>
    )
}