"use client"
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {

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
                <Link
                    href="mailto:web.dev.haseeb@gmail.com"
                    className="relative flex items-center text-[1.11vw] font-medium h-[3.56vw] px-[1.8vw] border border-foreground/20 rounded-full leading-none"
                >
                    Let's Talk
                </Link>

            </nav>
        </header>
    )
}

export default Navbar