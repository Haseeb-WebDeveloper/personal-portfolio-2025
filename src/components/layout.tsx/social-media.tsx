import { GithubIcon, InstagramIcon, Linkedin } from 'lucide-react'
import Link from 'next/link'

function SocialMediaIcon() {

    const Upwork = "https://www.upwork.com/freelancers/~01b8c927b6fa311757"
    const Instagram = "https://www.instagram.com/haseeb.ahmed.raza.khan/"
    const Github = "https://github.com/Haseeb-WebDeveloper/"
    const LinkedinIn = "https://pk.linkedin.com/in/haseeb-ahmed-raza-khan"


    return (
        <div className=''>
            <div className=' inline-flex gap-3 '>
                <Link href={LinkedinIn} className='text-background  p-3 rounded-full bg-foreground/30 hover:bg-foreground/5 transition ease-linear ' aria-label="Haseeb Ahmed LinkedIn profile" rel="noopener noreferrer">
                    <Linkedin size={20} aria-hidden="true" />
                </Link>
                <Link href={Github} className='text-background  p-3 rounded-full bg-foreground/30 hover:bg-foreground/5 transition ease-linear ' aria-label="Haseeb Ahmed GitHub profile" rel="noopener noreferrer">
                    <GithubIcon size={20} aria-hidden="true" />
                </Link>
                {/* <Link href={Upwork} className='text-background  p-3 rounded-full bg-foreground/30 hover:bg-foreground/5 transition ease-linear ' aria-label="Haseeb Ahmed Upwork profile" rel="noopener noreferrer">
                    <Upwork size={20} aria-hidden="true" />
                </Link> */}
                <Link href={Instagram} className='text-background  p-3 rounded-full bg-foreground/30 hover:bg-foreground/5 transition ease-linear ' aria-label="Haseeb Ahmed Instagram profile" rel="noopener noreferrer">
                    <InstagramIcon size={20} aria-hidden="true" />
                </Link>
            </div>
        </div>
    )
}

export default SocialMediaIcon
