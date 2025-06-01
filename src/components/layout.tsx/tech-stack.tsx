import FallingText from "../ui/falling-text";

export default function TechStack() {
    return (
        <div className="py-[6vw]">
            <section className="section">
                <h1 className="text-[6vw] lg:text-[4vw] font-bold">Tech Stack 🔥</h1>
                <FallingText
                    text={`React Nextjs TypeScript NodeJS Express MongoDB Notion Discord Google Meet Figma Shadcn Gsap TailwindCSS Wordpress Framer OPENAI API`}
                    highlightWords={["Nextjs", "TypeScript", "Express", "MongoDB", "Notion", "Figma", "Wordpress", "Framer", "OPENAI", "API"]}
                    highlightClass="highlighted"
                    trigger="hover"
                    backgroundColor="transparent"
                    wireframes={false}
                    gravity={0.56}
                    fontSize="2rem"
                    mouseConstraintStiffness={0.9}
                />
            </section>
        </div>
    )
}