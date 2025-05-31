import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function String() {
    const [mouseY, setMouseY] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const pathRef = useRef<SVGPathElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            
            const rect = containerRef.current.getBoundingClientRect()
            const relativeY = e.clientY - rect.top
            setMouseY(relativeY)
            setIsHovering(true)

            // Clear any existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            // Set a new timeout to mark when the mouse stops moving
            timeoutRef.current = setTimeout(() => {
                setIsHovering(false)
                // Animate back to straight line
                if (pathRef.current) {
                    gsap.to(pathRef.current, {
                        attr: { d: `M 0 80 Q ${window.innerWidth / 2} 50 ${window.innerWidth} 50` },
                        duration: 1,
                        ease: "elastic.out(1, 0.3)"
                    })
                }
            }, 100)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!pathRef.current || !isHovering) return

        const controlPointY = mouseY
        const path = `M 0 50 Q ${window.innerWidth / 2} ${controlPointY} ${window.innerWidth} 50`

        gsap.to(pathRef.current, {
            attr: { d: path },
            duration: 0.5,
            ease: "power2.out"
        })
    }, [mouseY, isHovering])

    // Update path when window resizes
    useEffect(() => {
        const handleResize = () => {
            if (pathRef.current) {
                const path = `M 0 50 Q ${window.innerWidth / 2} 50 ${window.innerWidth} 50`
                pathRef.current.setAttribute('d', path)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Initial setup

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div ref={containerRef} className="w-screen h-[10vw] relative overflow-hidden">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path 
                    ref={pathRef}
                    d={`M 0 50 Q ${window.innerWidth / 2} 50 ${window.innerWidth} 50`}
                    stroke="currentColor" 
                    fill="transparent"
                    strokeWidth="1"
                />
            </svg>
        </div>
    )
}