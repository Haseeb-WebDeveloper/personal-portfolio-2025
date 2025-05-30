export interface IHeroProjects {
    title: string;
    description: string;
    category: string;
    logo: string;
    projectImages: string[];
    viewProject: {
        link: string;
        label: string;
    }[];
    techStack: string[];
    moreInfo: string[];
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
        title: "Rate Our Job",
        description: "Platform that allows users to rate and review their jobs.",
        category: "Web Development",
        logo: "/logos/rateourjob.png",
        projectImages: [
            "/projects/rate-our-job.png",
            "/projects/enzig.png",
            "/projects/rate-our-job.png",
            "/projects/rate-our-job.png",
        ],
        viewProject: [
            { link: "https://rateourjob.com", label: "Figmenta" },
            { link: "https://rateourjob.com", label: "Figmenta Live" },
            { link: "https://rateourjob.com", label: "Figmenta Production" },
            { link: "https://rateourjob.com", label: "Figmenta Studio" },
        ],
        techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Shadcn/UI", "Tailwind CSS", "TypeScript", "Shadcn/UI"],
        moreInfo: [
            "I worked as a Frontend Developer on this project. I was responsible for I was responsible for the development of the frontend of the platform. I was also responsible",
        ],
        testimonial: [
            {
                name: "John Doe",
                role: "CEO & Founder of Enzig Studio",
                feedback: "This is a great project! I love the design and the functionality of the platform. Haseeb Helped us build this platform in a very short time and it was a great experience working with him.",
                rating: 5,
                image: "/avator/john.jpeg",
                link: "https://www.linkedin.com/company/enzig-studio"
            }
        ]
    },
    {
        title: "Rate Our Job",
        description: "Platform that allows users to rate and review their jobs.",
        category: "Web Development",
        logo: "/logos/rateourjob.png",
        projectImages: [
            "/projects/rate-our-job.png",
        ],
        viewProject: [
            { link: "https://rateourjob.com", label: "Live Site" },
            { link: "https://rateourjob.com", label: "Live Site" }
        ],
        techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Shadcn/UI"],
        moreInfo: [
            "I worked as a Frontend Developer on this project. I was responsible for",
            "I was responsible for the development of the frontend of the platform. I was also responsible"
        ],
        testimonial: [
            {
                name: "John Doe",
                role: "CEO & Founder of Enzig Studio",
                feedback: "This is a great project! I love the design and the functionality of the platform. Haseeb Helped us build this platform in a very short time and it was a great experience working with him.",
                rating: 5,
                image: "/avator/john.jpeg",
                link: "https://www.linkedin.com/company/enzig-studio"
            }
        ]
    },
]