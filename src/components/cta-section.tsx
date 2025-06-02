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
        <section className="w-full flex flex-col items-center justify-center">
            <div className="bg-secondary md:max-w-[80vw] w-full lg:py-[6vw] py-[30vw] border border-primary/10 rounded-[2vw] text-center flex flex-col justify-center items-center lg:gap-[3vw] gap-[8vw] mx-auto">
                <h2 className="lg:max-w-[40vw] max-w-[90vw] text-[8vw] md:text-[3vw] lg:text-[3.5vw] lg:leading-[120%] leading-[140%] lg:font-bold font-medium">Ready to Build Something Amazing?</h2>
                <Button onClick={handleFormOpen} className="cursor-pointer w-fit flex items-center justify-center lg:gap-[0.5vw] gap-[2vw] lg:text-[1.4vw] text-[5vw] font-medium lg:px-[1vw] px-[4vw] lg:py-[1.7vw] py-[6.5vw] border border-foreground/20 rounded-full leading-none">
                    Start Your Project
                    <Image src="/icon/plus.svg" alt="plus" width={40} height={40} className="lg:w-[1.6vw] lg:h-[1.6vw] w-[6vw] h-[6vw]" />
                </Button>
            </div>

            {isFormOpen && (
                <Form handleFormOpen={handleFormOpen} />
            )}
        </section>
    )
}