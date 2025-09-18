"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";  // ✅ import Image

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

// 👉 choose which ones you want inverted (by index in the array)
const invertedIndexes = [4, 10, 8]; // here: ComputerChacha & Nykaa

export default function Partners() {
  const [paused, setPaused] = useState(false);
  const text = "Bright\nConnections";

  return (
    <section className="bg-black py-20 pb-[20rem] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto text-left ">
          <h2 className="text-white font-bold text-[6rem] md:text-[10rem] leading-[1.1] mb-[8rem] whitespace-pre-line">
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
        </div>
      </div>

      {/* Full-width marquee container */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="inline-flex w-auto animate-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {[...logos, ...logos].map((logo, i) => {
            // detect original index before duplication
            const originalIndex = i % logos.length;
            const isInverted = invertedIndexes.includes(originalIndex);

            return (
              <div
                key={i}
                className="flex-shrink-0 flex justify-center items-center mr-20 w-45 h-24 
                           md:w-60 md:h-30 lg:w-72 lg:h-36 2xl:w-80 2xl:h-40 3xl:w-96 3xl:h-48 relative"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className={`object-contain ${isInverted ? "invert" : ""}`}
                  sizes="(max-width: 768px) 12rem, (max-width: 1024px) 16rem, 20rem"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
