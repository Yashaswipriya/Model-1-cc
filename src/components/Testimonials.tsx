"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface ClientCard {
  name: string;
  role: string;
  testimonial: string;
  bgColor: string;
  logo: string;
}

const clients: ClientCard[] = [
  {
    name: "Shubham Singh",
    role: " Founder, GopalEstate",
    testimonial: "Illuminora has been a game-changer for GopalEstate. Their content strategy and social media management helped us stand out in a crowded real estate market. The team's creativity and consistency not only grew our audience but also built genuine trust with our clients.",
    bgColor: "bg-pink-200",
    logo:"/logos/gopal.png"
  },
  {
    name: "Nitya",
    role: " Beauty Influencer, @nitya.vibes",
    testimonial: "Working with Illuminora has been amazing! They truly understood my vibe and helped me create content that felt authentic while still reaching a wider audience. From motion edits to strategy, they made my brand presence stronger and more consistent.",
    bgColor: "bg-blue-200",
    logo:"/logos/nykaa.png"
  },
  {
    name: "Divyank Atwal",
    role: "Founder, ComputerChacha",
    testimonial: "Illuminora played a vital role in shaping ComputerChacha's digital journey. From building our website to managing social media, paid ads, and overall digital marketing, they helped us grow from a simple idea into a recognized custom PC brand. Their strategies were clear, creative, and always result-driven.",
    bgColor: "bg-yellow-200",
    logo:"/logos/cc.png"
  },
  {
    name: "Deepshikha Sharma",
    role: "Marketing Head, WhyNoTravel",
    testimonial: "Illuminora has been a true partner in our growth. From content creation to paid ads and brand strategy, their team brought fresh ideas that aligned perfectly with our vision at WhyNoTravel. The consistency, creativity, and attention to detail helped us connect better with our audience and elevate our brand presence.",
    bgColor: "bg-green-200",
    logo:"/logos/WhynoTravel.png"
  },
];

export default function OurClientsSay() {
  const [index, setIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % clients.length);
  const prev = () => setIndex((prev) => (prev - 1 + clients.length) % clients.length);

  const getCardStyle = (i: number) => {
    const diff = (i - index + clients.length) % clients.length;
    
    if (screenWidth < 768) {
      if (diff === 0) return { x: 0, scale: 1, zIndex: 10, opacity: 1 };
      if (diff === 1) return { x: -15, scale: 0.98, zIndex: 9, opacity: 1 };
      if (diff === 2) return { x: -30, scale: 0.96, zIndex: 8, opacity: 1 };
      return { x: -45, scale: 0.94, zIndex: 7, opacity: 1 };
    }
    
    if (diff === 0) return { x: 0, scale: 1, zIndex: 10, opacity: 1 };
    if (diff === 1) return { x: -30, scale: 0.95, zIndex: 9, opacity: 1 };
    if (diff === 2) return { x: -60, scale: 0.9, zIndex: 8, opacity: 1 };
    return { x: -89, scale: 0.85, zIndex: 7, opacity: 1 };
  };

  return (
    <section className="relative w-full bg-black text-white px-4 sm:px-6 md:px-16 lg:px-24 min-h-[100vh]">
      <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-center 
        gap-[4rem] sm:gap-[6rem] md:gap-[8rem] lg:gap-[20rem] 2xl:gap-[30rem] 3xl:gap-[0rem] 
        max-w-none 3xl:max-w-[2400px]">
        
        <h2 className="text-[clamp(3rem,8vw,6rem)] md:text-7xl font-bold text-left leading-tight">
          <div className="ml-0">What</div>
          <div className="ml-4 sm:ml-6 md:ml-12 lg:ml-30 2xl:ml-20">Our</div>
          <div className="ml-8 sm:ml-12 md:ml-24 lg:ml-40 2xl:ml-40">Clients</div>
          <div className="ml-16 sm:ml-20 md:ml-40 lg:ml-80 2xl:ml-80">Say</div>
        </h2>

        <div className="w-72 sm:w-80 md:w-72 lg:w-80 xl:w-96 3xl:w-[400px] relative flex items-center justify-center min-h-[450px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[700px] 2xl:min-h-[750px] 3xl:min-h-[800px]">
          {clients.map((client, i) => {
            const style = getCardStyle(i);
            return (
              <motion.div
                key={i}
                animate={{ x: style.x, scale: style.scale, opacity: style.opacity }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ zIndex: style.zIndex }}
                className={`absolute 
                    w-72 sm:w-80 md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem] 3xl:w-[32rem] 
                    h-[450px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] 2xl:h-[750px] 3xl:h-[800px]
                    rounded-tr-[3rem] sm:rounded-tr-[4rem] md:rounded-tr-[6rem] p-4 sm:p-5 md:p-6 flex flex-col justify-between
                    ${client.bgColor}`}
              >
                <div className="flex-1 flex flex-col justify-start space-y-3 sm:space-y-4">
                  <div className="flex-shrink-0">
                    <h4 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black leading-tight">{client.name}</h4>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mt-1">{client.role}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                      {client.testimonial}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex gap-2 sm:gap-3 z-20">
                  <button onClick={prev} className="invert fill p-1.5 sm:p-2 rounded-full hover:bg-black/10 transition-colors">
                    <ArrowLeft size={screenWidth < 640 ? 20 : 24} />
                  </button>
                  <button onClick={next} className="invert fill p-1.5 sm:p-2 rounded-full hover:bg-black/10 transition-colors">
                    <ArrowRight size={screenWidth < 640 ? 20 : 24} />
                  </button>
                </div> 
                <div className="absolute bottom-8 sm:bottom-10 left-3 sm:left-4">
                  <Image src={client.logo} alt={`${client.name} Logo`} width={screenWidth < 640 ? 90 : 110} height={screenWidth < 640 ? 32 : 40} className="object-contain" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}