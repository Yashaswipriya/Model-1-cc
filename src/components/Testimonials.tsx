"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleArrowLeftIcon, CircleArrowRightIcon } from "lucide-react";

interface ClientCard {
  name: string;
  role: string;
  testimonial: string;
  bgColor: string;
}

const clients: ClientCard[] = [
  {
    name: "Alice Johnson",
    role: "CEO, StartupX",
    testimonial: "Illuminora helped us transform our brand identity with unmatched creativity.",
    bgColor: "bg-pink-200",
  },
  {
    name: "Bob Smith",
    role: "CTO, InnovateLabs",
    testimonial: "The team delivered an amazing website experience. Highly recommended!",
    bgColor: "bg-blue-200",
  },
  {
    name: "Carol Lee",
    role: "Founder, NextGen",
    testimonial: "Smooth collaboration and impressive results every single time.",
    bgColor: "bg-yellow-200",
  },
  {
    name: "David Kim",
    role: "Marketing Lead, BrightCorp",
    testimonial: "Professional, creative, and punctual. The results speak for themselves.",
    bgColor: "bg-green-200",
  },
];

export default function OurClientsSay() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % clients.length);
  const prev = () => setIndex((prev) => (prev - 1 + clients.length) % clients.length);

  // Returns the transform for each card to achieve the left-peek stack
  const getCardStyle = (i: number) => {
    const diff = (i - index + clients.length) % clients.length;
    if (diff === 0) return { x: 0, scale: 1, zIndex: 10, opacity: 1 };
    if (diff === 1) return { x: -30, scale: 0.95, zIndex: 9, opacity: 1 };
    if (diff === 2) return { x: -60, scale: 0.9, zIndex: 8, opacity: 1 };
    return { x: -89, scale: 0.85, zIndex: 7, opacity: 1 };
  };

  return (
    <section className="relative w-full bg-black text-white py-24 px-6 md:px-16 lg:px-24 min-h-[100vh]">
      <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-center 
    gap-[8rem] lg:gap-[20rem] 2xl:gap-[30rem] 3xl:gap-[0rem] 
    max-w-none 3xl:max-w-[2400px]">
        {/* Left Side Heading */}
       
         <h2 className="text-6xl md:text-7xl font-bold text-left leading-tight">
  <div className="ml-0">What</div>
  <div className="ml-8 md:ml-12 lg:ml-30 2xl:ml-20">Our</div>
  <div className="ml-16 md:ml-24 lg:ml-40 2xl:ml-40">Clients</div>
  <div className="ml-30 md:ml-40 lg:ml-80 2xl:ml-80">Say</div>
</h2>


        {/* Right Side Cards */}
        <div className="w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 3xl:w-[400px] relative flex items-center justify-center min-h-[400px] 2xl:min-h-[600px] 3xl:min-h-[1200px]">
          {clients.map((client, i) => {
            const style = getCardStyle(i);
            return (
              <motion.div
                key={i}
                animate={{ x: style.x, scale: style.scale, opacity: style.opacity }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: style.zIndex }}
                className={`absolute 
                    w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem] 3xl:w-[32rem] 
                    aspect-[9/16] rounded-tr-[6rem] p-6 flex flex-col justify-between 
                    ${client.bgColor}`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-5xl text-black">{client.name}</h4>
                    <p className="text-xl text-gray-700">{client.role}</p>
                    <p className="text-gray-900 text-2xl mt-4">{client.testimonial}</p>
                  </div>
                </div>
                {/* Navigation */}
                    <div className="absolute bottom-0 right-0 flex gap-4 mt-6 z-20">
                        <button onClick={prev} className="invert fill p-3 rounded-full">
                        <CircleArrowLeftIcon size={28} />
                        </button>
                        <button onClick={next} className="invert fill p-3 rounded-full">
                        <CircleArrowRightIcon size={28} />
                        </button>
                    </div> 
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
