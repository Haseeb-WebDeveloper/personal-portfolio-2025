"use client"

import ContactForm from "@/components/contact-form"

export default function ContactPage() {
    return (
        <section className="container mx-auto min-h-screen py-20">
            <div className="max-w-3xl mx-auto space-y-10">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
                    <p className="text-lg text-muted-foreground">
                        Have a project in mind? Fill out the form below and I&apos;ll get back to you as soon as possible.
                    </p>
                </div>
                
                {/* Contact Form */}
                <ContactForm />
            </div>
        </section>
    )
} 