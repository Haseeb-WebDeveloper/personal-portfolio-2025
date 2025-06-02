"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectImageCarousel({ images, title, category }: { images: { url: string; image: string }[], title: string, category?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <Link href={images[currentIndex].url} target="_blank" rel="noopener noreferrer" className="relative w-full">
            <Image
                src={images[currentIndex].image}
                alt={title}
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
            />
            {/* URL */}
            <div className="absolute lg:top-[0.5vw] lg:left-[0.5vw] top-[2vw] left-[2vw] flex items-center lg:gap-[0.5vw] gap-[2vw]">
                {category && <p className="hidden lg:block lg:px-[1vw] lg:py-[0.5vw] px-[3vw] py-[1.5vw] border border-foreground/40 rounded-full bg-background/50 backdrop-blur-sm text-[4vw] md:text-[3vw] lg:text-[1vw] font-medium tracking-normal">{category}</p>}
                <div className="lg:px-[1vw] lg:py-[0.5vw] px-[3vw] py-[1.5vw] border border-foreground/40 rounded-full bg-background/50 backdrop-blur-sm text-[4vw] md:text-[3vw] lg:text-[1vw] font-medium tracking-normal">{images[currentIndex].url}</div>
            </div>
            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.length > 1 && images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-[0.3vw] w-[2vw] rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary' : 'bg-foreground/70'
                            }`}
                    />
                ))}
            </div>
        </Link>
    );
}