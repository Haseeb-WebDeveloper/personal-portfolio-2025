"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const GSAPCardsAnimation = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [sectionInView, setSectionInView] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const cardsData = [
        {
            id: 1,
            icon: "⚡",
            title: "Performance",
            description: "Lightning-fast loading speeds and optimized performance for the best user experience."
        },
        {
            id: 2,
            icon: "🎨",
            title: "Design",
            description: "Beautiful, modern designs that captivate users and drive engagement."
        },
        {
            id: 3,
            icon: "🚀",
            title: "Innovation",
            description: "Cutting-edge solutions that push the boundaries of what's possible."
        }
    ];

    // Create smooth spring animations for each card
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Card 3 (Innovation) - starts first
    const card3Y = useTransform(
        smoothProgress,
        [0, 0.3, 0.35, 0.4],
        [800, 0, -30, 0]
    );
    const card3Opacity = useTransform(smoothProgress, [0, 0.15], [0.3, 1]);

    // Card 2 (Design) - starts after card 3
    const card2Y = useTransform(
        smoothProgress,
        [0.2, 0.5, 0.55, 0.6],
        [800, 0, -30, 0]
    );
    const card2Opacity = useTransform(smoothProgress, [0.2, 0.35], [0.3, 1]);

    // Card 1 (Performance) - starts last
    const card1Y = useTransform(
        smoothProgress,
        [0.4, 0.7, 0.75, 0.8],
        [800, 0, -30, 0]
    );
    const card1Opacity = useTransform(smoothProgress, [0.4, 0.55], [0.3, 1]);

    const cardAnimations = [
        { y: card1Y, opacity: card1Opacity },
        { y: card2Y, opacity: card2Opacity },
        { y: card3Y, opacity: card3Opacity }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const section = sectionRef.current;
            if (section) {
                const rect = section.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                setSectionInView(inView);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full">
            <div
                ref={sectionRef}
                className="relative h-[400vh]"
            >
                <div
                    className={`bg-red-500 sticky top-0 h-screen flex items-center justify-center overflow-hidden ${sectionInView ? 'z-10' : ''}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-8 relative z-20">
                        {cardsData.map((card, index) => (
                            <motion.div
                                key={card.id}
                                style={{
                                    y: cardAnimations[index].y,
                                    opacity: cardAnimations[index].opacity
                                }}
                                className="border border-foreground/10 rounded-[1.5vw] py-[2.5vw] px-[3vw] space-y-[8vw]"
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div>
                                    <Image src="/card.svg" alt="card" width={100} height={100} className="w-[6vw] h-[6vw] object-cover" />
                                </div>
                                <div className="flex flex-col gap-[0.5vw] justify-end">
                                    <h3 className="text-[3.5vw] font-bold mb-4 leading-none">
                                        {card.title}
                                    </h3>
                                    <p className="text-[1.5vw] leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GSAPCardsAnimation;