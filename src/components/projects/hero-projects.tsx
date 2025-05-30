"use client"

import { heroProjects, IHeroProjects } from "@/constent/projects";
import { Linkedin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroProjects() {
    return (
        <>
            <section className="w-full h-full mt-[30vw] md:mt-[15vw] mb-[20vw]">
                {/* Projects heading */}
                <div className="w-full h-full  mb-[8vw]">
                    <h2 className="section text-pretty text-[6vw] lg:text-[5vw] font-bold tracking-normal leading-[110%]">projects I'm proud of</h2>
                </div>

                <div className="section w-full h-full space-y-[12vw]">
                    {heroProjects.map((project: IHeroProjects, index: number) => (
                        <div key={index} className="w-full flex flex-col gap-[2vw]">
                            {/* Top Row */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
                                <div className="flex flex-col justify-between gap-[3vw]">
                                    <div className="max-w-[80%] space-y-[0.8vw] flex items-center gap-[1.5vw]">
                                        <div className="space-y-[0.8vw]">
                                            <h3 className="uppercase text-pretty text-primary text-[9vw] lg:text-[2.5vw] font-bold tracking-normal leading-none">{project.title}</h3>
                                            <p className="text-foreground text-[4.5vw] lg:text-[1.5vw] tracking-normal leading-[120%]">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="max-w-[90%] flex flex-wrap md:gap-[0.5vw] gap-[2vw]">
                                        {project.viewProject.map((projectLink: { link: string; label: string }, index: number) => (
                                            <Link href={projectLink.link} target="_blank" rel="noopener noreferrer" key={index} className="text-[4vw] md:text-[3vw] lg:text-[1.1vw] tracking-normal md:px-[1.3vw] md:py-[0.6vw] px-[4vw] py-[3vw] rounded-full bg-secondary/30 border border-foreground/30 font-[400] flex justify-center items-center">{projectLink.label}</Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between gap-[3vw]">
                                    <div className="max-w-[90%] space-y-[1vw]">
                                        {project.moreInfo.map((info: string, index: number) => (
                                            <p key={index} className="text-foreground text-[4.5vw] lg:text-[1.5vw] tracking-normal leading-[150%]">{info}</p>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-[0.5vw]">
                                        {project.techStack.map((tech: string, index: number) => (
                                            <p key={index} className="text-[1.5vw] md:text-[1.5vw] lg:text-[1vw] tracking-normal px-[1.2vw] py-[0.5vw] rounded-full border border-border font-medium flex justify-center items-center">{tech}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
                                <div className="relative">
                                    <ProjectImageCarousel images={project.projectImages} title={project.title} />
                                </div>
                                <div className="w-full h-full bg-[#171137]">
                                    {project.testimonial.map((testimonial: any, index: number) => (
                                        <div key={index} className="w-full h-full flex justify-center items-center p-[4vw]">
                                            <div className="p-[2vw] rounded-2xl bg-white/5 border-[0.1vw] border-border shadow-lg space-y-[2vw] backdrop-blur-sm">
                                                {/* Testimonial Header */}
                                                <div className="flex justify-between items-center gap-[4vw]">
                                                    <div className="flex items-center gap-[1vw]">
                                                        <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="w-[6vw] h-[6vw] md:w-[5vw] md:h-[5vw] lg:w-[4.2vw] lg:h-[4.2vw] rounded-full object-cover" />
                                                        <div>
                                                            <p className="text-[1.4vw] font-medium tracking-normal">{testimonial.name}</p>
                                                            <p className="text-[1.1vw] font-medium tracking-normal">{testimonial.role}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-[1vw]">
                                                        <Link href={testimonial.link} target="_blank" className="text-[1.5vw] font-medium tracking-normal">
                                                            <Linkedin className="w-[2vw] h-[2vw] object-cover" />
                                                        </Link>
                                                    </div>
                                                </div>
                                                {/* Testimonial Body */}
                                                <div className="space-y-[1.2vw]">
                                                    {/* Rating */}
                                                    <div className="flex items-center gap-[0.5vw]">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-[1.6vw] h-[1.6vw] transition-all duration-300 ${i < testimonial.rating
                                                                    ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"
                                                                    : "text-gray-400"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    {/* Feedback */}
                                                    <p className="text-[1.5vw] font-medium tracking-normal">{testimonial.feedback}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

function ProjectImageCarousel({ images, title }: { images: string[], title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full">
            <Image
                src={images[currentIndex]}
                alt={title}
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
            />
            {/* Progress Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-8 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary' : 'bg-gray-400/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}