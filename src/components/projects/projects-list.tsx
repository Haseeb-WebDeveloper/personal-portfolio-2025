import { IProjects } from "@/constent/projects";
import ProjectImageCarousel from "./project-image-carousel";


export default function ProjectsList({ projects }: { projects: IProjects[] }) {
    return (
        <>
            <div className="w-full h-full">
                <div className="grid grid-cols-1 gap-[18vw] md:gap-[0vw]">
                    {projects.map((project: IProjects, index: number) => (
                        <div
                            key={project.slug}
                            className={`relative grid grid-cols-1 md:grid-cols-2 border-foreground/20 ${index === projects.length - 1 ? 'lg:border-y' : 'lg:border-t '}`}
                        >
                            <div className="relative">
                                <ProjectImageCarousel
                                    images={project.projectImages}
                                    title={project.title}
                                    category={project.category || ""}
                                />
                            </div>
                            <div className="flex flex-col justify-between lg:gap-[2vw] gap-[8vw] lg:p-[3vw] p-[6vw]">
                                <div className="flex items-center lg:gap-[1.5vw] gap-[6vw]">
                                    <div className="space-y-[4vw] lg:space-y-[0.8vw]">
                                        <div className="flex gap-[1vw] items-center">
                                            <h3 className="uppercase text-[8vw] lg:text-[2.5vw] font-medium md:font-bold leading-[120%]">{project.title}</h3>
                                        </div>
                                        <p className="text-foreground font-light text-[5.8vw] lg:text-[1.8vw] lg:tracking-normal leading-[140%]  ">{project.description}</p>
                                    </div>
                                </div>
                                <div className="max-w-[90%] flex flex-wrap md:gap-[0.5vw] gap-[2.5vw]">
                                    {project.techStack.map((tech: string, index: number) => (
                                        <p key={index} className="text-[3.5vw] md:text-[1.5vw] lg:text-[1vw] lg:tracking-normal px-[3vw] py-[2vw] lg:px-[1.2vw] lg:py-[0.5vw] rounded-full border border-border font-medium flex justify-center items-center">{tech}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}