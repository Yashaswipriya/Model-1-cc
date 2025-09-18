"use client";
import Image from "next/image";
import { useState } from "react";

const logos = [
  { src: "/logos/Adventure.png", name: "Adventure" },
  { src: "/logos/cc.png", name: "ComputerChacha" },
  { src: "/logos/deutschvibes.png", name: "Duetschvibes" },
  { src: "/logos/enjoy.png", name: "EnjoyYourFeed" },
  { src: "/logos/gopal.png", name: "GopalEstate" },
  { src: "/logos/minty-read.png", name: "MintyRead" },
  { src: "/logos/newztrail.png", name: "NewzTrail" },
  { src: "/logos/nykaa.png", name: "Nykaa" },
  { src: "/logos/thebrandrumours.png", name: "The Brand Rumours" },
  { src: "/logos/TheUrbanRead.png", name: "TheUrbanRead" },
  { src: "/logos/urbantrnd.png", name: "TheUrbanTrend" },
  { src: "/logos/WhynoTravel.png", name: "WhyNoTravel" },
];

export default function Partners() {
  const [paused, setPaused] = useState(false);
  const text = "Bright\nConnections";

  return (
    <section className="bg-black py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto text-left mb-[10rem] lg:mb-[12rem] 2xl:mb-[15rem]">
        <h2 className="text-white font-bold text-[6rem] md:text-[10rem] leading-[1.1] mb-[8rem] whitespace-pre-line">
          {text}
        </h2>

        {/* wrapper captures hover/touch and toggles pause */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* duplicated list for seamless loop */}
          <div
            className="flex gap-20 animate-marquee"
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {[...logos, ...logos].map(({ src, name }, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex justify-center items-center w-45 h-24 md:w-60 md:h-30 lg:w-72 lg:h-36 2xl:w-80 2xl:h-40 3xl:w-96 3xl:h-48 relative"
              >
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 16rem, (max-width: 1024px) 16rem, 16rem"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
