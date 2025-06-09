"use client"

import Link from 'next/link';
import { useEffect, useRef } from 'react'

export default function AnnouncementStrip() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollContent = scrollContainer.firstElementChild;
        if (!scrollContent) return;

        // Clone the content for seamless scrolling
        const clone = scrollContent.cloneNode(true);
        scrollContainer.appendChild(clone);

        const scroll = () => {
            if (!scrollContainer) return;
            if (scrollContainer.scrollLeft >= scrollContent.scrollWidth) {
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += 1;
            }
        };

        const scrollInterval = setInterval(scroll, 30);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <div className="bg-primary/[0.08] text-foreground py-2 overflow-hidden">
            <div
                // ref={scrollRef}
                className="text-center"
                // style={{ WebkitOverflowScrolling: 'touch' }}
            >
                <div className="inline-block text-[3vw] md:text-[2vw] lg:text-[1.2vw]">
                    ⭐ Website is recently redesigned! Check out best projects <Link href="/projects" className="underline"> here</Link> &nbsp;&nbsp;&nbsp;
                </div>
            </div>
        </div>
    );
} 