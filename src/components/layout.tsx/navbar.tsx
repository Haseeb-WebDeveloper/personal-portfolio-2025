"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Form from '../ui/form'

function Navbar() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleFormOpen = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <header className='section w-full'>
            <nav className='relative flex justify-between items-center py-[4vw] lg:py-[1.67vw]'>

                {/* Logo */}
                <Link href="/" className='flex items-center gap-[1.5vw] lg:gap-[1vw]'>
                    <Image
                        src="/haseeb-ahmed-raza-khan.webp"
                        alt="Haseeb Ahmed web developer Logo"
                        width={600}
                        height={600}
                        priority
                        quality={100}
                        className='rounded-full object-cover object-top h-[6.5vw] md:h-[5vw] lg:h-[3.8vw] w-[6.5vw] md:w-[5vw] lg:w-[3.8vw] cursor-pointer'
                    />
                    <div className='flex flex-col gap-[0.3vw]'>
                        <h1 className='hidden lg:block lg:text-[1.4vw] font-medium'>Haseeb Ahmed Raza Khan</h1>
                        <h1 className='lg:hidden text-[3.5vw] md:text-[3vw] font-medium'>Haseeb Ahmed</h1>
                        <div className='flex gap-[1vw] md:gap-[0.8vw] lg:gap-[0.5vw] items-center'>
                            <div className='w-[1.3vw] md:w-[2.5vw] lg:w-[0.5vw] h-[1.3vw] md:h-[2.5vw] lg:h-[0.5vw] bg-primary aspect-square rounded-full'></div>
                            <p className='text-[3vw] md:text-[2.5vw] lg:text-[1.2vw] leading-none'>Available for hire</p>
                        </div>
                    </div>
                </Link>

                {/* CTA Button */}
                <div className='flex items-center gap-[1.5vw] lg:gap-[0.5vw]'>
                    <Link
                        href="/projects"
                        className="cursor-pointer relative flex items-center text-[3.5vw] md:text-[3vw] lg:text-[1.11vw] font-medium h-[8vw] md:h-[4vw] lg:h-[3.56vw] px-[2vw] lg:px-[1vw] border border-foreground/20 rounded-full leading-none"
                    >
                        Projects
                    </Link>
                    <button
                        onClick={handleFormOpen}
                        className="cursor-pointer relative flex items-center text-[3.5vw] md:text-[3vw] lg:text-[1.11vw] font-medium h-[8vw] md:h-[4vw] lg:h-[3.56vw] px-[2vw] lg:px-[1vw] border border-foreground/20 rounded-full leading-none"
                    >
                        Contact
                    </button>
                </div>

            </nav>
            {isFormOpen && (
                <Form handleFormOpen={handleFormOpen} />
            )}
        </header>
    )
}

export default Navbar