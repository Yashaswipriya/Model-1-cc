"use client";
import { CircleArrowRightIcon, CircleArrowLeftIcon, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, easeOut } from "framer-motion";
import Image from "next/image";

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
    images: ["/results/project1-1.png", "/results/project1-2.png", "/results/project1-3.png"],
    link: "https://www.computerchacha.in/",
  },
  {
    logo: "/logo.svg",
    percentage: "120%",
    text: "increase in conversions after redesign.",
    images: ["/img4.jpg", "/img5.jpg", "/img6.jpg"],
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
  const current = results[index];

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

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 1.0, ease: easeOut },
    }),
  };

    const renderLetters = (text: string, offset = 0) =>
        text.split("").map((char, i) => (
        <motion.span
            key={i}
            style={{ display: "inline-block" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: headingOpacity, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
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
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl 2xl:text-[10rem] font-bold tracking-tight text-white leading-[1.05]"
        >
        <div className="text-left ml-[4rem]">{renderLetters("Our")}</div>
        <div className="text-left mt-2 ml-[10rem]">{renderLetters("Results", 3)}</div>
        </motion.h2>
      </div>

      {/* Card Stack */}
<div className="w-full flex items-center justify-center max-w-[1600px] ">
  <AnimatePresence mode="wait">
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="relative w-full w-[40rem] h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] 3xl:h-[90vh] 4xl:h-[90vh] bg-black rounded-tr-[10rem] rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-[2rem] flex flex-col md:flex-row px-8 md:px-16 py-8 md:py-12 shadow-2xl border border-white/40"
    >
      {/* Left Side */}
      <div className="flex flex-col justify-between w-full md:w-1/2 pr-0 md:pr-10 mb-8 md:mb-0">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <Image src={current.logo} alt="logo" width={120} height={60} />
        </div>

        {/* Percentage */}
        <h3 className="text-[9rem] font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 md:mb-1">
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
        <div className="flex items-center gap-6 w-full h-full">
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

      {/* Navigation */}
      <div className="absolute bottom-6 right-8 flex gap-[2rem]">
        <button
          onClick={nextCard}
          className=""
        >
          <CircleArrowLeftIcon size={30}/>
        </button>
        <button
          onClick={prevCard}
          className=""
        >
          <CircleArrowRightIcon size={30}/>
        </button>
      </div>
    </motion.div>
  </AnimatePresence>
</div>

    </section>
  );
}
