import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { projectType, industry, projectIdea, projectDescription, budget } = body

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

        // Create email content
        const emailContent = `
            New Project Inquiry
            
            Project Type: ${projectType}
            Industry: ${industry}
            Has Project Idea: ${projectIdea}
            Project Description: ${projectDescription || 'Not provided'}
            Budget Range: ${budget || 'Not specified'}
        `

        // Send email
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'New Project Inquiry',
            text: emailContent,
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