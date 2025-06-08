"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import Stepper, { Step } from "@/components/ui/stepper"
import SocialMediaIcon from "../layout.tsx/social-media"

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

export default function Form({ handleFormOpen }: { handleFormOpen: () => void }) {
    const [currentStep, setCurrentStep] = useState(1)
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

    const validateCurrentStep = (stepNumber: number): boolean => {
        let stepErrors: Partial<FormErrors> = {}
        let isValid = true

        switch (stepNumber) {
            case 1:
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

            case 2:
                const projectTypeError = validateField('projectType', formData.projectType)
                if (projectTypeError) {
                    stepErrors.projectType = projectTypeError
                    isValid = false
                }
                break

            case 3:
                const descriptionError = validateField('projectDescription', formData.projectDescription)
                if (descriptionError) {
                    stepErrors.projectDescription = descriptionError
                    isValid = false
                }
                break

            case 4:
                break
        }

        setErrors(prev => ({ ...prev, ...stepErrors }))
        return isValid
    }

    const isCurrentStepValid = (stepNumber: number): boolean => {
        switch (stepNumber) {
            case 1:
                return !validateField('fullName', formData.fullName) &&
                    !validateField('email', formData.email) &&
                    !validateField('country', formData.country)
            case 2:
                return !validateField('projectType', formData.projectType)
            case 3:
                return !validateField('projectDescription', formData.projectDescription)
            case 4:
                return true
            default:
                return false
        }
    }

    const isAllRequiredFieldsValid = (): boolean => {
        return !validateField('fullName', formData.fullName) &&
            !validateField('email', formData.email) &&
            !validateField('country', formData.country) &&
            !validateField('projectType', formData.projectType) &&
            !validateField('projectDescription', formData.projectDescription)
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: "" }))
        }
    }

    const handleStepChange = (step: number): boolean => {
        if (step > currentStep) {
            const isValid = validateCurrentStep(currentStep)
            if (!isValid) {
                return false
            }
        }
        setCurrentStep(step)
        return true
    }

    const handleSubmit = async () => {
        if (!validateCurrentStep(4)) return

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
                // setTimeout(() => {
                //     setCurrentStep(1)
                //     setFormData({
                //         fullName: "",
                //         country: "",
                //         companyName: "",
                //         email: "",
                //         projectType: "",
                //         projectDescription: "",
                //         budget: ""
                //     })
                //     setErrors({
                //         fullName: "",
                //         country: "",
                //         email: "",
                //         projectType: "",
                //         projectDescription: ""
                //     })
                //     setIsSuccess(false)
                // }, 3000)
            }
        } catch (error) {
            console.error('Error sending email:', error)
        }
        setIsSubmitting(false)
    }

    return (
        <div className="fixed inset-0 z-50 bg-background">
            <div className="max-w-full w-screen h-screen flex flex-col bg-background p-0 gap-0 border-0">
                <button
                    onClick={handleFormOpen}
                    className="cursor-pointer absolute right-[1vw] top-[1vw] p-2 hover:bg-accent rounded-full z-50"
                >
                    <X className="xl:h-[3vw] xl:w-[3vw] lg:h-[2vw] lg:w-[2vw] md:h-[3vw] md:w-[3vw] h-[6vw] w-[6vw]" />
                </button>

                <div className="flex flex-col items-center justify-center w-full h-full">
                    {isSuccess ? (
                        <div className="text-center space-y-[3vw]">
                            <div className="text-center space-y-[2vw]">
                                <h3 className="text-[5vw] md:text-[4vw] lg:text-[3vw] font-bold">Thank You! 🧑🏻‍💻</h3>
                                <p className="text-[2vw] md:max-w-[45vw]">
                                    Your message has been sent <span className="font-bold px-[0.5vw] bg-primary/5 text-primary tracking-wide">successfully</span>.<br /> I will get back to you soon.
                                </p>
                            </div>
                            <div>
                                <SocialMediaIcon />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mx-auto">
                            <Stepper
                                onFinalStepCompleted={handleSubmit}
                                onStepChange={handleStepChange}
                                canSubmit={isAllRequiredFieldsValid() && !isSubmitting}
                                nextButtonProps={{
                                    className: `cursor-pointer px-8 py-2 rounded-[1vw] ${isCurrentStepValid(currentStep) && !isSubmitting
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-foreground/10 cursor-not-allowed"
                                        }`
                                }}
                            >
                                <Step>
                                    <div className="md:space-y-[3vw] space-y-[10vw] w-full">
                                        <h3 className="text-[5vw] md:text-[4vw] lg:text-[1.5vw] leading-[110%] font-bold">Let's get to know you</h3>
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
                                    <div className="md:space-y-[3vw] space-y-[10vw] w-full">
                                        <h3 className="text-[5vw] md:text-[4vw] lg:text-[1.5vw] leading-[110%] font-bold">What type of project do you need?</h3>
                                        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[1.2vw] gap-[4vw]">
                                            <div>
                                                <button
                                                    onClick={() => handleInputChange('projectType', 'new')}
                                                    className={`w-full h-full cursor-pointer p-[8vw] lg:p-[2.5vw] lg:text-[1.3vw] md:text-[2vw] text-[4vw] font-semibold border border-border rounded-[1.5vw]
                                                     ${errors.projectType ? 'border-red-500' : ''}
                                                     ${formData.projectType === "new" ? "bg-secondary text-secondary-foreground" : "bg-background text-foreground"}
                                                     `}
                                                >
                                                    New Website
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => handleInputChange('projectType', 'redesign')}
                                                    className={`w-full h-full cursor-pointer  p-[8vw] lg:p-[2.5vw] lg:text-[1.3vw] md:text-[2vw] text-[4vw] font-semibold border border-border rounded-[1.5vw]
                                                     ${errors.projectType ? 'border-red-500' : ''}
                                                     ${formData.projectType === "redesign" ? "bg-secondary text-secondary-foreground" : "bg-background text-foreground"}
                                                     `}
                                                >
                                                    Redesign Existing Site
                                                </button>
                                            </div>
                                        </div>
                                        {errors.projectType && (
                                            <p className="text-red-500 text-sm text-center">{errors.projectType}</p>
                                        )}
                                    </div>
                                </Step>

                                {/* Step 3: Project Description */}
                                <Step>
                                    <div className="md:space-y-[3vw] space-y-[10vw] w-full">
                                        <h3 className="text-[5vw] md:text-[4vw] lg:text-[1.5vw] leading-[110%] font-bold">Whats in your mind about your project.</h3>
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

                                {/* Step 4: Budget */}
                                <Step>
                                    <div className="md:space-y-[3vw] space-y-[10vw] w-full">
                                        <h3 className="text-[5vw] md:text-[4vw] lg:text-[1.5vw] leading-[110%] font-bold">What's your budget? (Optional)</h3>
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
        </div>
    )
}