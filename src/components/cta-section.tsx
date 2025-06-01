"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import Form from "./ui/form"

export default function CTASection() {
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleFormOpen = () => {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <section className="w-full pt-[12vw] pb-[6vw] flex flex-col items-center justify-center">
            <div className="bg-secondary md:max-w-[80vw] w-full py-[6vw] border border-primary/10 rounded-[2vw] text-center flex flex-col justify-center items-center gap-[3vw] mx-auto">
                <h2 className="max-w-[40vw] text-[2.5vw] md:text-[3vw] lg:text-[3.5vw] leading-[120%] font-bold">Ready to Build Something Amazing?</h2>
                <Button onClick={handleFormOpen} className="cursor-pointer w-fit flex items-center justify-center gap-[0.5vw] text-[1.4vw] font-medium px-[1vw] py-[1.7vw] border border-foreground/20 rounded-full leading-none">
                    Start Your Project
                    <Image src="/icon/plus.svg" alt="plus" width={40} height={40} className="w-[1.6vw] h-[1.6vw]" />
                </Button>
            </div>

            {isFormOpen && (
                <Form handleFormOpen={handleFormOpen} />
            )}
        </section>
    )
}