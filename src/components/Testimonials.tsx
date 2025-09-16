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
    testimonial: "Kota helped us transform our brand identity with unmatched creativity.",
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
    return { x: -90, scale: 0.85, zIndex: 7, opacity: 1 };
  };

  return (
    <section className="relative w-full bg-black text-white py-24 px-6 md:px-16 lg:px-24 min-h-[100vh]">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left Side Heading */}
        <div className="md:w-1/3 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Our Clients Say
          </h2>
          <p className="text-gray-300 text-lg md:text-xl">
            We love working with our clients and they love what we create.
          </p>
        </div>

        {/* Right Side Cards */}
        <div className="md:w-2/3 relative flex items-center justify-center min-h-[400px]">
          {clients.map((client, i) => {
            const style = getCardStyle(i);
            return (
              <motion.div
                key={i}
                animate={{ x: style.x, scale: style.scale, opacity: style.opacity }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: style.zIndex }}
                className={`absolute w-64 md:w-72 lg:w-80 aspect-[9/16] rounded-2xl p-6 flex flex-col justify-between ${client.bgColor}`}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-lg text-black">{client.name}</h4>
                    <p className="text-sm text-gray-700">{client.role}</p>
                    <p className="text-gray-900 text-base mt-4">{client.testimonial}</p>
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
