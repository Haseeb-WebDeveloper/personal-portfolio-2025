"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import SocialMediaIcon from "./layout.tsx/social-media"

interface FormData {
    fullName: string
    country: string
    companyName: string
    email: string
    projectType: string
    projectDescription: string
    budget: string
}

interface FormErrors {
    fullName: string
    country: string
    email: string
    projectType: string
    projectDescription: string
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        country: "",
        companyName: "",
        email: "",
        projectType: "",
        projectDescription: "",
        budget: ""
    })
    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        country: "",
        email: "",
        projectType: "",
        projectDescription: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validateField = (name: keyof FormErrors, value: string): string => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return "Full name is required"
                if (value.trim().length < 2) return "Full name must be at least 2 characters"
                return ""
            case 'email':
                if (!value.trim()) return "Email is required"
                if (!emailRegex.test(value)) return "Please enter a valid email address"
                return ""
            case 'country':
                if (!value.trim()) return "Country is required"
                return ""
            case 'projectType':
                if (!value) return "Please select a project type"
                return ""
            case 'projectDescription':
                if (!value.trim()) return "Project description is required"
                if (value.trim().length < 5) return "Please provide more details (at least 5 characters)"
                return ""
            default:
                return ""
        }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: "" }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            fullName: validateField('fullName', formData.fullName),
            email: validateField('email', formData.email),
            country: validateField('country', formData.country),
            projectType: validateField('projectType', formData.projectType),
            projectDescription: validateField('projectDescription', formData.projectDescription)
        }

        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error !== "")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/send-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsSuccess(true)
                setFormData({
                    fullName: "",
                    country: "",
                    companyName: "",
                    email: "",
                    projectType: "",
                    projectDescription: "",
                    budget: ""
                })
            }
        } catch (error) {
            console.error('Error sending email:', error)
        }
        setIsSubmitting(false)
    }

    if (isSuccess) {
        return (
            <div className="text-center space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Thank You! 🧑🏻‍💻</h3>
                    <p className="text-muted-foreground">
                        Your message has been sent <span className="font-medium text-primary">successfully</span>.<br />
                        I will get back to you soon.
                    </p>
                </div>
                <div>
                    <SocialMediaIcon />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
                <div>
                    <Input
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`h-12 ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                </div>
                <div>
                    <Input
                        placeholder="Email *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <Input
                        placeholder="Country *"
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`h-12 ${errors.country ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.country && (
                        <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                    )}
                </div>
                <Input
                    placeholder="Company Name (Optional)"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="h-12"
                />
            </div>

            {/* Project Type */}
            <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">Project Type *</p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => handleInputChange('projectType', 'new')}
                        className={`p-4 text-sm font-medium border rounded-lg transition-colors
                            ${errors.projectType ? 'border-red-500' : 'border-border'}
                            ${formData.projectType === "new" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-background hover:bg-accent"
                            }`}
                    >
                        New Website
                    </button>
                    <button
                        type="button"
                        onClick={() => handleInputChange('projectType', 'redesign')}
                        className={`p-4 text-sm font-medium border rounded-lg transition-colors
                            ${errors.projectType ? 'border-red-500' : 'border-border'}
                            ${formData.projectType === "redesign" 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-background hover:bg-accent"
                            }`}
                    >
                        Redesign Existing Site
                    </button>
                </div>
                {errors.projectType && (
                    <p className="text-red-500 text-sm">{errors.projectType}</p>
                )}
            </div>

            {/* Project Description */}
            <div className="space-y-4">
                <div>
                    <Textarea
                        placeholder="Describe your project idea in a few sentences... *"
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        className={`min-h-[120px] ${errors.projectDescription ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.projectDescription && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
                    )}
                </div>
            </div>

            {/* Budget */}
            <div>
                <Input
                    placeholder="Budget Range in USD (Optional)"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="h-12"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 rounded-lg font-medium flex items-center justify-center gap-2
                    ${isSubmitting 
                        ? "bg-primary/80 cursor-not-allowed" 
                        : "bg-primary hover:bg-primary/90"
                    } text-primary-foreground`}
            >
                {isSubmitting ? (
                    <>
                        Sending
                        <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                ) : (
                    "Send Message"
                )}
            </button>
        </form>
    )
} 