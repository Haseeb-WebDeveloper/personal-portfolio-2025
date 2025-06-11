import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Haseeb Ahmed Raza Khan – Full Stack Developer",
    description:
        "Get in touch with Haseeb Ahmed Raza Khan, a passionate Full Stack Developer. Whether you have a project idea, collaboration proposal, or just want to connect – let's talk.",
    keywords: [
        "Contact Haseeb Ahmed Raza Khan",
        "Full Stack Developer contact",
        "Web developer contact form",
        "Hire React developer",
        "Next.js developer contact",
        "Freelance developer portfolio",
        "Work with Haseeb Ahmed",
        "Project collaboration",
        "Developer inquiry",
        "Hire full stack developer",
    ],
    openGraph: {
        title: "Contact | Haseeb Ahmed Raza Khan",
        description:
            "Reach out to Haseeb Ahmed Raza Khan for project inquiries, collaborations, or web development services. Let's bring your ideas to life.",
        url: "https://haseebkhan.online/contact",
        siteName: "Haseeb Ahmed Raza Khan Portfolio",
        images: [
            {
                url: "Haseeb-Ahmed-Raza-Khan-Full-Stack-Developer-OpenGrah-Image.png",
                width: 1200,
                height: 630,
                alt: "Contact page banner image",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact | Haseeb Ahmed Raza Khan",
        description:
            "Have a project or idea? Contact Haseeb Ahmed Raza Khan – Full Stack Developer – to start building something great.",
        images: ["Haseeb-Ahmed-Raza-Khan-Full-Stack-Developer-OpenGrah-Image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    metadataBase: new URL("https://haseebkhan.online"),
};


export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 