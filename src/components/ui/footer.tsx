"use client";

import Link from "next/link";
import SocialMediaIcon from "../layout.tsx/social-media";
import String from "./string";


export function Footer() {
  return (
    <>
      <String />
      <footer className="py-[4vw]">
        <div className="section flex justify-between md:items-center flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-[1vw] md:gap-[1.5vw]">
            <div>
              <p className="text-[1.5vw] font-normal ]">Connect</p>
            </div>
            <div>
              <Link href="mailto:web.dev.haseeb@gmail.com" className=" text-[3vw] tracking-tighter leading-none" aria-label="Email Haseeb Ahmed web developer">web.dev.haseeb@gmail.com</Link>
            </div>
          </div>
          <div className="flex flex-col gap-[1vw] md:gap-[1.5vw]">
            <div>
              <p className="text-[1.5vw] font-normal ]">Social</p>
            </div>
            <div>
              <SocialMediaIcon />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
