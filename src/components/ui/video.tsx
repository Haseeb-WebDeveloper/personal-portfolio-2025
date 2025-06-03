"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, Maximize } from "lucide-react";
import Image from "next/image";

export default function HomeVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [isControlsHovered, setIsControlsHovered] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const isLargeScreen = window.innerWidth >= 768;
        setIsLargeScreen(isLargeScreen);

        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);

        if (isLargeScreen) {
            gsap.fromTo(
                "#video-container",
                {
                    opacity: 0,
                    scale: 0.4,
                    borderRadius: "16px",
                    paddingTop: "0px",
                },
                {
                    opacity: 1,
                    scale: 1,
                    borderRadius: "0px",
                    paddingTop: "4vw",
                    duration: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#video-container",
                        start: "top top+=70%",
                        end: "center center",
                        scrub: 1,
                    }
                }
            );
        } else {
            gsap.set("#video-container", {
                opacity: 1,
                scale: 1,
                borderRadius: "0px",
                paddingTop: "4vw",
            });
        }

        if (cursorRef.current && containerRef.current) {
            const cursor = cursorRef.current;
            const container = containerRef.current;
            const centerX = container.offsetWidth / 2;
            const centerY = container.offsetHeight / 2;

            gsap.set(cursor, {
                x: centerX,
                y: centerY + (isLargeScreen ? 50 : 20),
            });

            if (window.innerWidth >= 768) {
                const onMouseMove = (e: MouseEvent) => {
                    const rect = container.getBoundingClientRect();
                    gsap.to(cursor, {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                };

                const onMouseLeave = () => {
                    gsap.to(cursor, {
                        x: centerX,
                        y: centerY + (isLargeScreen ? 50 : 20),
                        duration: 1.2,
                        ease: "power2.out"
                    });
                };

                container.addEventListener("mousemove", onMouseMove);
                container.addEventListener("mouseleave", onMouseLeave);

                return () => {
                    container.removeEventListener("mousemove", onMouseMove);
                    container.removeEventListener("mouseleave", onMouseLeave);
                };
            }
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                opacity: isControlsHovered ? 0 : 1,
                duration: 0.2,
                overwrite: true
            });
        }
    }, [isControlsHovered]);

    const showControlsWithTimeout = () => {
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
            hideControlsTimeoutRef.current = null;
        }

        setShowControls(true);

        if (!isControlsHovered && isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        if (controlsRef.current?.contains(e.target as Node)) return;

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);

            if (cursorRef.current) {
                const baseScale = window.innerWidth >= 768 ? 1 : 0.8;
                gsap.to(cursorRef.current, {
                    scale: baseScale,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }

        showControlsWithTimeout();
    };

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const handleControlsMouseEnter = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsControlsHovered(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
            hideControlsTimeoutRef.current = null;
        }
        setShowControls(true);
    };

    const handleControlsMouseLeave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsControlsHovered(false);
        if (isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    const handleContainerMouseEnter = () => showControlsWithTimeout();

    const handleContainerMouseLeave = () => {
        if (!isControlsHovered) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 1000);
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute opacity-0 z-[20] top-[55vh] md:top-[34vw] left-1/2 -translate-x-1/2 w-full h-fit md:max-w-[70vw] max-w-[90vw] md:cursor-none cursor-pointer group overflow-hidden"
            id="video-container"
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
        >
            <div
                ref={cursorRef}
                className="pointer-events-none absolute top-0 left-0 z-[20]"
            >
                <div 
                    className="flex items-center justify-center"
                    style={{ transform: 'translate(-50%, -50%)' }}
                >
                    <Image 
                        src={isPlaying ? "/icon/stop-icon.svg" : "/icon/play-video-icon.svg"}
                        alt={isPlaying ? "stop" : "play"}
                        width={100}
                        height={100}
                        className="w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw]"
                    />
                </div>
            </div>

            <video
                ref={videoRef}
                src="/video/showcase.mp4"
                poster="/video-thumbnail.webp"
                loop
                playsInline
                onClick={handleVideoClick}
                className="w-full h-full object-cover rounded-2xl"
            />

            <div
                ref={controlsRef}
                className={`absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/70 to-transparent py-3 px-4 transition-opacity duration-300 z-[30] ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={handleControlsMouseEnter}
                onMouseLeave={handleControlsMouseLeave}
                style={{ pointerEvents: showControls ? 'auto' : 'none' }}
            >
                <div className="flex items-center justify-between px-[0.5vw]">
                    <div className="flex items-center md:gap-[1vw] gap-[2vw]">
                        <button
                            onClick={handleMuteToggle}
                            className="cursor-pointer"
                        >
                            {isMuted ? (
                                <VolumeX className="md:w-[2vw] md:h-[2vw] w-[5vw] h-[5vw]" />
                            ) : (
                                <Volume2 className="md:w-[2vw] md:h-[2vw] w-[5vw] h-[5vw]" />
                            )}
                        </button>
                    </div>

                    <button
                        onClick={handleFullscreen}
                        className="cursor-pointer"
                    >
                        <Maximize className="md:w-[2vw] md:h-[2vw] w-[5vw] h-[5vw]" />
                    </button>
                </div>
            </div>
        </div>
    );
}