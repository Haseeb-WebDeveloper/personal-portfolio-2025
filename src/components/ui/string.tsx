import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function String() {
    // Refs for SVG path and container elements
    const pathRef = useRef<SVGPathElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const path = pathRef.current
        if (!container || !path) return

        // Function to update the SVG path based on container dimensions
        const updatePath = () => {
            const width = window.innerWidth
            const rect = container.getBoundingClientRect()
            const centerY = rect.height / 2
            // Create a quadratic Bezier curve path
            path.setAttribute('d', `M 0 ${centerY} Q ${width / 2} ${centerY} ${width} ${centerY}`)
            return { width, centerY }
        }

        // Initialize the path
        const { width, centerY } = updatePath()

        // Handle mouse movement to create interactive string effect
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const relativeY = e.clientY - rect.top

            // Constrain vertical movement within container bounds
            const maxOffset = rect.height
            const clampedY = Math.min(Math.max(relativeY, centerY - maxOffset), centerY + maxOffset)

            // Animate path to follow mouse with smooth easing
            gsap.to(path, {
                attr: { d: `M 0 ${centerY} Q ${width / 2} ${clampedY} ${width} ${centerY}` },
                duration: 0.2,
                ease: "power2.out"
            })
        }

        // Reset string to center position when mouse leaves
        const handleMouseLeave = () => {
            gsap.to(path, {
                attr: { d: `M 0 ${centerY} Q ${width / 2} ${centerY} ${width} ${centerY}` },
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            })
        }

        // Update path on window resize
        const handleResize = updatePath

        // Add event listeners
        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', handleResize)

        // Cleanup event listeners
        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        // Container for the interactive string
        <div ref={containerRef} className="w-screen h-[20vw] relative overflow-hidden">
            <svg
                className=''
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                {/* SVG path that creates the string effect */}
                <path
                    ref={pathRef}
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth="1"
                />
            </svg>
        </div>
    )
}