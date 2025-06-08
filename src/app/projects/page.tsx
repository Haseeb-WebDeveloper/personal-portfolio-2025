import { projects } from "@/constent/projects";
import ProjectsList from "@/components/projects/projects-list";
import CTASection from "@/components/cta-section";
import CTALarge from "@/components/ui/cta-large";
import CTAMobile from "@/components/ui/cta-mobile";

export default async function Works() {

    return (
        <>
            <h1 className="max-w-[85vw] mx-auto w-full md:pt-[8vw] pt-[10vh] md:pb-[8vw] pb-[15vw] text-[8vw] lg:text-[3.5vw] leading-[130%] font-medium tracking-tight">
                These are the websites and apps I’ve built. Unlike most agency work, they’re built with care, speed, and a deep focus on what actually works.
            </h1>
            <div className="w-full lg:mb-[10vw] mb-[20vw]">
                <ProjectsList projects={projects} />
            </div>

            <div className="mt-[10vw] mb-[8vw] hidden lg:block">
                <CTALarge />
            </div>
            <div className="mt-[24vw] mb-[20vw] lg:hidden">
                <CTAMobile />
            </div>
        </>
    );
}
