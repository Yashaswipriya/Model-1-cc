"use client";
import { CircleArrowRightIcon, CircleArrowLeftIcon, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, easeOut } from "framer-motion";
import Image from "next/image";
import Aurora from "@/components/Aurora";

interface ResultCardProps {
  logo: string;
  percentage: string;
  text: string;
  images: string[];
  link: string;
}

const results: ResultCardProps[] = [
  {
    logo: "https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Logo-White.svg",
    percentage: "67.6%",
    text: "rise in engaged sessions per user after 1 month.",
    images: ["/results/1.png", "/results/2.png", "/results/3.png"],
    link: "https://www.computerchacha.in/",
  },
  {
    logo: "/logo.svg",
    percentage: "120%",
    text: "increase in conversions after redesign.",
    images: ["/results/4.png", "/results/5.png"],
    link: "#",
  },
  {
    logo: "/logo.svg",
    percentage: "180%",
    text: "increase in conversions after redesign.",
    images: ["/results/6.png", "/results/7.png"],
    link: "#",
  },
  {
    logo: "/logo.svg",
    percentage: "180%",
    text: "increase in conversions after redesign.",
    images: ["/results/8.png", "/results/9.png"],
    link: "#",
  },
  
];

export default function OurResults() {
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [headingOpacity, setHeadingOpacity] = useState(0);

  const nextCard = () => setIndex((prev) => (prev + 1) % results.length);
  const prevCard = () => setIndex((prev) => (prev - 1 + results.length) % results.length);

  // Animate heading letters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.3 }
    );
    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const renderLetters = (text: string, offset = 0) =>
    text.split("").map((char, i) => (
      <motion.span
        key={i}
        style={{ display: "inline-block" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: headingOpacity, y: 0 }}
        transition={{ delay: i * 0.01, duration: 0.4 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  useEffect(() => {
    const handleScroll = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate opacity based on distance from center of viewport
      const centerOffset = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
      const maxOffset = windowHeight / 2 + rect.height / 2;

      let opacity = 1 - centerOffset / maxOffset;
      opacity = Math.min(Math.max(opacity, 0), 1); // Clamp 0-1
      setHeadingOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initialize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const [screenWidth, setScreenWidth] = useState(1024); // safe default for SSR

useEffect(() => {
  const updateWidth = () => setScreenWidth(window.innerWidth);
  updateWidth(); // initial value
  window.addEventListener("resize", updateWidth);
  return () => window.removeEventListener("resize", updateWidth);
}, []);

// Updated getCardProps
const getCardProps = (cardIndex: number) => {
  const diff = (cardIndex - index + results.length) % results.length;

  switch (diff) {
    case 0:
      return { scale: 1, x: 0, opacity: 1, zIndex: 10 };
    case 1:
      return {
        scale: 0.9,
        x: screenWidth > 1800 ? -100 : -80,
        opacity: 0.7,
        zIndex: 9,
      };
    case 2:
      return {
        scale: 0.8,
        x: screenWidth > 1800 ? -200 : -160,
        opacity: 0.4,
        zIndex: 8,
      };
    default:
      return { scale: 0.7, x: -240, opacity: 0, zIndex: 7 };
  }
};

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start overflow-hidden py-10 px-4 md:px-12 lg:px-20 xl:px-32 2xl:px-48"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="mb-20 text-center w-full max-w-[1600px]"
      >
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="text-[10rem] font-bold tracking-tight text-white leading-[1.05]"
        >
          <div className="text-left ml-[4rem]">{renderLetters("Radiant")}</div>
          <div className="text-left mt-2 ml-[15rem]">{renderLetters("Results", 3)}</div>
        </motion.h2>
      </div>

      {/* Card Stack */}
      <div className="w-full max-w-[1600px] relative h-[90vh]">
        {results.map((current, cardIndex) => {
          const cardProps = getCardProps(cardIndex);
          
          return (
            <motion.div
              key={cardIndex}
              initial={false}
              animate={{
                scale: cardProps.scale,
                x: cardProps.x,
                opacity: cardProps.opacity,
              }}
              
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{ zIndex: cardProps.zIndex }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
             bg-black rounded-tr-[10rem] rounded-tl-[2rem] rounded-br-[2rem] 
             rounded-bl-[2rem] flex flex-col md:flex-row px-8 md:px-16 py-8 md:py-12 
             shadow-2xl border border-white/40 overflow-hidden"
            >
              {/* Aurora Background - Now scoped to the card */}
              <div className="absolute w-full inset-0 rounded-tr-[10rem] rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-[2rem] overflow-hidden">
                <Aurora
                  colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
                  blend={0.7}
                  amplitude={2.0}
                  speed={1.0}
                />
              </div>

              {/* Content Container - with relative positioning to appear above aurora */}
              <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
                {/* Left Side */}
                <div className="flex flex-col justify-between w-full md:w-1/2 pr-0 md:pr-10 mb-8 md:mb-0">
                  {/* Logo */}
                  <div className="mb-6 md:mb-8">
                    <Image src={current.logo} alt="logo" width={120} height={60} />
                  </div>

                  {/* Percentage */}
                  <h3 className="text-[9rem] font-extrabold bg-gradient-to-r from-pink-500 to-rose-700 bg-clip-text text-transparent mb-2 md:mb-1">
                    {current.percentage}
                  </h3>

                  {/* Text */}
                  <p className="text-[2rem] text-gray-300 max-w-md mb-6 md:mb-8">
                    {current.text}
                  </p>

                  {/* Button */}
                  <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex gap-2 border border-white/60 px-4 py-3 rounded-full hover:bg-white hover:text-black transition-colors w-fit"
                  >
                    View Project
                    <ArrowRight
                      className="ml-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      size={25}
                    />
                  </a>
                </div>

                {/* Right Side Images */}
                <div className="flex items-center gap-2 w-full h-full">
                  {/* Left Image */}
                  <div className="relative flex-1 aspect-[9/16] rounded-sm overflow-hidden">
                    <Image src={current.images[0]} alt="img1" fill className="object-cover" />
                  </div>

                  {/* Middle (Bigger) Image */}
                  <div className="relative flex-[1.4] aspect-[9/16] rounded-sm overflow-hidden">
                    <Image src={current.images[1]} alt="img2" fill className="object-cover" />
                  </div>

                  {/* Right Image */}
                  <div className="relative flex-1 aspect-[9/16] rounded-sm overflow-hidden">
                    <Image src={current.images[2]} alt="img3" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Navigation - Only show on current card */}
              {cardIndex === index && (
                <div className="absolute bottom-6 right-8 flex gap-[2rem] z-20">
                  <button onClick={nextCard}>
                    <CircleArrowLeftIcon size={30} />
                  </button>
                  <button onClick={prevCard}>
                    <CircleArrowRightIcon size={30} />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}