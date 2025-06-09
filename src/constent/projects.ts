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
    projectImages: {
        url: string;
        image: string;
    }[];
    techStack: string[];
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
                image: "/projects/figmenta-live.webp",
            },
            {
                url: "https://studio.figmenta.com",
                image: "/projects/figmenta-studio.webp",
            },
            {
                url: "https://live.figmenta.com",
                image: "/projects/figmenta-live.webp",
            },
            {
                url: "https://production.figmenta.com",
                image: "/projects/figmenta-studio.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Notion"],
        moreInfo: [
            `<p>I helped <span class="lg:font-semibold font-medium tracking-wide">Figmenta</span> to rebuild their website from scratch. They were having a lot of issues with old website related to <span class="lg:font-semibold font-medium tracking-wide">CMS and performance</span>. I was able to help them with the development of the website and the integration of the Sanity CMS. I build them <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">5 different websites</span> for their different departments.</p>`,
        ],
        testimonialColor: "#13001A",
        testimonial: [
            {
                name: "Federico Hertel Gherardi",
                role: "Founder & CEO at Figmenta",
                feedback: "You know that feeling when you find someone who just gets it? That's what happened with Haseeb. He didn't just rebuild our website - he transformed it. The way he handled our CMS issues and built those five different sites... honestly, it exceeded what we thought was possible. His attention to detail is something else!",
                rating: 5,
                image: "/avator/Federico-Hertel-Gherardi.jpeg",
                link: "https://www.linkedin.com/in/federicohertelgherardi",
            }
        ]
    },
    // {
    //     title: "Enzig Studio",
    //     description: "Enzig Studio is a creative digital marketing agency in Gurgaon, India that offers a range of services to help businesses grow and succeed online.",
    //     category: "Digital Agency",
    //     logo: "/logos/enzig.webp",
    //     projectImages: [
    //         {
    //             url: "https://enzigstudio.com",
    //             image: "/projects/enzig.webp",
    //         },
    //     ],
    //     techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Upwork"],
    //     moreInfo: [
    //         `<p>My journey with <span class="lg:font-semibold font-medium tracking-wide">Enzig Studio</span> started when they trusted me with building their cricket team website, <span class="font-medium">India Masters</span>. They loved the outcome and soon reached out again, this time to design and develop their <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">full agency website.</span> It was a big project with over 25 unique pages, modern, high-performance stack.</p>`
    //     ],
    //     testimonialColor: "#738a20",
    //     testimonial: [
    //         {
    //             name: "Akkshhat Khurania",
    //             role: "Founder of Enzig Studio",
    //             feedback: "We first worked with Haseeb on our India Masters project and were super happy with the result. So when it came time to build our own agency website, we knew exactly who to call. Haseeb handled everything so smoothly. Highly recomended ❤️",
    //             rating: 5,
    //             image: "/avator/Akkshhat-Khurania.jpeg",
    //             link: "https://www.linkedin.com/in/akshat-aggarwal3501",
    //         }
    //     ]
    // },
    {
        title: "Shoelite",
        description: "Shoelite is an online website designed to help young entrepreneurs learn eCommerce, trading, and financial.",
        category: "Education",
        logo: "/logos/enzig.webp",
        projectImages: [
            {
                url: "https://shoelite.club",
                image: "/projects/shoelite.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Upwork"],
        moreInfo: [
            `<p>Sho is a entrepreneur and he reached out after seeing my past work, and we quickly clicked on the vision for <span class="lg:font-semibold font-medium tracking-wide">Shoelite</span>. I helped him turn his ideas into a smooth, high-performing website that reflects his brand and mission perfectly. This website helped him to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">100+ students</span> in just 2 months.</p>`
        ],
        testimonialColor: "#5B4533",
        testimonial: [
            {
                name: "Sho",
                role: "Founder of Shoelite",
                feedback: "Man, I can't thank Haseeb enough! 😊 When I first reached out, I had this vision but wasn't sure how to make it happen. He not only got it right away but made it even better than I imagined. The site's been crushing it, we got over 100 students in just 2 months! That's crazy good ROI right there.",
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
        logo: "/logos/rateourjob.webp",
        projectImages: [
            {
                url: "https://www.rateourjob.com",
                image: "/projects/rateourjob.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Sanity CMS"],
        moreInfo: [
            `<p>The goal was simple, build a <span class="lg:font-semibold font-medium tracking-wide">high converting</span> landing page that communicates trust and makes it easy for businesses to understand the value of <span class="lg:font-semibold font-medium tracking-wide">AI driven reviews</span>. I focused on clean and modern design. The result? within 1 months, the website was able to get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">20+ clients.</span></p>`
        ],
        testimonialColor: "#1A1550",
        testimonial: [
            {
                name: "Wasif Ali Khan",
                role: "Founder & CEO of Rateourjob",
                feedback: "I was worried about how to present our AI review system in a way that wouldn't overwhelm potential clients. He just... got it. Within a month of launching the site he built, we had 20+ new clients! The site isn't just pretty - it actually converts. Couldn't be happier with the results.",
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
        logo: "/logos/fuzzie-automation.webp",
        projectImages: [
            {
                url: "https://github.com/Haseeb-WebDeveloper",
                image: "/projects/fuzzie-automation.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "Clerk", "Diffrent APIs"],
        moreInfo: [
            `<p>Fuzzie Automation was built to make life easier for teams juggling multiple platforms. I worked on creating a smooth, unified dashboard where users can connect their Google Drive, Slack, Notion, and Discord and <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">automate routine tasks with just a few clicks.</span> The goal was to reduce the daily back-and-forth and bring everything under one roof. Simple, clean, and super handy for productivity.</p>`
        ],
        testimonialColor: "#0A0F1D",
        testimonial: [
            {
                name: "Haseeb Ahmed Raza Khan",
                role: "Full Stack Developer",
                feedback: "This was actually my first dive into building a full-stack automation platform. I wanted to solve a real problem - the hassle of switching between different tools all day. While it's not deployed yet, building this taught me so much about integrating different APIs and creating a unified dashboard. Check out the code if you're curious!",
                rating: 5,
                image: "/avator/haseeb-ahmed-raza-khan.webp",
                link: "github.com/Haseeb-WebDeveloper/Fuzzie-Automation-Software",
            }
        ]
    },
    {
        title: "Assess GPT",
        description: "A web-based software that helps colleges to manage assignments, AI is used to grade assignments and provide feedback",
        category: "AI Multi Tenant Platform",
        logo: "/logos/assess-gpt.webp",
        projectImages: [
            {
                url: "https://assess-gpt.com",
                image: "/projects/assess-gpt-2.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "AI APIs"],
        moreInfo: [
            `<p>This was my brother's idea. He is a student and he wanted to build a platform where he can get AI-powered grading and feedback for his assignments. After 1 month I build a multi tenant platform where univercities or teachers can create their subdomain and get <span class="lg:font-bold font-semibold lg:px-[0.3vw] px-[2vw] py-[0.8vw] lg:py-[0.1vw] rounded bg-primary text-primary-foreground tracking-wide">AI-powered grading and feedback.</span></p>`
        ],
        testimonialColor: "#033358",
        testimonial: [
            {
                name: "Wasif Ali Khan",
                role: "Founder of Assess GPT",
                feedback: "My brother and I had been talking about this idea for ages - using AI to help with assignment grading. When Haseeb took it on, he didn't just code it, he made it real. The multi-tenant setup was exactly what we needed, and the way he integrated the AI features... just brilliant. Teachers actually enjoy using it, which is exactly what we wanted!",
                rating: 5,
                image: "/avator/wasif-ali-khan.jpeg",
                link: "https://www.linkedin.com/in/wasif-ali-khan-wordpress-developer/",
            }
        ]
    },
]



export const projects: IProjects[] = [
    // Figmenta
    {
        title: "Figmenta",
        description: "Partnered with Figmenta, a boutique digital agency operating across 8 countries with prestigious clients like Moët & Chandon and Sebastian Professional. This Milan-based creative powerhouse specializes in beauty industry marketing, combining 'Made in Italy' style with data-driven strategies to help globally-minded brands achieve their vision.",
        slug: "figmenta",
        category: "Digital Agency",
        projectImages: [
            {
                url: "https://figmenta.com",
                image: "/projects/figmenta-live.webp",
            },
            {
                url: "https://studio.figmenta.com",
                image: "/projects/figmenta-studio.webp",
            },
            {
                url: "https://live.figmenta.com",
                image: "/projects/figmenta-live.webp",
            },
            {
                url: "https://production.figmenta.com",
                image: "/projects/figmenta-studio.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Notion"],
    },
    // India Masters
    {
        title: "India Masters",
        description: "Built the official website for India Masters, the 2025 International Masters League champions featuring cricket legends like Sachin Tendulkar, Yuvraj Singh, and Suresh Raina. The platform showcases their championship victory, provides live scores, player profiles, and match schedules for this revolutionary T20 tournament bringing retired cricket superstars back to competitive play.",
        slug: "india-masters",
        category: "Sports",
        projectImages: [
            {
                url: "https://indiamasters.co.in",
                image: "/projects/indiamasters.webp"
            }
        ],
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "GSAP",
            "Figma",
            "Upwork"
        ],
    },
    // Uptraction
    {
        title: "Uptraction",
        description: "Created a performance-focused website for Uptraction, a digital marketing agency delivering 'traction at its highest.' The platform showcases their expertise in Google Ads, Meta Ads, TikTok Ads, SEO strategy, and conversion optimization. Features client testimonials and detailed service offerings that help businesses achieve measurable ROI through data-driven campaigns.",
        slug: "uptraction",
        category: "Agency Website",
        projectImages: [
            {
                url: "https://uptraction.com",
                image: "/projects/uptraction.webp"
            }
        ],
        techStack: [
            "WordPress",
            "Elementor Pro",
            "Custom CSS",
            "Plugins"
        ],
    },
    // Enzig Studio
    {
        title: "Enzig Studio",
        description: "Collaborated with Enzig Studio, a creative digital marketing agency in Gurgaon offering comprehensive solutions from Google Ads to website development. The platform showcases their impressive client portfolio including India Masters and BleedingEdge Technologies, highlighting their 'family style' approach to building lasting relationships and delivering growth strategies.",
        slug: "enzig-studio",
        category: "Digital Agency",
        projectImages: [
            {
                url: "https://enzigstudio.com",
                image: "/projects/enzig.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Sanity CMS", "Tailwind CSS", "Shadcn/UI", "WebGL", "GSAP", "Figma", "Upwork"],
    },
    // Shoelite
    {
        title: "Shoelite",
        description: "Built an educational platform for Shoelite (Sh0 Elite Club), teaching financial freedom through e-commerce and trading. Founded by Sho who achieved million złoty revenue by age 18, this Polish platform offers courses in dropshipping, TikTok Ads, Shopify optimization, and advanced trading strategies with lifetime access and exclusive Discord community.",
        slug: "shoelite",
        category: "Education",
        projectImages: [
            {
                url: "https://shoelite.club",
                image: "/projects/shoelite.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Upwork"],
    },
    // Rateourjob
    {
        title: "Rateourjob",
        description: "Developed an automated review generation platform helping 400+ local businesses dominate search results. This AI-powered system automatically requests reviews, filters feedback, and generates responses, delivering impressive results like +997% review growth (39→428 reviews) to help businesses outrank competitors through enhanced social proof.",
        slug: "rateourjob",
        category: "AI & Business",
        projectImages: [
            {
                url: "https://www.rateourjob.com",
                image: "/projects/rateourjob.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Brevo", "Sanity CMS"],
    },
    // JSON Formatter Online
    {
        title: "JSON Formatter Online",
        description: "Created a comprehensive developer toolkit serving as the ultimate JSON manipulation platform. This all-in-one solution offers formatting, validation, comparison, and conversion capabilities without signup. Features a powerful code editor, API data fetching, file uploads, and supports multiple formats including JSON, XML, CSV, and YAML.",
        slug: "json-formatter-online",
        category: "Developer Tool",
        projectImages: [
            {
                url: "https://www.jsonformatteronline.site/",
                image: "/projects/jsonformatteronline.webp"
            }
        ],
        techStack: [
            "Next.js",
            "Tailwind CSS",
            "JavaScript",
            "Zod",
            "React",
            "Vercel",
            "CodeEditor"
        ],
    },
    // Fuzzie Automation
    {
        title: "Fuzzie Automation",
        description: "Designed an automation platform that unifies workplace productivity by connecting Google Drive, Slack, Notion, and Discord through intelligent workflows. This system eliminates app-juggling by creating seamless automated processes, empowering teams to build custom workflows and boost productivity through efficient cross-platform integrations.",
        slug: "fuzzie-automation",
        category: "Automation Software",
        projectImages: [
            {
                url: "https://github.com/Haseeb-WebDeveloper",
                image: "/projects/fuzzie-automation.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "Clerk", "Different APIs"],
    },
    // Assess GPT
    {
        title: "Assess GPT",
        description: "Built a revolutionary AI-powered educational assessment platform transforming grading for teachers worldwide. With 10K+ active teachers, 50K+ daily student engagements, and 1M+ automatically graded assignments, this multi-tenant SaaS platform provides meaningful feedback while significantly reducing grading time through intelligent AI assistance.",
        slug: "assess-gpt",
        category: "AI Multi Tenant Platform",
        projectImages: [
            {
                url: "https://assess-gpt.com",
                image: "/projects/assess-gpt-2.webp",
            },
        ],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "GSAP", "Node", "Express", "MongoDB", "AI APIs"],
    },
    // AI‑SEO SaaS Landing Page
    {
        title: "AI‑SEO SaaS Landing Page",
        description: "Crafted an innovative landing page demonstrating the future of SEO through artificial intelligence. This platform showcases AI-powered tools featuring user-friendly dashboards, one-click optimization, and smart keyword generation. Includes client success stories from Quantum, Pulse, and Tech Solutions, showing how AI-driven SEO delivers measurable results.",
        slug: "ai-seo-landing-page",
        category: "AI & SaaS",
        projectImages: [
            {
                url: "https://ai-seo-tool.netlify.app",
                image: "/projects/ai-seo-landing-page.webp"
            }
        ],
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "GSAP",
            "Lottie animations",
            "Netlify",
            "Figma"
        ],
    },
    // Isodomi Project Suite
    {
        title: "Isodomi Project Suite",
        description: "Delivered a comprehensive digital ecosystem for sustainable home improvement across the Netherlands with three specialized websites. Isodomi focuses on insulation, Duradomi offers complete sustainability solutions, while Renodomi provides turnkey renovations. Each platform features project management, subsidy guidance, and professional execution throughout the Randstad region.",
        slug: "isodomi-project-suite",
        category: "Construction & Renovation",
        projectImages: [
            {
                url: "https://isodomi.nl/",
                image: "/projects/isodomi.webp"
            },
            {
                url: "https://duradomi.nl/",
                image: "/projects/duradomi.webp"
            },
            {
                url: "https://renodomi.nl",
                image: "/projects/renodomi.webp"
            },
        ],
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "GSAP",
            "Netlify",
            "Figma"
        ],
    },
    // Sentriq AI
    {
        title: "Sentriq AI",
        description: "Designed a sophisticated cybersecurity platform simplifying enterprise-grade protection for SMBs through AI-powered consultation. SentrIQ offers 24/7 AI cybersecurity assistance, compliance support for SOC 2 and HIPAA, actionable threat alerts, and seamless escalation to certified consultants, making cybersecurity accessible and affordable.",
        slug: "sentriq-ai-cybersecurity",
        category: "Landing Page",
        projectImages: [
            {
                url: "https://sentriq.io",
                image: "/projects/sentriq.webp"
            }
        ],
        techStack: [
            "Wordpress",
            "Elementor",
            "Upwork",
            "Figma"
        ],
    },
    // Seaside Transportation
    {
        title: "Seaside Transportation",
        description: "Created an elegant website for Santa Barbara's premier luxury car service in the 'American Riviera.' This platform showcases elite fleet services including wedding transportation, airport transfers, executive rides, and point-to-point luxury travel. Features extensive client testimonials and emphasizes 24/7 professional chauffeur service.",
        slug: "seaside-transportation",
        category: "Business Website",
        projectImages: [
            {
                url: "https://www.seaside-transportation.com",
                image: "/projects/seaside-transportation.webp"
            }
        ],
        techStack: [
            "Nuxt.js",
            "Vue.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "GSAP",
            "Figma"
        ],
    },
    // Wasif Ali Khan
    {
        title: "Wasif Ali Khan",
        description: "Built a professional portfolio for Wasif Ali Khan, a skilled WordPress developer specializing in dynamic and responsive websites. This clean, performance-optimized portfolio showcases his expertise in WordPress development, Bricks Builder, ACF, and ACSS, demonstrating his ability to create both no-code WordPress solutions and full-stack applications.",
        slug: "wasif-ali-wordpress-portfolio",
        category: "Portfolio Website",
        projectImages: [
            {
                url: "https://wasif-khan.netlify.app/",
                image: "/projects/wasif-khan.webp"
            }
        ],
        techStack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn/UI",
            "GSAP",
            "Framer Motion"
        ],
    },
]