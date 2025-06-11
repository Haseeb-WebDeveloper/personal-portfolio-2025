import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with me for your next web project. Let's create something amazing together.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 