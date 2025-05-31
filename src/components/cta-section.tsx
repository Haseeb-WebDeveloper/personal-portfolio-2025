"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "./ui/dialog"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { X } from "lucide-react"
import Stepper, { Step } from "./ui/stepper"
import Image from "next/image"

interface FormData {
    fullName: string
    country: string
    companyName: string
    email: string
    projectType: string
    industry: string
    projectDescription: string
    budget: string
}

interface FormErrors {
    fullName: string
    country: string
    email: string
    projectType: string
    industry: string
    projectDescription: string
}

export default function CTASection() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        country: "",
        companyName: "",
        email: "",
        projectType: "",
        industry: "",
        projectDescription: "",
        budget: ""
    })
    const [errors, setErrors] = useState<FormErrors>({
        fullName: "",
        country: "",
        email: "",
        projectType: "",
        industry: "",
        projectDescription: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate individual field
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
            case 'industry':
                if (!value) return "Please select your industry"
                return ""
            case 'projectDescription':
                if (!value.trim()) return "Project description is required"
                if (value.trim().length < 10) return "Please provide more details (at least 10 characters)"
                return ""
            default:
                return ""
        }
    }

    // Validate current step
    const validateCurrentStep = (stepNumber: number): boolean => {
        let stepErrors: Partial<FormErrors> = {}
        let isValid = true

        switch (stepNumber) {
            case 1: // Contact Information
                const fullNameError = validateField('fullName', formData.fullName)
                const emailError = validateField('email', formData.email)
                const countryError = validateField('country', formData.country)

                if (fullNameError) {
                    stepErrors.fullName = fullNameError
                    isValid = false
                }
                if (emailError) {
                    stepErrors.email = emailError
                    isValid = false
                }
                if (countryError) {
                    stepErrors.country = countryError
                    isValid = false
                }
                break

            case 2: // Project Type
                const projectTypeError = validateField('projectType', formData.projectType)
                if (projectTypeError) {
                    stepErrors.projectType = projectTypeError
                    isValid = false
                }
                break

            case 3: // Industry
                const industryError = validateField('industry', formData.industry)
                if (industryError) {
                    stepErrors.industry = industryError
                    isValid = false
                }
                break

            case 4: // Project Description
                const descriptionError = validateField('projectDescription', formData.projectDescription)
                if (descriptionError) {
                    stepErrors.projectDescription = descriptionError
                    isValid = false
                }
                break

            case 5: // Budget (optional, no validation needed)
                break
        }

        setErrors(prev => ({ ...prev, ...stepErrors }))
        return isValid
    }

    // Clear error when user starts typing
    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: "" }))
        }
    }

    // Handle step change with validation
    const handleStepChange = (step: number): boolean => {
        setCurrentStep(step)
        // Validate previous step when moving forward
        if (step > currentStep) {
            return validateCurrentStep(currentStep)
        }
        return true
    }

    const handleSubmit = async () => {
        // Final validation before submit
        if (!validateCurrentStep(5)) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setIsSuccess(true)
                setTimeout(() => {
                    setIsFormOpen(false)
                    setCurrentStep(1)
                    setFormData({
                        fullName: "",
                        country: "",
                        companyName: "",
                        email: "",
                        projectType: "",
                        industry: "",
                        projectDescription: "",
                        budget: ""
                    })
                    setErrors({
                        fullName: "",
                        country: "",
                        email: "",
                        projectType: "",
                        industry: "",
                        projectDescription: ""
                    })
                    setIsSuccess(false)
                }, 3000)
            }
        } catch (error) {
            console.error('Error sending email:', error)
        }
        setIsSubmitting(false)
    }

    return (
        <section className="w-full py-[12vw] flex flex-col items-center justify-center">
            <div className="bg-secondary md:max-w-[70vw] w-full py-[5vw] rounded-[2vw] text-center flex flex-col justify-center items-center gap-[3vw] mx-auto">
                <h2 className="max-w-[40vw] text-[2.5vw] md:text-[3vw] lg:text-[3.5vw] leading-[120%] font-bold">Ready to Build Something Amazing?</h2>
                <Button onClick={() => setIsFormOpen(true)} className="cursor-pointer w-fit flex items-center justify-center gap-[0.5vw] text-[1.4vw] font-medium px-[1vw] py-[1.9vw] border border-foreground/20 rounded-full leading-none">
                    Start Your Project
                    <Image src="/icon/plus.svg" alt="plus" width={40} height={40} className="w-[1.6vw] h-[1.6vw]" />
                </Button>
            </div>

            {isFormOpen && <div className="fixed inset-0 z-50 bg-background">
                <div className="max-w-full w-screen h-screen flex flex-col bg-background p-0 gap-0 border-0">
                    <button
                        onClick={() => setIsFormOpen(false)}
                        className="absolute right-4 top-4 p-2 hover:bg-accent rounded-full z-50"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
                        {isSuccess ? (
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-bold">Thank You! 🎉</h3>
                                <p className="text-muted-foreground">We've received your message and will get back to you soon.</p>
                            </div>
                        ) : (
                            <div className="w-full max-w-3xl mx-auto px-4">
                                <Stepper
                                    onFinalStepCompleted={handleSubmit}
                                    onStepChange={handleStepChange}
                                    nextButtonProps={{
                                        className: "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-2 rounded-[1vw]",
                                        disabled: isSubmitting
                                    }}
                                    backButtonProps={{
                                        className: "cursor-pointer border border-input bg-background hover:bg-accent hover:text-accent-foreground px-8 py-2 rounded-[1vw]"
                                    }}
                                    nextButtonText={isSubmitting ? "Sending..." : "Continue"}
                                    contentClassName="min-h-[300px] flex items-center justify-center"
                                >
                                    {/* Step 1: Contact Information */}
                                    <Step>
                                        <div className="space-y-[3vw] w-full">
                                            <h3 className="text-2xl font-bold text-center">Let's get to know you</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <Input
                                                        placeholder="Full Name *"
                                                        value={formData.fullName}
                                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                                        className={`h-12 ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                                                        required
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
                                                        required
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
                                                        required
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
                                        </div>
                                    </Step>

                                    {/* Step 2: Project Type */}
                                    <Step>
                                        <div className="space-y-[3vw] w-full">
                                            <h3 className="text-2xl font-bold text-center">What type of project do you need?</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.5vw]">
                                                <Button
                                                    variant={formData.projectType === "new" ? "default" : "outline"}
                                                    onClick={() => handleInputChange('projectType', 'new')}
                                                    className={`h-[6vw] rounded-[1.5vw] ${errors.projectType ? 'border-red-500' : ''}`}
                                                >
                                                    New Website
                                                </Button>
                                                <Button
                                                    variant={formData.projectType === "redesign" ? "default" : "outline"}
                                                    onClick={() => handleInputChange('projectType', 'redesign')}
                                                    className={`h-[6vw] rounded-[1.5vw] ${errors.projectType ? 'border-red-500' : ''}`}
                                                >
                                                    Redesign Existing Site
                                                </Button>
                                            </div>
                                            {errors.projectType && (
                                                <p className="text-red-500 text-sm text-center">{errors.projectType}</p>
                                            )}
                                        </div>
                                    </Step>

                                    {/* Step 3: Industry */}
                                    <Step>
                                        <div className="space-y-[3vw] w-full">
                                            <h3 className="text-2xl font-bold text-center">What industry are you in?</h3>
                                            <div>
                                                <Select
                                                    value={formData.industry}
                                                    onValueChange={(value) => handleInputChange('industry', value)}
                                                >
                                                    <SelectTrigger className={`w-full ${errors.industry ? 'border-red-500' : ''}`}>
                                                        <SelectValue placeholder="Select your industry" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                                                        <SelectItem value="education">Education</SelectItem>
                                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                                        <SelectItem value="technology">Technology</SelectItem>
                                                        <SelectItem value="finance">Finance</SelectItem>
                                                        <SelectItem value="ai">AI</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.industry && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Step>

                                    {/* Step 4: Project Description */}
                                    <Step>
                                        <div className="space-y-[3vw] w-full">
                                            <h3 className="text-2xl font-bold text-center">Tell us about your project</h3>
                                            <div>
                                                <Textarea
                                                    placeholder="Describe your project idea in a few sentences..."
                                                    value={formData.projectDescription}
                                                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                                                    className={`h-32 ${errors.projectDescription ? 'border-red-500 focus:border-red-500' : ''}`}
                                                />
                                                {errors.projectDescription && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
                                                )}
                                            </div>
                                        </div>
                                    </Step>

                                    {/* Step 5: Budget */}
                                    <Step>
                                        <div className="space-y-[3vw] w-full">
                                            <h3 className="text-2xl font-bold text-center">What's your budget? (Optional)</h3>
                                            <Input
                                                placeholder="Enter your budget range in USD"
                                                value={formData.budget}
                                                onChange={(e) => handleInputChange('budget', e.target.value)}
                                                className="h-12"
                                            />
                                        </div>
                                    </Step>
                                </Stepper>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </section>
    )
}