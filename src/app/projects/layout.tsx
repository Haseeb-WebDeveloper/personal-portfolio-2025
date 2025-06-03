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
            "A curated collection of websites built by Haseeb Ahmed Raza Khan, demonstrating expertise in full-stack development, UX, and performance.",
        url: "https://haseebkhan.online/projects",
        siteName: "Haseeb Ahmed Raza Khan Portfolio",
        images: [
            {
                url: "Haseeb-Ahmed-Raza-Khan-Projects-OpenGrah-Image.png",
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
        images: ["Haseeb-Ahmed-Raza-Khan-Projects-OpenGrah-Image.png"],
    },
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    metadataBase: new URL("https://haseebkhan.online"),
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

