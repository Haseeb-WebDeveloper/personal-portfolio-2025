"use client";

import { heroProjects, IHeroProjects } from "@/constent/projects";
import { Linkedin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollVelocity from "../ui/scroll-velocity";
import ProjectImageCarousel from "./project-image-carousel";

export default function HeroProjects() {
  return (
    <>
      <section className="w-full h-full mt-[40vw] md:mt-[15vw] lg:mb-[10vw] mb-[20vw]">
        {/* Projects section heading */}
        <div className="w-full h-full mb-[15vw] lg:mb-[8vw]">
          <ScrollVelocity
            texts={["Work that means something 💪"]}
            velocity={130}
            className="custom-scroll-text text-[12vw] lg:text-[7vw] font-bold lg:tracking-normal leading-[110%]"
          />
        </div>

        <div className="section w-full h-full space-y-[20vw] md:space-y-[11vw]">
          {heroProjects.map((project: IHeroProjects, index: number) => (
            <div
              key={index}
              className="w-full flex flex-col lg:gap-[2vw] gap-[12vw]"
            >
              {/* Top Row */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-[1vw] gap-[8vw]">
                <div className="flex flex-col justify-between lg:gap-[2vw] gap-[6vw]">
                  <div className="max-w-[80%] space-y-[0.8vw] flex items-center gap-[1.5vw]">
                    <div className="space-y-[4vw] lg:space-y-[0.8vw]">
                      <div className="flex gap-[1vw] items-center">
                        <h3 className="uppercase text-[8vw] lg:text-[2.5vw] font-medium md:font-bold tracking-norma leading-none">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-foreground text-[5.5vw] lg:text-[1.8vw] lg:tracking-normal leading-[140%]  ">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="max-w-[90%] flex flex-wrap md:gap-[1.4vw] lg:gap-[0.5vw] gap-[2.5vw]">
                    {project.techStack.map((tech: string, index: number) => (
                      <p
                        key={index}
                        className="text-[4vw] md:text-[2.5vw] lg:text-[1vw] lg:tracking-normal px-[3vw] py-[2vw] lg:px-[1.2vw] lg:py-[0.5vw] rounded-full border border-foreground/70 font-medium flex justify-center items-center"
                      >
                        {tech}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-end gap-[3vw]">
                  <div className="max-w-[90%] space-y-[1vw]">
                    {project.moreInfo.map((info: string, index: number) => (
                      <p
                        key={index}
                        className="text-foreground text-[5.5vw] lg:text-[1.8vw] lg:tracking-normal leading-[140%]  "
                        dangerouslySetInnerHTML={{ __html: info }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-[1vw] gap-[8vw]">
                <div className="relative">
                  <ProjectImageCarousel
                    images={project.projectImages}
                    title={project.title}
                    category={project.category || ""}
                  />
                </div>
                <div
                  className={`relative w-full h-full `}
                  style={{ backgroundColor: project.testimonialColor }}
                >
                  {/* test background image */}
                  {/* <Image src="/test-bg.png" alt={project.title} width={1000} height={1000} className="w-full h-full object-cover absolute top-0 left-0" /> */}
                  {project.testimonial.map(
                    (testimonial: any, index: number) => (
                      <div
                        key={index}
                        className="w-full h-full lg:p-[3vw] p-[0.5vw] flex justify-center items-center"
                      >
                        <div className="lg:p-[2.5vw] p-[5vw] lg:rounded-tl-[2vw] bg-background/90 border-[0.1vw] border-border lg:space-y-[2vw] space-y-[6vw] backdrop-blur-sm">
                          {/* Testimonial Header */}
                          <div className="flex justify-between items-center gap-[4vw]">
                            {/* testimonial image and name */}
                            <div className="flex items-center lg:gap-[1vw] gap-[4vw]">
                              <Link
                                href={testimonial.link}
                                target="_blank"
                                className="h-full w-fit"
                              >
                                <Image
                                  className="w-[9vw] h-[9vw] md:w-[7vw] md:h-[7vw] lg:w-[4.2vw] lg:h-[4.2vw] rounded-full object-cover"
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  width={100}
                                  height={100}
                                />
                              </Link>
                              <div>
                                <p className="text-[4vw] md:text-[3vw] lg:text-[1.4vw] font-medium lg:tracking-normal leading-[150%]">
                                  {testimonial.name.length > 20
                                    ? `${testimonial.name.slice(0, 20)}...`
                                    : testimonial.name}
                                </p>
                                <p className="text-[3vw] md:text-[2vw] lg:text-[1.1vw] font-medium lg:tracking-normal leading-[110%]">
                                  {testimonial.role}
                                </p>
                              </div>
                            </div>
                            {/* testimonial link */}
                            <div className="flex items-center gap-[1vw]">
                              <Link
                                href={testimonial.link}
                                target="_blank"
                                className="text-[1.5vw] font-medium lg:tracking-normal"
                              >
                                <Linkedin className="lg:w-[2vw] lg:h-[2vw] w-[6vw] h-[6vw] object-cover" />
                              </Link>
                            </div>
                          </div>
                          {/* Testimonial Body */}
                          <div className="lg:space-y-[1.2vw] space-y-[3vw]">
                            {/* Rating */}
                            <div className="flex items-center lg:gap-[0.5vw] gap-[2vw]">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`lg:w-[1.6vw] lg:h-[1.6vw] w-[5vw] h-[5vw] transition-all duration-300 ${
                                    i < testimonial.rating
                                      ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"
                                      : "text-gray-400"
                                  }`}
                                />
                              ))}
                            </div>
                            {/* Feedback */}
                            <p className="text-[5vw] md:text-[4vw] lg:text-[1.5vw] lg:tracking-normal">
                              {testimonial.feedback}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-full flex justify-center items-center lg:mt-[8vw] mt-[15vw]">
          <Link href="/projects" className="border-b-2 border-foreground ">
            <div className="flex items-center lg:gap-[1.2vw] gap-[2.5vw]">
              <Image
                src="/icon/corner-down-right.svg"
                alt="corner-down-right"
                width={100}
                height={100}
                className="lg:w-[5vw] lg:h-[5vw] w-[10vw] h-[10vw] object-cover"
              />
              <p className="lg:text-[3.5vw] text-[5.5vw] font-semibold lg:tracking-normal uppercase">
                View All Projects
              </p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
