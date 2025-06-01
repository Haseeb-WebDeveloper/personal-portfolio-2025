"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';
import { IProjects } from '@/constent/projects';


interface ProjectsModelProps {
    isOpen: boolean;
    onClose: () => void;
    onAnimationComplete: () => void;
    projectData: IProjects;
    clickedItemRect: DOMRect | null;
    clickedImageRect: DOMRect | null;
    clickedIndex: number;
    setIsAnimating: (isAnimating: boolean) => void;
}

const ProjectsModel: React.FC<ProjectsModelProps> = ({
    isOpen,
    onClose,
    onAnimationComplete,
    projectData,
    clickedItemRect,
    clickedImageRect,
    clickedIndex,
    setIsAnimating
}) => {
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [projectContent, setProjectsContent] = useState<any>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const heroImageRef = useRef<HTMLImageElement | null>(null);
    const clonedImageRef = useRef<HTMLImageElement | null>(null);
    const lenisRef = useRef<any>(null);
    const rootLenis = useLenis();

    // Check if we're on mobile
    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    // Initialize Lenis for the popup - desktop only
    useEffect(() => {
        // Clean up any previous Lenis instance to prevent multiple instances
        if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
        }

        if (!isOpen || !popupRef.current) return;

        // Check if we're on desktop (not mobile)
        const isDesktop = window.innerWidth > 768;

        // Only initialize Lenis on desktop
        if (isDesktop) {
            // Import Lenis dynamically
            import('@studio-freight/lenis').then(({ default: Lenis }) => {
                // Create a new Lenis instance for popup scrolling
                lenisRef.current = new Lenis({
                    wrapper: popupRef.current as HTMLElement,
                    content: contentRef.current as HTMLElement,
                    lerp: 0.09,
                    smoothWheel: true,
                    duration: 1,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    touchMultiplier: 2,
                    infinite: false
                });

                // Raf loop for the lenis instance
                function raf(time: number) {
                    if (lenisRef.current) {
                        lenisRef.current.raf(time);
                        requestAnimationFrame(raf);
                    }
                }

                requestAnimationFrame(raf);
            });
        }

        // Clean up Lenis instance on unmount or when popup closes
        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, [isOpen]);

    // Initialize animation for opening
    useEffect(() => {
        if (!isOpen || !popupRef.current || !contentRef.current || !heroImageRef.current) return;

        // Check if we're on mobile
        const mobile = window.innerWidth <= 768;

        // Stop main page scrolling on desktop only
        if (rootLenis && !mobile) {
            rootLenis.stop();
        }

        // Don't lock body scroll on mobile
        if (!mobile) {
            document.body.style.overflow = 'hidden';
        }

        // Reset the opacity and display state of the modal
        popupRef.current.style.display = 'block';
        popupRef.current.style.opacity = '0';
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(20px)';

        // Only create cloned image if we have clickedImageRect
        if (clickedImageRect) {
            // Create cloned image for transition
            const clonedImage = document.createElement('img');
            clonedImage.src = projectData.projectImages[0].image || '';
            clonedImage.alt = projectData.title;
            clonedImage.style.position = 'fixed';
            clonedImage.style.zIndex = '60';
            clonedImage.style.top = `${clickedImageRect.top}px`;
            clonedImage.style.left = `${clickedImageRect.left}px`;
            clonedImage.style.width = `${clickedImageRect.width}px`;
            clonedImage.style.height = `${clickedImageRect.height}px`;
            clonedImage.style.objectFit = 'cover';

            // Append to body and store ref
            document.body.appendChild(clonedImage);
            clonedImageRef.current = clonedImage;

            // Initially hide the actual hero image
            heroImageRef.current.style.opacity = '0';

            // Wait a frame to ensure everything is rendered
            requestAnimationFrame(() => {
                // Get hero image final position
                const heroRect = heroImageRef.current?.getBoundingClientRect();

                if (!heroRect) return;

                // Create animation timeline
                const openTimeline = gsap.timeline({
                    onComplete: () => {
                        // Remove cloned image
                        if (clonedImageRef.current) {
                            clonedImageRef.current.remove();
                            clonedImageRef.current = null;
                        }

                        // Show actual hero image
                        if (heroImageRef.current) {
                            heroImageRef.current.style.opacity = '1';
                        }

                        // Animation complete, reset flag
                        setIsAnimating(false);

                        // Reset scroll position
                        if (popupRef.current) {
                            popupRef.current.scrollTop = 0;
                        }

                        if (lenisRef.current) {
                            lenisRef.current.scrollTo(0, { immediate: true });
                        }
                    }
                });

                // First fade in the modal container
                openTimeline.to(popupRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });

                // Then animate the image from thumbnail to hero position
                openTimeline.to(clonedImage, {
                    top: 0,
                    left: 0,
                    width: heroRect.width,
                    height: heroRect.height,
                    duration: 0.5,
                    ease: "power2.inOut"
                }, "-=0.1");

                // Finally fade in the content
                openTimeline.to(contentRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, "-=0.2");
            });
        } else {
            // If no clickedImageRect (e.g. direct URL access), just fade in the modal
            gsap.to(popupRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    // Show the hero image
                    if (heroImageRef.current) {
                        heroImageRef.current.style.opacity = '1';
                    }
                }
            });

            // And fade in the content
            gsap.to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                delay: 0.2
            });
        }

        return () => {
            // Clean up if unmounted during animation
            if (clonedImageRef.current) {
                clonedImageRef.current.remove();
                clonedImageRef.current = null;
            }
        };
    }, [isOpen, clickedImageRect, projectData, rootLenis, setIsAnimating]);

    // Handle escape key for closing
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [isOpen]);

    // Handle closing animation
    const handleClose = () => {
        if (!popupRef.current || !heroImageRef.current || !clickedImageRect || !contentRef.current) {
            onClose();
            return;
        }

        // Get current hero image position
        const heroRect = heroImageRef.current.getBoundingClientRect();

        // Create cloned image for closing transition
        const clonedImage = document.createElement('img');
        clonedImage.src = projectData.projectImages[0].image || '';
        clonedImage.alt = projectData.title;
        clonedImage.style.position = 'fixed';
        clonedImage.style.zIndex = '60';
        clonedImage.style.top = `${heroRect.top}px`;
        clonedImage.style.left = `${heroRect.left}px`;
        clonedImage.style.width = `${heroRect.width}px`;
        clonedImage.style.height = `${heroRect.height}px`;
        clonedImage.style.objectFit = 'cover';

        // Append to body and store ref
        document.body.appendChild(clonedImage);
        clonedImageRef.current = clonedImage;

        // Hide the actual hero image
        heroImageRef.current.style.opacity = '0';

        // Create closing timeline
        const closeTimeline = gsap.timeline({
            onComplete: () => {
                // Remove cloned image
                if (clonedImageRef.current) {
                    clonedImageRef.current.remove();
                    clonedImageRef.current = null;
                }

                // Hide modal
                if (popupRef.current) {
                    popupRef.current.style.display = 'none';
                }

                // Re-enable scrolling
                document.body.style.overflow = 'auto';
                if (rootLenis) {
                    rootLenis.start();
                }

                // Call complete handlers and onClose at the end
                onAnimationComplete();
                onClose();
            }
        });

        // First fade out the content
        closeTimeline.to(contentRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "power2.in"
        });

        // Then animate the image back to thumbnail position
        closeTimeline.to(clonedImage, {
            top: clickedImageRect.top,
            left: clickedImageRect.left,
            width: clickedImageRect.width,
            height: clickedImageRect.height,
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Finally fade out the modal
        closeTimeline.to(popupRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        }, "-=0.2");
    };

    return (
        <div
            ref={popupRef}
            className="fixed inset-0 bg-background z-50 md:overflow-y-hidden overflow-y-auto outline-none touch-auto"
            style={{
                display: 'none', // Will be shown by animation
                opacity: 0,
                WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
                overscrollBehavior: 'contain'
            }}
            tabIndex={0}
            onClick={(e) => e.target === popupRef.current && handleClose()}
        >
            <button
                onClick={handleClose}
                className="cursor-pointer fixed top-4 left-4 z-[60]"
                aria-label="Close popup"
            >
                <Image src="/icons/close.svg" alt="Close" width={42} height={42} className='md:w-[7vw] md:h-[7vw] h-[9vw] w-h-[9vw]' />
            </button>

            <div
                ref={contentRef}
                className="min-h-[100dvh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image - with ref for animation */}
                <div className='min-h-[100dvh] relative'>
                    <img
                        ref={heroImageRef}
                        src={projectData.projectImages[0].image}
                        alt={projectData.title}
                        className='w-full h-[70vh] md:h-[100dvh] object-cover'
                    />
                    {/* details */}
                    <div className='absolute bottom-0 left-0 w-full bg-background grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center border-b-[1px] border-[#433E3E]'>
                        <div className='flex flex-col items-center justify-center px-[2wv] md:py-[3.8vw] py-[7vw] border-b-[1px] md:border-b-0 border-[#433E3E] md:border-r-[1px]'>
                            <div className='flex flex-col items-center md:gap-[1vw] gap-[1.4vw] w-fit px-[2vw]'>
                                <p className="md:text-[2vw] text-[6vw] font-[600] text-center">
                                    {projectData.title}
                                </p>
                                <p className='md:text-[1.3vw] text-[4vw] text-center'>
                                    {projectData.category}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-[1vw] px-[2wv] md:px-[3vw] md:py-[3.8vw] py-[8vw] relative border-b-[1px] md:border-b-0 border-[#433E3E] md:border-r-[1px] h-full'>
                            <Image
                                src={projectData.logo}
                                alt={projectData.title}
                                width={600}
                                height={600}
                                className='md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-fit h-[9.5vw] md:h-[6vw] px-[2vw] object-contain'
                            />
                        </div>
                        <div className='flex flex-col items-center px-[2wv] md:py-[4vw] py-[9vw]'>
                            <div className='flex flex-col items-center md:items-start gap-[0.7vw] w-fit'>
                                <p className='md:text-[1.5vw] text-[5vw] text-center px-[2vw]'>
                                    {projectData.testimonial[0].feedback}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectsModel;