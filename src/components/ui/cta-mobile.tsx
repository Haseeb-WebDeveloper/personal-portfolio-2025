"use client";

import { useState } from "react";
import Form from "./form";
import Link from "next/link";
import Image from "next/image";

export default function CTAMobile() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <>
      <div className="space-y-[4vw] lg:space-y-[2vw] uppercase font-semibold flex flex-col items-center">
        <h3 className="w-full text-center text-[14vw] md:text-[10vw] lg:text-[8vw] tracking-tighter leading-[120%]">
          Not just <br /> websites
        </h3>
        <button
          onClick={handleFormOpen}
          className="border-b-[0.3vw] border-primary cursor-pointer"
        >
          <div className="flex justify-center items-center lg:gap-[1.2vw] gap-[2.5vw]">
            <Image
              src="/icon/corner-down-right-primary.svg"
              alt="corner-down-right"
              width={100}
              height={100}
              className="lg:w-[5vw] lg:h-[5vw] w-[10vw] h-[10vw] object-cover"
            />
            <p className="text-primary text-[10vw] md:text-[8vw] lg:text-[6vw] tracking-tighter leading-[120%]">
              build brand
            </p>
          </div>
        </button>
      </div>

      {isFormOpen && <Form handleFormOpen={handleFormOpen} />}
    </>
  );
}
