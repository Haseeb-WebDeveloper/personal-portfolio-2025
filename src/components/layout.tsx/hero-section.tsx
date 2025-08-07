import HomeVideo from "../ui/video";
import "@/style/glow.css";
import About2 from "./about-2";


export default function HeroSection() {
    return (
        <>
            {/* hero section */}
            < div className="max-w-[85vw] w-full mx-auto absolute z-[10] top-[40vw] md:top-[18vw] left-1/2 -translate-x-1/2" >
                <h3 id="text" className="md:max-w-[80vw] w-full mx-auto font-bold leading-[120%] text-[12vw] md:text-[5.5vw] lg:text-[6vw] tracking-tight text-center lg:leading-[130%]">
                    helping business build <span className='text-primary'>websites</span> that works
                </h3>
            </div >
            < div className="mt-0 md:mt-[18vw] mb-[12vw] h-[90vh] lg:h-[100vh] md:h-[42vw] w-full relative overflow-hidden" >
                <div className="wrapper absolute top-0 left-0 w-full h-full">
                    <div className="gradient gradient-1"></div>
                    <div className="gradient gradient-2"></div>
                    <div className="gradient gradient-3"></div>
                    <div className="gradient gradient-4"></div>
                    <div className="gradient gradient-5"></div>
                    <div className="gradient gradient-6"></div>
                </div>
            </div >
            < HomeVideo />
            <div className="mt-[22vw]">
                <About2 />
            </div>
        </>
    )
}
