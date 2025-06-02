import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Haseeb Ahmed Raza Khan – Full Stack Developer",
    description:
        "Explore real-world projects built by Haseeb Ahmed Raza Khan, including web apps, SaaS platforms, client work, and personal experiments showcasing clean code and modern design.",
    keywords: [
        "Haseeb Ahmed Raza Khan projects",
        "full stack developer portfolio",
        "web development projects",
        "Next.js projects",
        "Agency projects",
        "Business projects",
        "React developer work",
        "AI projects",
        "SaaS projects",
        "modern web design",
    ],
    openGraph: {
        title: "Projects | Haseeb Ahmed Raza Khan",
        description:
            "A curated collection of websites and apps built by Haseeb Ahmed Raza Khan, demonstrating expertise in full-stack development, UX, and performance.",
        url: "https://haseebkhan.online/projects",
        siteName: "Haseeb Ahmed Raza Khan Portfolio",
        images: [
            {
                url: "https://haseebkhan.online/figmenta-live.png",
                width: 1200,
                height: 630,
                alt: "Project showcase screenshot",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects | Haseeb Ahmed Raza Khan",
        description:
            "Explore apps, websites, and client work built by Haseeb Ahmed Raza Khan – Full Stack Developer.",
        images: ["https://haseebkhan.online/figmenta-live.png"],
    },
    metadataBase: new URL("https://haseebkhan.online"),
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

