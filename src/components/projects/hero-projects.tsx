"use client"

import { heroProjects, IHeroProjects } from "@/constent/projects";
import { Linkedin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CornerDownRight } from 'lucide-react';
import ScrollVelocity from "../ui/scroll-velocity";
import GSAPCardsAnimation from "../layout.tsx/cards";

export default function HeroProjects() {
    return (
        <>
            <section className="w-full h-full mt-[30vw] md:mt-[15vw]">
                {/* Projects section heading */}
                <div className="w-full h-full  mb-[8vw]">
                    <ScrollVelocity
                        texts={['Work that means something 💪']}
                        velocity={130}
                        className="custom-scroll-text text-[6vw] lg:text-[7vw] font-bold tracking-normal leading-[110%]"
                    />
                </div>

                <div className="section w-full h-full space-y-[12vw]">
                    {heroProjects.map((project: IHeroProjects, index: number) => (
                        <div key={index} className="w-full flex flex-col gap-[2vw]">
                            {/* Top Row */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
                                <div className="flex flex-col justify-between gap-[2vw]">
                                    <div className="max-w-[80%] space-y-[0.8vw] flex items-center gap-[1.5vw]">
                                        <div className="space-y-[0.8vw]">
                                            <div className="flex gap-[1vw] items-center">
                                                <h3 className="uppercase  text-[9vw] lg:text-[2.5vw] font-bold tracking-normal leading-none dm-sans">{project.title}</h3>
                                                {/* <Image src={project.logo} alt={project.title} width={500} height={500} className="h-[6vw] md:h-[5vw] lg:h-[4.2vw] w-fit rounded-full object-contain" /> */}
                                            </div>
                                            <p className="text-foreground text-[4.5vw] lg:text-[1.5vw] tracking-normal leading-[120%] dm-sans font-light">{project.description}</p>
                                        </div>
                                    </div>
                                    <div className="max-w-[90%] flex flex-wrap md:gap-[0.5vw] gap-[2vw]">
                                        {project.techStack.map((tech: string, index: number) => (
                                            <p key={index} className="text-[1.5vw] md:text-[1.5vw] lg:text-[1vw] tracking-normal px-[1.2vw] py-[0.5vw] rounded-full border border-border font-medium flex justify-center items-center dm-sans">{tech}</p>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end gap-[3vw]">
                                    <div className="max-w-[90%] space-y-[1vw]">
                                        {project.moreInfo.map((info: string, index: number) => (
                                            <p key={index} className="text-foreground text-[4.5vw] lg:text-[1.5vw] tracking-normal leading-[150%] dm-sans font-light" dangerouslySetInnerHTML={{ __html: info }} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[1vw]">
                                <div className="relative">
                                    <ProjectImageCarousel images={project.projectImages} title={project.title} category={project.category || ""} />
                                </div>
                                <div className={`w-full h-full `}
                                    style={{ backgroundColor: project.testimonialColor }}
                                >
                                    {project.testimonial.map((testimonial: any, index: number) => (
                                        <div key={index} className="w-full h-full p-[3vw] flex justify-center items-center">
                                            <div className="p-[2.5vw] rounded-tl-[2vw] bg-background/90 border-[0.1vw] border-border space-y-[2vw] backdrop-blur-sm">
                                                {/* Testimonial Header */}
                                                <div className="flex justify-between items-center gap-[4vw]">
                                                    <div className="flex items-center gap-[1vw]">
                                                        <Link href={testimonial.link} target="_blank" className="">
                                                            <Image className="w-[6vw] h-[6vw] md:w-[5vw] md:h-[5vw] lg:w-[4.2vw] lg:h-[4.2vw] rounded-full object-cover" src={testimonial.image} alt={testimonial.name} width={100} height={100} />
                                                        </Link>
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
                                                    <p className="text-[1.5vw] tracking-normal dm-sans">{testimonial.feedback}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full h-full flex justify-center items-center mt-[10vw]">
                    <Link href="/projects" className="flex border-b-2 border-foreground items-center gap-[1.2vw]">
                        <Image src="/icon/corner-down-right.svg" alt="corner-down-right" width={100} height={100} className="w-[5vw] h-[5vw] object-cover" />
                        <p className="text-[3.5vw] font-semibold tracking-normal uppercase">View All Projects</p>
                    </Link>
                </div>
                {/* test */}
                {/* <div className="w-full h-[10vw]">
                </div>
                <GSAPCardsAnimation /> */}
            </section>
        </>
    )
}

function ProjectImageCarousel({ images, title, category }: { images: { url: string; image: string }[], title: string, category?: string }) {
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
            <div className="absolute top-[0.5vw] left-[0.5vw] flex items-center gap-[0.5vw]">
                {category && <p className=" px-[1vw] py-[0.5vw] border border-foreground/40 rounded-full bg-background/50 backdrop-blur-sm">{category}</p>}
                <Link href={images[currentIndex].url} target="_blank" rel="noopener noreferrer" className=" px-[1vw] py-[0.5vw] border border-foreground/40 rounded-full bg-background/50 backdrop-blur-sm text-[1vw] font-medium tracking-normal">{images[currentIndex].url}</Link>
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