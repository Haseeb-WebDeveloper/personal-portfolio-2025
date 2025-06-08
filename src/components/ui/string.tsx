import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function String() {
    const pathRef = useRef<SVGPathElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const path = pathRef.current
        const svg = svgRef.current
        if (!container || !path || !svg) return

        const updatePath = () => {
            const rect = container.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const centerY = height / 2

            svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
            path.setAttribute('d', `M 0 ${centerY} Q ${width / 2} ${centerY} ${width} ${centerY}`)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const centerY = height / 2
            const relativeY = e.clientY - rect.top
            const clampedY = Math.min(Math.max(relativeY, 0), height)

            gsap.to(path, {
                attr: { d: `M 0 ${centerY} Q ${width / 2} ${clampedY} ${width} ${centerY}` },
                duration: 0.2,
                ease: "power2.out",
            })
        }

        const handleMouseLeave = () => {
            const rect = container.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const centerY = height / 2

            gsap.to(path, {
                attr: { d: `M 0 ${centerY} Q ${width / 2} ${centerY} ${width} ${centerY}` },
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            })
        }

        const handleResize = () => {
            updatePath()
        }

        updatePath()

        container.addEventListener('mousemove', handleMouseMove)
        container.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', handleResize)

        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className='-my-[6vw]'>
            <div ref={containerRef} className="w-screen h-[50vw] lg:h-[30vw] relative overflow-hidden">
                <svg
                    ref={svgRef}
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        ref={pathRef}
                        stroke="white"
                        fill="transparent"
                        strokeWidth="1"
                    />
                </svg>
            </div>
        </div>
    )
}
