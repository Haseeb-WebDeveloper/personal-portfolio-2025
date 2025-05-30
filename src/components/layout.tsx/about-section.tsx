"use client"
import React, { useEffect, useRef } from 'react';

const AboutSection: React.FC = () => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const textElement = textRef.current;
        if (!textElement) return;

        // Split text into lines more efficiently
        const text = textElement.textContent || '';
        const words = text.split(' ');
        textElement.innerHTML = '';

        // Create word spans
        const wordSpans: HTMLSpanElement[] = words.map(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.display = 'inline-block';
            span.style.marginRight = '0.8vw';
            textElement.appendChild(span);
            return span;
        });

        // Force layout calculation
        textElement.offsetHeight;

        // Group words into lines
        const lines: HTMLSpanElement[][] = [];
        let currentLine: HTMLSpanElement[] = [];
        let currentTop: number | null = null;

        wordSpans.forEach(span => {
            const rect = span.getBoundingClientRect();
            if (currentTop === null || Math.abs(rect.top - currentTop) < 5) {
                currentLine.push(span);
                if (currentTop === null) currentTop = rect.top;
            } else {
                if (currentLine.length > 0) {
                    lines.push([...currentLine]);
                }
                currentLine = [span];
                currentTop = rect.top;
            }
        });

        if (currentLine.length > 0) {
            lines.push(currentLine);
        }

        // Rebuild with line containers
        textElement.innerHTML = '';

        const lineElements: HTMLDivElement[] = lines.map((lineWords, index) => {
            const lineContainer = document.createElement('div');
            lineContainer.style.overflow = 'hidden';
            lineContainer.style.position = 'relative';

            const lineContent = document.createElement('div');
            lineContent.style.display = 'inline-block';
            lineContent.style.transform = 'translateY(80px)';
            lineContent.style.opacity = '0';
            lineContent.style.willChange = 'transform, opacity';

            lineWords.forEach(span => {
                lineContent.appendChild(span.cloneNode(true));
            });

            lineContainer.appendChild(lineContent);
            textElement.appendChild(lineContainer);

            return lineContent;
        });

        // Scroll-based animation with quick full animations per line
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate when container starts entering viewport
            const containerTop = containerRect.top;
            const triggerPoint = windowHeight * 0.8; // Start when 80% in view

            // Apply animation to each line individually
            lineElements.forEach((lineContent, index) => {
                // Each line triggers when container reaches its trigger point minus stagger
                const lineOffset = index * 30; // 50px scroll between each line
                const lineTriggerPoint = triggerPoint - lineOffset;

                // Quick animation range - line animates fully within 100px of scroll
                const animationRange = 100;
                const lineProgress = Math.max(0, Math.min(1,
                    (lineTriggerPoint - containerTop) / animationRange
                ));

                if (lineProgress > 0) {
                    // Quick easing - line snaps up quickly
                    const easedProgress = 1 - Math.pow(1 - lineProgress, 3);

                    const translateY = (1 - easedProgress) * 80;
                    const opacity = lineProgress > 0.1 ? easedProgress : 0;

                    lineContent.style.transform = `translateY(${translateY}px)`;
                    lineContent.style.opacity = opacity.toString();
                }
            });
        };

        // Throttled scroll handler for better performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial call and event listener
        handleScroll();
        window.addEventListener('scroll', scrollHandler, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <div ref={containerRef} className="max-w-[85vw] w-full mx-auto">
            <h3
                ref={textRef}
                className="font-bold text-[4vw] md:text-[4vw] lg:text-[2.7vw] tracking-tight leading-[130%]"
            >
                I'm Haseeb Ahmed Raza Khan, a full stack developer who doesn't just build websites, but builds digital leverage. I've helped startups, agencies, and business leaders turn ideas into high-converting platforms with clean code, seamless UX, and performance-driven design.
            </h3>
        </div>
    );
};

export default AboutSection;