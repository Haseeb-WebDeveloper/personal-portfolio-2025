"use client"

import { IProjects } from "@/constent/projects";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ProjectModel from "./project-model";


export default function ProjectsList({ projects }: { projects: IProjects[] }) {
    const [showProjectsModel, setShowProjectsModel] = useState(false);
    const [selectedProjects, setSelectedProjects] = useState<IProjects | null>(null);
    const pathname = usePathname();

    // Refs for animation
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
    const [clickedItemRect, setClickedItemRect] = useState<DOMRect | null>(null);
    const [clickedImageRect, setClickedImageRect] = useState<DOMRect | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOpenProjects = (e: React.MouseEvent<HTMLDivElement>, project: IProjects, index: number) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the clicked item and image positions
        const itemRect = projectRefs.current[index]?.getBoundingClientRect() || null;
        const imageRect = imageRefs.current[index]?.getBoundingClientRect() || null;

        // Store the positions and dimensions
        setClickedItemRect(itemRect);
        setClickedImageRect(imageRect);
        setClickedIndex(index);


        // Slight delay before opening modal to allow fade effect
        setIsAnimating(true);
        setShowProjectsModel(true);
        setSelectedProjects(project);
    };

    const handleClose = () => {
        if (isAnimating) return;
        setIsAnimating(true);

    };

    const onCloseAnimationComplete = () => {
        setShowProjectsModel(false);
        setSelectedProjects(null);
        setClickedIndex(-1);
        setClickedItemRect(null);
        setClickedImageRect(null);
        setIsAnimating(false);
    };

    return (
        <>
            <div className="w-full h-full mb-12 md:mb-[12vw]">
                <div className="grid grid-cols-1">
                    {projects.map((project: IProjects, index: number) => (
                        <div
                            key={project.slug}
                            className="relative grid grid-cols-1 md:grid-cols-2"
                            ref={
                                el => {
                                    projectRefs.current[index] = el;
                                }
                            }
                            onClick={(e) => handleOpenProjects(e, project, index)}
                        >
                            <Image
                                ref={el => {
                                    imageRefs.current[index] = el;
                                }}
                                src={project.projectImages[0].image || ''}
                                alt={project.title}
                                width={800}
                                height={600}
                                className="w-full object-cover h-[70vw] md:h-[28vw]"
                            />
                            <div className="flex flex-col justify-between gap-[2vw]">
                                <div className="space-y-[0.8vw] flex items-center gap-[1.5vw]">
                                    <div className="space-y-[0.8vw]">
                                        <div className="flex gap-[1vw] items-center">
                                            <h3 className="uppercase  text-[9vw] lg:text-[2.5vw] font-bold tracking-normal leading-none dm-sans">{project.title}</h3>
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
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedProjects && (
                <ProjectModel
                    isOpen={showProjectsModel}
                    onClose={handleClose}
                    onAnimationComplete={onCloseAnimationComplete}
                    projectData={selectedProjects}
                    clickedItemRect={clickedItemRect}
                    clickedImageRect={clickedImageRect}
                    clickedIndex={clickedIndex}
                    setIsAnimating={setIsAnimating}
                />
            )}
        </>
    );
}