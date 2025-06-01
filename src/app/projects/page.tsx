import { projects } from "@/constent/projects";
import ProjectsList from "@/components/projects/projects-list";

export default async function Works() {

    return (
        <>
            <div className="w-full mb-[10vw] mx-auto flex flex-col justify-center h-full relative">
                <h1 className="max-w-[85vw] mx-auto w-full min-h-[90vh] md:min-h-auto md:pt-[8vw] pt-[17vh] md:pb-[8vw] pb-[15vw] poppins text-[6.5vw] lg:text-[3.5vw] leading-[120%] tracking-tight">
                These are the websites and apps I’ve built. Unlike most agency work, they’re built with care, speed, and a deep focus on what actually works.
                </h1>
                <ProjectsList projects={projects} />
            </div>
        </>
    );
}
