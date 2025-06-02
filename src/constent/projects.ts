export interface IHeroProjects {
    title: string;
    description: string;
    category?: string;
    logo: string;
    projectImages: {
        url: string;
        image: string;
    }[];
    techStack: string[];
    moreInfo: string[];
    testimonialColor: string;
    testimonial: {
        name: string;
        role: string;
        feedback: string;
        rating: number;
        image: string;
        link: string;
    }[];
}

export interface IProjects {
    title: string;
    description: string;
    slug: string;
    category?: string;
    logo: string;
    projectImages: {
        url: string;
        image: string;
    }[];
    techStack: string[];
    moreInfo: string[];
    testimonialColor: string;
    testimonial: {
        name: string;
        role: string;
        feedback: string;
        rating: number;
        image: string;
        link: string;
    }[];
}



export const heroProjects: IHeroProjects[] = [
    {
        title: "Figmenta",
        description: "Figmenta is a digital agency helping globally minded brands achieve their vision through creative, data-driven strategies and innovative solutions.",
        category: "Digital Agency",
        logo: "/projects/figmenta-logo.webp",
        projectImages: [
            {
                url: "https://figmenta.com",
                image: "/projects/figmenta-live.png",
            },
            {
                url: "https://studio.figmenta.com",
                image: "/projects/figmenta-studio.png",
            },
            {
                url: "https://live.figmenta.com",
                image: "/projects/figmenta-live.png",
            },
            {
                url: "https://production.figmenta.com",
                image: "/projects/figmenta-studio.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Notion"],
        moreInfo: [
            `<p>I helped <span class="lg:font-semibold font-medium tracking-wide">Figmenta</span> to rebuild their website from scratch. They were having a lot of issues with old website related to <span class="lg:font-semibold font-medium tracking-wide">CMS and performance</span>. I was able to help them with the development of the website and the integration of the Sanity CMS. I build them <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">5 different websites</span> for their different departments.</p>`,
        ],
        testimonialColor: "#13001A",
        testimonial: [
            {
                name: "Federico Hertel Gherardi",
                role: "Founder & CEO at Figmenta",
                feedback: "We were instantly impressed by Haseeb’s work and knew we wanted him on our team. Since joining us full time, he’s rebuilt our main website and built several others. His eye for detail and genuine care really stand out. We’re so happy with everything he’s built.",
                rating: 5,
                image: "/avator/Federico-Hertel-Gherardi.jpeg",
                link: "https://www.linkedin.com/in/federicohertelgherardi",
            }
        ]
    },
    {
        title: "Enzig Studio",
        description: "Enzig Studio is a creative digital marketing agency in Gurgaon, India that offers a range of services to help businesses grow and succeed online.",
        category: "Digital Agency",
        logo: "/logos/enzig.png",
        projectImages: [
            {
                url: "https://enzigstudio.com",
                image: "/projects/enzig.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Upwork"],
        moreInfo: [
            `<p>My journey with <span class="lg:font-semibold font-medium tracking-wide">Enzig Studio</span> started when they trusted me with building their cricket team website, <span class="font-medium">India Masters</span>. They loved the outcome and soon reached out again, this time to design and develop their <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">full agency website.</span> It was a big project with over 25 unique pages, modern, high-performance stack.</p>`
        ],
        testimonialColor: "#738a20",
        testimonial: [
            {
                name: "Akkshhat Khurania",
                role: "Founder of Enzig Studio",
                feedback: "We first worked with Haseeb on our India Masters project and were super happy with the result. So when it came time to build our own agency website, we knew exactly who to call. Haseeb handled everything so smoothly. Highly recomended ❤️",
                rating: 5,
                image: "/avator/Akkshhat-Khurania.jpeg",
                link: "https://www.linkedin.com/in/akshat-aggarwal3501",
            }
        ]
    },
    {
        title: "Shoelite",
        description: "Shoelite is an online website designed to help young entrepreneurs learn eCommerce, trading, and financial.",
        category: "Education",
        logo: "/logos/enzig.png",
        projectImages: [
            {
                url: "https://shoelite.club",
                image: "/projects/shoelite.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Upwork"],
        moreInfo: [
            `<p>Sho is a entrepreneur and he reached out after seeing my past work, and we quickly clicked on the vision for <span class="lg:font-semibold font-medium tracking-wide">Shoelite</span>. I helped him turn his ideas into a smooth, high-performing website that reflects his brand and mission perfectly. This website helped him to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">100+ students</span> in just 2 months.</p>`
        ],
        testimonialColor: "#5B4533",
        testimonial: [
            {
                name: "Sho",
                role: "Founder of Shoelite",
                feedback: "Working with Haseeb was a top-tier experience. He understood my vision right away and brought it to life even better than I imagined. The whole process was smooth, and the final website came out clean, fast, and just what I needed. Highly recommend him!",
                rating: 5,
                image: "/avator/sho.jpg",
                link: "https://www.instagram.com/sho.tradez/?igsh=MXFqbzE5a3JzaDZyeQ%3D%3D#",
            }
        ]
    },
    {
        title: "Rateourjob",
        description: "A modern AI-powered review platform helping businesses build trust and get valuable customer feedback — all on autopilot.",
        category: "AI & Business",
        logo: "/logos/rateourjob.png",
        projectImages: [
            {
                url: "https://www.rateourjob.com",
                image: "/projects/rateourjob.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Sanity CMS"],
        moreInfo: [
            `<p>The goal was simple, build a <span class="lg:font-semibold font-medium tracking-wide">high converting</span> landing page that communicates trust and makes it easy for businesses to understand the value of <span class="lg:font-semibold font-medium tracking-wide">AI driven reviews</span>. I focused on clean and modern design. The result? within 1 months, the website was able to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">20+ clients.</span></p>`
        ],
        testimonialColor: "#1A1550",
        testimonial: [
            {
                name: "Rajesh",
                role: "Founder & CEO of Rateourjob",
                feedback: "Haseeb completely nailed it. From design to development, he understood what I needed and delivered fast. The site looks professional, feels smooth, and most importantly, it's working well for our business.",
                rating: 5,
                image: "/avator/wasif-ali-khan.jpeg",
                link: "https://www.linkedin.com/in/wasif-ali-khan-wordpress-developer/",
            }
        ]
    },
    {
        title: "Fuzzie Automation",
        description: "An automation web-based software developed to streamline tasks across Google Drive, Slack, Notion, and Discord, simplifying workflow management.",
        category: "Automation Software",
        logo: "/logos/fuzzie-automation.png",
        projectImages: [
            {
                url: "https://github.com/Haseeb-WebDeveloper",
                image: "/projects/fuzzie-automation.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "Clerk", "Diffrent APIs"],
        moreInfo: [
            `<p>Fuzzie Automation was built to make life easier for teams juggling multiple platforms. I worked on creating a smooth, unified dashboard where users can connect their Google Drive, Slack, Notion, and Discord and <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">automate routine tasks with just a few clicks.</span> The goal was to reduce the daily back-and-forth and bring everything under one roof. Simple, clean, and super handy for productivity.</p>`
        ],
        testimonialColor: "#0A0F1D",
        testimonial: [
            {
                name: "Haseeb Ahmed Raza Khan",
                role: "Full Stack Developer",
                feedback: "This wasn’t a client project, it was something I built for to learn new things. It is not deployed but you can check out the github repo. It was the first that I works on any full stack project and since then I have worked on many full stack projects",
                rating: 5,
                image: "/avator/haseeb-ahmed-raza-khan.webp",
                link: "https://github.com/Haseeb-WebDeveloper/Fuzzie-Automation-Software",
            }
        ]
    },
    {
        title: "Assess GPT",
        description: "A web-based software that helps colleges to manage assignments, AI is used to grade assignments and provide feedback",
        category: "AI Multi Tenant Platform",
        logo: "/logos/assess-gpt.png",
        projectImages: [
            {
                url: "https://assess-gpt.com",
                image: "/projects/assess-gpt-2.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "AI APIs"],
        moreInfo: [
            `<p>This was my brother's idea. He is a student and he wanted to build a platform where he can get AI-powered grading and feedback for his assignments. After 1 month I build a multi tenant platform where univercities or teachers can create their subdomain and get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">AI-powered grading and feedback.</span></p>`
        ],
        testimonialColor: "#033358",
        testimonial: [
            {
                name: "Wasif Ali Khan",
                role: "Founder of Assess GPT",
                feedback: "Haseeb delivered exactly what we needed — a smooth, easy-to-use platform with powerful AI features. He was proactive, responsive, and brought great ideas to the table. The final product exceeded our expectations.",
                rating: 5,
                image: "/avator/wasif-ali-khan.jpeg",
                link: "https://www.linkedin.com/in/wasif-ali-khan-wordpress-developer/",
            }
        ]
    },
]



export const projects: IProjects[] = [
    {
        title: "Figmenta",
        description: "Figmenta is a digital agency helping globally minded brands achieve their vision through creative, data-driven strategies and innovative solutions.",
        slug: "figmenta",
        category: "Digital Agency",
        logo: "/projects/figmenta-logo.webp",
        projectImages: [
            {
                url: "https://figmenta.com",
                image: "/projects/figmenta-live.png",
            },
            {
                url: "https://studio.figmenta.com",
                image: "/projects/figmenta-studio.png",
            },
            {
                url: "https://live.figmenta.com",
                image: "/projects/figmenta-live.png",
            },
            {
                url: "https://production.figmenta.com",
                image: "/projects/figmenta-studio.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Notion"],
        moreInfo: [
            `<p>I helped <span class="lg:font-semibold font-medium tracking-wide">Figmenta</span> to rebuild their website from scratch. They were having a lot of issues with old website related to <span class="lg:font-semibold font-medium tracking-wide">CMS and performance</span>. I was able to help them with the development of the website and the integration of the Sanity CMS. I build them <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">5 different websites</span> for their different departments.</p>`,
        ],
        testimonialColor: "#13001A",
        testimonial: [
            {
                name: "Federico Hertel Gherardi",
                role: "Founder & CEO at Figmenta",
                feedback: "We were instantly impressed by Haseeb’s work and knew we wanted him on our team. Since joining us full time, he’s rebuilt our main website and built several others. His eye for detail and genuine care really stand out. We’re so happy with everything he’s built.",
                rating: 5,
                image: "/avator/Federico-Hertel-Gherardi.jpeg",
                link: "https://www.linkedin.com/in/federicohertelgherardi",
            }
        ]
    },
    {
        title: "Enzig Studio",
        description: "Enzig Studio is a creative digital marketing agency in Gurgaon, India that offers a range of services to help businesses grow and succeed online.",
        slug: "enzig-studio",
        category: "Digital Agency",
        logo: "/logos/enzig.png",
        projectImages: [
            {
                url: "https://enzigstudio.com",
                image: "/projects/enzig.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Upwork"],
        moreInfo: [
            `<p>My journey with <span class="lg:font-semibold font-medium tracking-wide">Enzig Studio</span> started when they trusted me with building their cricket team website, <span class="font-medium">India Masters</span>. They loved the outcome and soon reached out again, this time to design and develop their <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">full agency website.</span> It was a big project with over 25 unique pages, modern, high-performance stack.</p>`
        ],
        testimonialColor: "#738a20",
        testimonial: [
            {
                name: "Akkshhat Khurania",
                role: "Founder of Enzig Studio",
                feedback: "We first worked with Haseeb on our India Masters project and were super happy with the result. So when it came time to build our own agency website, we knew exactly who to call. Haseeb handled everything so smoothly. Highly recomended ❤️",
                rating: 5,
                image: "/avator/Akkshhat-Khurania.jpeg",
                link: "https://www.linkedin.com/in/akshat-aggarwal3501",
            }
        ]
    },
    {
        title: "Shoelite",
        description: "Shoelite is an online website designed to help young entrepreneurs learn eCommerce, trading, and financial.",
        slug: "shoelite",
        category: "Education",
        logo: "/logos/enzig.png",
        projectImages: [
            {
                url: "https://shoelite.club",
                image: "/projects/shoelite.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Upwork"],
        moreInfo: [
            `<p>Sho is a entrepreneur and he reached out after seeing my past work, and we quickly clicked on the vision for <span class="lg:font-semibold font-medium tracking-wide">Shoelite</span>. I helped him turn his ideas into a smooth, high-performing website that reflects his brand and mission perfectly. This website helped him to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">100+ students</span> in just 2 months.</p>`
        ],
        testimonialColor: "#5B4533",
        testimonial: [
            {
                name: "Sho",
                role: "Founder of Shoelite",
                feedback: "Working with Haseeb was a top-tier experience. He understood my vision right away and brought it to life even better than I imagined. The whole process was smooth, and the final website came out clean, fast, and just what I needed. Highly recommend him!",
                rating: 5,
                image: "/avator/sho.jpg",
                link: "https://www.instagram.com/sho.tradez/?igsh=MXFqbzE5a3JzaDZyeQ%3D%3D#",
            }
        ]
    },
    {
        title: "Rateourjob",
        description: "A modern AI-powered review platform helping businesses build trust and get valuable customer feedback — all on autopilot.",
        slug: "rateourjob",
        category: "AI & Business",
        logo: "/logos/rateourjob.png",
        projectImages: [
            {
                url: "https://www.rateourjob.com",
                image: "/projects/rateourjob.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Sanity CMS"],
        moreInfo: [
            `<p>The goal was simple, build a <span class="lg:font-semibold font-medium tracking-wide">high converting</span> landing page that communicates trust and makes it easy for businesses to understand the value of <span class="lg:font-semibold font-medium tracking-wide">AI driven reviews</span>. I focused on clean and modern design. The result? within 1 months, the website was able to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">20+ clients.</span></p>`
        ],
        testimonialColor: "#1A1550",
        testimonial: [
            {
                name: "Rajesh",
                role: "Founder & CEO of Rateourjob",
                feedback: "Haseeb completely nailed it. From design to development, he understood what I needed and delivered fast. The site looks professional, feels smooth, and most importantly, it's working well for our business.",
                rating: 5,
                image: "/avator/wasif-ali-khan.jpeg",
                link: "https://www.linkedin.com/in/wasif-ali-khan-wordpress-developer/",
            }
        ]
    },
    {
        title: "Fuzzie Automation",
        description: "An automation web-based software developed to streamline tasks across Google Drive, Slack, Notion, and Discord, simplifying workflow management.",
        slug: "fuzzie-automation",
        category: "Automation Software",
        logo: "/logos/fuzzie-automation.png",
        projectImages: [
            {
                url: "https://github.com/Haseeb-WebDeveloper",
                image: "/projects/fuzzie-automation.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "Clerk", "Diffrent APIs"],
        moreInfo: [
            `<p>Fuzzie Automation was built to make life easier for teams juggling multiple platforms. I worked on creating a smooth, unified dashboard where users can connect their Google Drive, Slack, Notion, and Discord and <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">automate routine tasks with just a few clicks.</span> The goal was to reduce the daily back-and-forth and bring everything under one roof. Simple, clean, and super handy for productivity.</p>`
        ],
        testimonialColor: "#0A0F1D",
        testimonial: [
            {
                name: "Haseeb Ahmed Raza Khan",
                role: "Full Stack Developer",
                feedback: "This wasn’t a client project, it was something I built for to learn new things. It is not deployed but you can check out the github repo. It was the first that I works on any full stack project and since then I have worked on many full stack projects",
                rating: 5,
                image: "/avator/haseeb-ahmed-raza-khan.webp",
                link: "https://github.com/Haseeb-WebDeveloper/Fuzzie-Automation-Software",
            }
        ]
    },
    {
        title: "Assess GPT",
        description: "A web-based software that helps colleges to manage assignments, AI is used to grade assignments and provide feedback",
        slug: "assess-gpt",
        category: "AI Multi Tenant Platform",
        logo: "/logos/assess-gpt.png",
        projectImages: [
            {
                url: "https://assess-gpt.com",
                image: "/projects/assess-gpt-2.png",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "AI APIs"],
        moreInfo: [
            `<p>This was my brother's idea. He is a student and he wanted to build a platform where he can get AI-powered grading and feedback for his assignments. After 1 month I build a multi tenant platform where univercities or teachers can create their subdomain and get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[1vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">AI-powered grading and feedback.</span></p>`
        ],
        testimonialColor: "#033358",
        testimonial: [
            {
                name: "Wasif Ali Khan",
                role: "Founder of Assess GPT",
                feedback: "Haseeb delivered exactly what we needed — a smooth, easy-to-use platform with powerful AI features. He was proactive, responsive, and brought great ideas to the table. The final product exceeded our expectations.",
                rating: 5,
                image: "/avator/wasif-ali-khan.jpeg",
                link: "https://www.linkedin.com/in/wasif-ali-khan-wordpress-developer/",
            }
        ]
    },
]