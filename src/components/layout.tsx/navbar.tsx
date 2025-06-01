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
            <nav className='relative flex justify-between items-center py-[1.67vw]'>

                {/* Logo */}
                <div className='flex items-center gap-[1vw]'>
                    <Image
                        src="/haseeb-ahmed-raza-khan.webp"
                        alt="Haseeb Ahmed web developer Logo"
                        width={600}
                        height={600}
                        priority
                        quality={100}
                        className='rounded-full object-cover object-top h-[3.8vw] w-[3.8vw] cursor-pointer'
                    />
                    <div className='flex flex-col gap-[0.3vw]'>
                        <h1 className='text-[1.4vw] font-medium'>Haseeb Ahmed Raza Khan</h1>
                        <div className='flex gap-[0.5vw] items-center'>
                            <div className='w-[0.5vw] h-[0.5vw] bg-primary aspect-square rounded-full'></div>
                            <p className='text-[1.2vw] leading-none'>Available for hire</p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className='flex items-center gap-[0.5vw]'>
                    <Link
                        href="/projects"
                        className="cursor-pointer relative flex items-center text-[1.11vw] font-medium h-[3.56vw] px-[1vw] border border-foreground/20 rounded-full leading-none"
                    >
                        Projects
                    </Link>
                    <button
                        onClick={handleFormOpen}
                        className="cursor-pointer relative flex items-center text-[1.11vw] font-medium h-[3.56vw] px-[1vw] border border-foreground/20 rounded-full leading-none"
                    >
                        Want Website?
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