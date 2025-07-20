"use client";

import Image from "next/image";

import { getAssetPath } from "@/lib/getAssetsPath";
import { PersonalInfo } from "@/types/Settings";

function About({ about }: { about: PersonalInfo }) {
  return (
    <section
      id="about"
      className="flex flex-wrap items-center justify-center min-h-100 bg-grey gap-10 p-10"
    >
      <div>
        <Image
          className="rounded-full border-4 border-green-800"
          src={getAssetPath("/coach.png")}
          width={300}
          height={300}
          alt="Financial Coach"
        />
      </div>
      <div className="flex flex-col gap-4 max-w-2xl">
        <h2 className="font-bold text-4xl text-green-800 text-center lg:text-left">
          {`Про ${about.first_name} ${about.last_name}`}
        </h2>
        <p className="text-center lg:text-left">{about.about_me}</p>
      </div>
    </section>
  );
}

export default About;
