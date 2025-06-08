"use client"

import Link from "next/link"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function NotFound() {
    useEffect(() => {
        const cursor = document.getElementById("custom-cursor")
        const handleMouseMove = (e: MouseEvent) => {
            if (cursor) {
                cursor.style.left = e.clientX + "px"
                cursor.style.top = e.clientY + "px"
            }
        }
        document.addEventListener("mousemove", handleMouseMove)
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
            {/* Custom cursor */}
            <div
                id="custom-cursor"
                className="fixed w-4 h-4 bg-primary rounded-full pointer-events-none mix-blend-difference z-50 -translate-x-1/2 -translate-y-1/2"
            />

            {/* Background text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <h1 className="text-[40vw] font-bold">404</h1>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground text-lg mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Go Home
                </Link>
            </motion.div>

        </div>
    )
}