"use client"
import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

function Navbar() {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const talkButtonRef = useRef<HTMLAnchorElement>(null);
    const talkTextRef = useRef<HTMLSpanElement>(null);
    const talkBgRef = useRef<HTMLDivElement>(null);
    const talkGlowRef = useRef<HTMLDivElement>(null);
    const talkParticlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set initial states
        if (talkBgRef.current) {
            gsap.set(talkBgRef.current, { 
                scale: 0, 
                opacity: 0,
                transformOrigin: "center center"
            });
        }
        if (talkGlowRef.current) {
            gsap.set(talkGlowRef.current, { 
                scale: 0, 
                opacity: 0,
                transformOrigin: "center center"
            });
        }
        if (talkParticlesRef.current) {
            gsap.set(talkParticlesRef.current, { opacity: 0 });
        }
    }, []);

    const handleTalkHover = () => {
        setHoveredButton('talk');
        
        // Create timeline for smooth orchestrated animation
        const tl = gsap.timeline();
        
        // Background scale and fade in
        tl.to(talkBgRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
        })
        // Glow effect
        .to(talkGlowRef.current, {
            scale: 1,
            opacity: 0.6,
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.2")
        // Text animation
        .to(talkTextRef.current, {
            scale: 1.05,
            letterSpacing: "0.1em",
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.3")
        // Particles fade in
        .to(talkParticlesRef.current, {
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        }, "-=0.1");

        // Continuous glow pulse
        gsap.to(talkGlowRef.current, {
            scale: 1.1,
            opacity: 0.3,
            duration: 1.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });

        // Floating particles animation
        if (talkParticlesRef.current) {
            const particles = talkParticlesRef.current.children;
            Array.from(particles).forEach((particle, index) => {
                gsap.to(particle, {
                    y: -20 + Math.random() * 40,
                    x: -15 + Math.random() * 30,
                    rotation: Math.random() * 360,
                    scale: 0.8 + Math.random() * 0.4,
                    duration: 2 + Math.random() * 2,
                    ease: "power2.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: index * 0.1
                });
            });
        }
    };

    const handleTalkLeave = () => {
        setHoveredButton(null);
        
        // Kill any ongoing animations
        gsap.killTweensOf([talkGlowRef.current, talkParticlesRef.current]);
        
        // Create exit timeline
        const tl = gsap.timeline();
        
        // Text back to normal
        tl.to(talkTextRef.current, {
            scale: 1,
            letterSpacing: "0em",
            duration: 0.2,
            ease: "power2.out"
        })
        // Particles fade out
        .to(talkParticlesRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.out"
        }, "-=0.1")
        // Glow fade out
        .to(talkGlowRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: "back.in(1.7)"
        }, "-=0.1")
        // Background scale down
        .to(talkBgRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "back.in(1.7)"
        }, "-=0.2");
    };

    return (
        <>
            <header className='section w-full'>
                <nav className='relative flex justify-between items-center py-[1.67vw]'>

                    <div id="logo" className='flex items-center gap-[1vw]'>
                        <Image
                            src="/haseeb-logo.webp"
                            alt="Haseeb Ahmed web developer Logo"
                            width={600}
                            height={600}
                            priority
                            quality={100}
                            className='rounded-full border border-foreground/30 object-cover object-top h-[4.44vw] w-[4.44vw]'
                        />
                        <div className='flex flex-col'>
                            <h1 className='text-[1.4vw] font-semibold'>Haseeb Ahmed Raza Khan</h1>
                            <div className='flex gap-[0.5vw] items-center'>
                                <div className='w-[0.5vw] h-[0.5vw] bg-primary rounded-full animate-pulse'></div>
                                <p className='text-[1.2vw]'>Available for hire</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-[0.56vw] items-center p-[0.34vw] overflow-hidden'>

                        <Link
                            ref={talkButtonRef}
                            href="mailto:web.dev.haseeb@gmail.com"
                            onMouseEnter={handleTalkHover}
                            onMouseLeave={handleTalkLeave}
                            className="relative flex items-center text-[1.11vw] font-medium rounded-full border-[1px] border-foreground/10 h-[3.56vw] px-[1.67vw] transition-all duration-300 ease-out overflow-hidden cursor-pointer group"
                        >
                            {/* Animated Background */}
                            <div 
                                ref={talkBgRef}
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-full"
                            />
                            
                            {/* Glow Effect */}
                            <div 
                                ref={talkGlowRef}
                                className="absolute inset-0 bg-primary/20 rounded-full blur-md"
                            />
                            
                            {/* Floating Particles */}
                            <div 
                                ref={talkParticlesRef}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <div className="absolute top-2 left-4 w-1 h-1 bg-primary/60 rounded-full"></div>
                                <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-primary/40 rounded-full"></div>
                                <div className="absolute bottom-3 left-6 w-0.5 h-0.5 bg-primary/50 rounded-full"></div>
                                <div className="absolute bottom-2 right-4 w-1 h-1 bg-primary/30 rounded-full"></div>
                                <div className="absolute top-1/2 left-2 w-0.5 h-0.5 bg-primary/60 rounded-full"></div>
                                <div className="absolute top-1/2 right-2 w-0.5 h-0.5 bg-primary/40 rounded-full"></div>
                            </div>
                            
                            {/* Text */}
                            <span 
                                ref={talkTextRef}
                                className="relative z-10 whitespace-nowrap font-semibold"
                            >
                                Let's Talk
                            </span>
                            
                            {/* Border Enhancement on Hover */}
                            <div className="absolute inset-0 rounded-full border-[1px] border-primary/0 group-hover:border-primary/40 transition-all duration-300"></div>
                        </Link>
                    </div>

                </nav>
            </header>
        </>
    )
}

export default Navbar