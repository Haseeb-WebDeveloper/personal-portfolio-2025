import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { 
            fullName,
            email,
            country,
            companyName,
            projectType, 
            projectDescription, 
            budget 
        } = body

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_PASSWORD,
            },
        })

        // Create email content with all form data
        const emailContent = `
            New Project Inquiry
            
            Personal Information:
            -------------------
            Full Name: ${fullName}
            Email: ${email}
            Country: ${country}
            Company: ${companyName || 'Not provided'}
            
            Project Details:
            ---------------
            Project Type: ${projectType}
            Project Description: ${projectDescription}
            Budget Range: ${budget || 'Not specified'}
        `

        // Send email with HTML formatting for better readability
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: `New Project Inquiry from ${fullName}`,
            text: emailContent,
            html: emailContent.replace(/\n/g, '<br>')
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
} 