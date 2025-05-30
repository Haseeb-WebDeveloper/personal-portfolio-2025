"use client"
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function About2() {
    const [isExpanded, setIsExpanded] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);
    const imageElementRef = useRef<HTMLImageElement>(null);
    const originalPosition = useRef<DOMRect | null>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isExpanded && imageRef.current) {
            originalPosition.current = imageRef.current.getBoundingClientRect();
            setTimeout(() => {
                setIsExpanded(true);
            }, 10);
        }
    };

    const handleClose = () => {
        setIsExpanded(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const handleImageClickWhenExpanded = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleClose();
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isExpanded) {
                handleClose();
            }
        };

        if (isExpanded) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded]);

    return (
        <div className="max-w-[85vw] w-full mx-auto space-y-[6vw]">
            <style jsx>{`
                @keyframes expand-from-origin {
                    0% {
                        transform: scale(0.1) translate(
                            calc(var(--original-left) - 50vw + var(--original-width) / 2),
                            calc(var(--original-top) - 50vh + var(--original-height) / 2)
                        );
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(1) translate(0, 0);
                        opacity: 1;
                    }
                }
                
                .animate-expand-from-origin {
                    animation: expand-from-origin 0.7s ease-out forwards;
                }
            `}</style>
            
            <h3 className="font-bold text-[4vw] md:text-[4vw] lg:text-[2.7vw] tracking-tight leading-[150%]">
                I'm
                <span className="w-[9vw] h-[2.8vw] px-[1vw] inline-flex items-center justify-center align-middle">
                    <Image src="/haseeb-ahmed-raza-khan.webp" alt="profile" width={200} height={200} className="rounded-[2vw] object-cover object-center w-full h-full" />
                </span>
                Haseeb Ahmed Raza Khan, a full stack developer who doesn't just build websites, but builds
                <span className="w-[9vw] h-[2.8vw] px-[1vw] inline-flex items-center justify-center align-middle">
                    <Image src="/digital.avif" alt="profile" width={200} height={200} className="rounded-[2vw] object-cover object-center w-full h-full" />
                </span>
                digital leverage. I've helped startups, agencies, and business leaders turn ideas into high-converting
                <span className="w-[9vw] h-[2.8vw] px-[1vw] inline-flex items-center justify-center align-middle">
                    <Image src="/grow.avif" alt="profile" width={200} height={200} className="rounded-[2vw] object-cover object-center w-full h-full" />
                </span>
                platforms with clean code, seamless
                <span className="w-[9vw] h-[2.8vw] px-[1vw] inline-flex items-center justify-center align-middle">
                    <Image src="/ui.avif" alt="profile" width={200} height={200} className="rounded-[2vw] object-cover object-center w-full h-full" />
                </span>
                UX, and performance-driven design.
            </h3>
            <div className="w-full flex justify-end">
                {/* Placeholder div to maintain layout */}
                <div 
                    ref={placeholderRef}
                    className={`${isExpanded ? 'w-[30vw] h-[30vw]' : 'hidden'}`}
                />
                {/* Image container */}
                <div
                    ref={imageRef}
                    onClick={!isExpanded ? handleImageClick : handleBackdropClick}
                    className={`cursor-pointer ${
                        isExpanded
                            ? 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center transition-all duration-700 ease-out'
                            : 'relative transition-all duration-700 ease-in-out'
                    }`}
                    style={
                        isExpanded && originalPosition.current
                            ? {
                                '--original-left': `${originalPosition.current.left}px`,
                                '--original-top': `${originalPosition.current.top}px`,
                                '--original-width': `${originalPosition.current.width}px`,
                                '--original-height': `${originalPosition.current.height}px`,
                            } as React.CSSProperties
                            : {}
                    }
                >
                    <Image
                        ref={imageElementRef}
                        src="/haseeb-on-google.png"
                        alt="profile"
                        width={1000}
                        height={700}
                        onClick={isExpanded ? handleImageClickWhenExpanded : undefined}
                        className={`select-none transition-all duration-700 ease-out ${
                            isExpanded
                                ? 'max-w-[90vw] max-h-[90vh] object-contain cursor-pointer animate-expand-from-origin'
                                : 'object-cover object-center w-full h-full max-w-[30vw]'
                        }`}
                        style={
                            isExpanded && originalPosition.current
                                ? {
                                    transformOrigin: `${originalPosition.current.left + originalPosition.current.width / 2}px ${originalPosition.current.top + originalPosition.current.height / 2}px`,
                                }
                                : {}
                        }
                    />
                </div>
            </div>
        </div>
    );
}
