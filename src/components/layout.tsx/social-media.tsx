import { GithubIcon, InstagramIcon, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function SocialMediaIcon() {

    const Upwork = "https://www.upwork.com/freelancers/~01b8c927b6fa311757"
    const Instagram = "https://www.instagram.com/haseeb.ahmed.raza.khan/"
    const Github = "https://github.com/Haseeb-WebDeveloper/"
    const LinkedinIn = "https://pk.linkedin.com/in/haseeb-ahmed-raza-khan"
    const Whatsapp = "https://wa.me/923001234567"

    const socialMedia = [
        {
            name: "Linkedin",
            url: LinkedinIn,
            icon: "/icon/linkedin.svg"
        },
        {
            name: "Github",
            url: Github,
            icon: "/icon/github.svg"
        },
        {
            name: "Upwork",
            url: Upwork,
            icon: "/icon/upwork.svg"
        },
        {
            name: "Instagram",
            url: Instagram,
            icon: "/icon/instagram.svg"
        },
        {
            name: "Whatsapp",
            url: Whatsapp,
            icon: "/icon/whatsapp.svg"
        },
    ]


    return (
        <div className=''>
            <div className=' inline-flex gap-3 '>
                {socialMedia.map((item, index) => (
                    <Link href={item.url} className='p-[1vw] flex justify-center items-center border border-foreground/70 rounded-full transition ease-linear ' aria-label={`Haseeb Ahmed ${item.name} profile`} rel="noopener noreferrer" key={index}>
                        <Image src={item.icon} alt={item.name} width={20} height={20} className='w-[1.5vw] h-[1.5vw]' />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SocialMediaIcon
