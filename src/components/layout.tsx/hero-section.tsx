import HomeVideo from "../ui/video";
import "@/style/glow.css";


export default function HeroSection() {
    return (
        <>
            {/* hero section */}
            < div className="w-full min-h-[100vh] md:min-h-auto h-full" >
                {/* text */}
                < div className=" max-w-[85vw] w-full mx-auto px-6 absolute z-[10] top-[35vw] md:top-[16vw] left-1/2 -translate-x-1/2" >
                    <h3 id="text" className="font-bold text-[6vw] md:text-[5.5vw] lg:text-[6vw] tracking-tight text-center leading-[130%]">
                        helping bussinesses build <span className='text-primary'>websites</span> that works
                    </h3>
                </div >
                {/* video */}
                < HomeVideo />
                {/*Desktop animated background */}
                < div className="mt-0 md:mt-[16vw] mb-[12vw] h-[100vh] md:h-[42vw] w-full relative overflow-hidden" >
                    <div className="wrapper absolute top-0 left-0 w-full h-full">
                        <div className="gradient gradient-1"></div>
                        <div className="gradient gradient-2"></div>
                        <div className="gradient gradient-3"></div>
                        <div className="gradient gradient-4"></div>
                        <div className="gradient gradient-5"></div>
                        <div className="gradient gradient-6"></div>
                    </div>
                </div >
            </div >
              
        </>
    )
}
