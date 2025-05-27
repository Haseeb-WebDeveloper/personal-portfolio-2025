'use client'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    text: string
    link: string
    ariaLabel?: string
}

const UpDownButton = ({ text, link, ariaLabel }: Props) => {
    const [isHover, setIsHover] = useState(false);
    
    return (
        <div id="lets-talk" className="flex gap-2 text-[1rem]">
            <Link
                aria-label={ariaLabel}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                href={link}
                className={`relative z-50 overflow-hidden px-[1.8rem] py-[0.8rem] min-w-[8rem] rounded-full border-[1px] border-foreground/10 font-medium text-foreground ${isHover ? "bg-tertiary/90 text-foreground dark:bg-primary" : "bg-tertiary/95 dark:bg-primary/95"}`}>
                
                {/* First text element - slides up on hover */}
                <p className={`absolute inset-0 transform ease-in-out duration-500 flex items-center justify-center bg-tertiary/90 text-foreground dark:bg-primary whitespace-nowrap ${isHover ? "translate-y-[-150%]" : "translate-y-0"}`}>
                    {text}
                </p>
                
                {/* Second text element - slides in from bottom on hover */}
                <p className={`transform ease-in-out duration-500 flex items-center justify-center text-foreground bg-tertiary/95 dark:bg-primary/95 whitespace-nowrap ${isHover ? "translate-y-0" : "translate-y-[150%]"}`}>
                    {text}
                </p>
            </Link>
        </div>
    )
}

export default UpDownButton