"use client"

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import Image from "next/image";

export default function HomeVideo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    // const [currentTime, setCurrentTime] = useState(0);
    // const [duration, setDuration] = useState(0);
    const [isControlsHovered, setIsControlsHovered] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);

    // Store timeout references outside of effects
    const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Check if we're on a large screen before applying scroll animation
        const isLargeScreen = window.innerWidth >= 768; // md breakpoint
        setIsLargeScreen(isLargeScreen);

        if (isLargeScreen) {
            // Video container only for large screens
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
            // For small screens, just set the container to be visible without animation
            gsap.set("#video-container", {
                opacity: 1,
                scale: 1,
                borderRadius: "0px",
                paddingTop: "4vw",
            });
        }

        // Setup cursor animation - independent of cursor visibility
        if (cursorRef.current && containerRef.current) {
            const cursor = cursorRef.current;
            const container = containerRef.current;

            // Position cursor at the center initially
            const centerX = container.offsetWidth / 2;
            const centerY = container.offsetHeight / 2;

            // Adjust cursor size based on screen size
            const cursorSize = window.innerWidth >= 768 ? 1 : 0.8;
            // const cursorSize = window.innerWidth >= 768 ? 1 : 1

            gsap.set(cursor, {
                x: centerX,
                y: centerY + `${isLargeScreen ? 50 : 20}`,
                // scale: cursorSize
            });

            // Only add mouse tracking on large screens
            if (window.innerWidth >= 768) {
                const onMouseMove = (e: MouseEvent) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    // Always update cursor position but visibility is controlled separately
                    gsap.to(cursor, {
                        x: x,
                        y: y,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                };

                const onMouseLeave = () => {
                    // Return to center when mouse leaves
                    gsap.to(cursor, {
                        x: centerX,
                        y: centerY + `${isLargeScreen ? 50 : 20}`,
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
    }, []); // No dependencies to avoid re-running on hover state changes

    // Separate effect for cursor visibility - only depends on isControlsHovered
    useEffect(() => {
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                opacity: isControlsHovered ? 0 : 1,
                duration: 0.2,
                overwrite: true // Important: prevent animation conflicts
            });
        }
    }, [isControlsHovered]);

    // Set up video time update listener
    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (!video) return;

    //     const handleTimeUpdate = () => {
    //         setCurrentTime(video.currentTime);
    //     };

    //     const handleMetadata = () => {
    //         if (video.duration) {
    //             setDuration(video.duration);
    //         }
    //     };

    //     video.addEventListener('timeupdate', handleTimeUpdate);
    //     video.addEventListener('loadedmetadata', handleMetadata);

    //     return () => {
    //         video.removeEventListener('timeupdate', handleTimeUpdate);
    //         video.removeEventListener('loadedmetadata', handleMetadata);
    //     };
    // }, []);

    // Unified controls visibility management
    const showControlsWithTimeout = () => {
        // Clear any existing timeout to prevent race conditions
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
            hideControlsTimeoutRef.current = null;
        }

        // Show controls immediately
        setShowControls(true);

        // If not hovering controls and video is playing, set auto-hide timeout
        if (!isControlsHovered && isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    const handleVideoClick = (e: React.MouseEvent<HTMLVideoElement>) => {
        // Prevent click handling if clicked on controls
        if (controlsRef.current && controlsRef.current.contains(e.target as Node)) {
            return;
        }

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);

            // Animate cursor scale on play/pause
            if (cursorRef.current) {
                // Adjust scale based on screen size
                const baseScale = window.innerWidth >= 768 ? 1 : 0.8;

                gsap.to(cursorRef.current, {
                    scale: isPlaying ? baseScale : baseScale,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        }

        // Show controls temporarily after clicking
        showControlsWithTimeout();
    };

    const handleMuteToggle = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling to container/video
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event from bubbling to container/video
        if (videoRef.current) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                videoRef.current.requestFullscreen();
            }
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleControlsMouseEnter = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event bubbling
        setIsControlsHovered(true);

        // Clear any existing timeout to prevent controls from disappearing
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
            hideControlsTimeoutRef.current = null;
        }

        // Ensure controls are visible
        setShowControls(true);
    };

    const handleControlsMouseLeave = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stop event bubbling
        setIsControlsHovered(false);

        // Only auto-hide if video is playing
        if (isPlaying) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }
    };

    const handleContainerMouseEnter = () => {
        // Show controls when mouse enters container
        showControlsWithTimeout();
    };

    const handleContainerMouseLeave = () => {
        // When mouse leaves container completely, hide controls after a delay
        // but only if we're not hovering over controls
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
            {/* Custom cursor */}
            <div
                ref={cursorRef}
                className="pointer-events-none absolute top-0 left-0 z-[20]"

            >
                <div className="flex items-center justify-center"
                    style={{
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {isPlaying ? (
                        <Image src="/icon/stop-icon.svg" alt="stop" width={100} height={100} className=" w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw]" />
                    ) : (
                        <Image src="/icon/play-video-icon.svg" alt="play" width={100} height={100} className=" w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw]" />
                    )}
                </div>
            </div>

            {/* Video element */}
            <video
                ref={videoRef}
                src="/video/showcase.mp4"
                poster="/video-thumbnail.webp"
                loop
                playsInline
                onClick={handleVideoClick}
                className="w-full h-full object-cover rounded-2xl"
            />

            {/* Custom video controls overlay */}
            <div
                ref={controlsRef}
                className={`absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/70 to-transparent py-3 px-4 transition-opacity duration-300 z-[30] ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={handleControlsMouseEnter}
                onMouseLeave={handleControlsMouseLeave}
                style={{
                    pointerEvents: showControls ? 'auto' : 'none' // Only allow interaction when visible
                }}
            >
                <div className="flex items-center justify-between px-[0.5vw]">
                    <div className="flex items-center md:gap-[1vw] gap-[2vw]">
                        {/* Time display */}
                        {/* <span className="md:text-[1.2vw] text-[3vw]">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span> */}

                        {/* Mute/Unmute button */}
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

                    {/* Fullscreen button */}
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