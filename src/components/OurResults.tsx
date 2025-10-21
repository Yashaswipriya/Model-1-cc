"use client";
import { CircleArrowRight, CircleArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Aurora from "@/components/Aurora";
import useIsMobile from "@/hooks/useIsMobile";

interface ResultCardProps {
  logo: string;
  percentage: string;
  text: string;
  images: string[];
  link: string;
}

const results: ResultCardProps[] = [
  {
    logo: "/logos/cc.png",
    percentage: "67.6%",
    text: "rise in engaged sessions per user after 1 month.",
    images: ["/results/3.png", "/results/2.png", "/results/1.png"],
    link: "https://www.computerchacha.in/",
  },
  {
    logo: "/logos/WhynoTravel.png",
    percentage: "120%",
    text: "increase in conversions after redesign.",
    images: ["/results/4.png", "/results/5.png", "/results/10.png"],
    link: "#",
  },
  {
    logo: "/logos/nykaa.png",
    percentage: "180%",
    text: "increase in conversions after redesign.",
    images: ["/results/6.png", "/results/7.png", "/results/11.png"],
    link: "#",
  },
  {
    logo: "/logos/minty-read.png",
    percentage: "180%",
    text: "increase in conversions after redesign.",
    images: ["/results/9.png", "/results/8.png", "/results/12.png"],
    link: "#",
  },
];

export default function OurResults() {
  const [index, setIndex] = useState(0);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [headingOpacity, setHeadingOpacity] = useState(0);
  const isMobile = useIsMobile();

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
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: headingOpacity, y: 0 }}
        transition={{ duration: 0 }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  useEffect(() => {
    if (isMobile) {
      setHeadingOpacity(1);
      return;
    }

    const handleScroll = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const centerOffset = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
      const maxOffset = windowHeight / 2 + rect.height / 2;

      let opacity = 1 - centerOffset / maxOffset;
      opacity = Math.min(Math.max(opacity, 0), 1);

      if (rect.top > 0 && rect.top < windowHeight * 0.4) {
        opacity = 1;
      }

      setHeadingOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMobile]);

  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getCardProps = (cardIndex: number) => {
    const diff = (cardIndex - index + results.length) % results.length;

    // Mobile - no animation
    if (screenWidth < 768) {
      return { scale: 1, x: 0, opacity: 1, zIndex: 10 };
    }

    // Desktop
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

  if (isMobile) {
    return (
      <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start overflow-hidden py-6 px-3">
        {/* Heading - No Animation */}
        <div className="mb-8 text-center w-full">
          <h2 className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-tight text-white leading-[1.05]">
            <div>Radiant</div>
            <div className="-mt-2">Results</div>
          </h2>
        </div>

        {/* Cards Stacked Vertically */}
        <div className="w-full flex flex-col gap-6">
          {results.map((current, cardIndex) => (
            <div
              key={cardIndex}
              className="w-full bg-black rounded-2xl flex flex-col shadow-2xl border border-white/40 overflow-hidden relative"
            >
              {/* Aurora Background */}
              <div className="absolute w-full inset-0 rounded-2xl overflow-hidden">
                <Aurora
                  colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
                  blend={0.7}
                  amplitude={2.0}
                  speed={1.0}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 w-full flex flex-col">
                <div className="flex flex-col px-4 py-4">
                  <div className="h-[60px] flex items-start mb-4">
                    <div className="relative w-[100px] h-[60px] flex items-center justify-start">
                      <Image 
                        src={current.logo} 
                        alt="logo" 
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="mb-4">
                    <h3 className="text-[clamp(4rem,12vw,6rem)] font-extrabold bg-gradient-to-r from-pink-500 to-rose-700 bg-clip-text text-transparent leading-none mb-2">
                      {current.percentage}
                    </h3>
                    <p className="text-[clamp(0.9rem,3vw,1.1rem)] text-gray-300 leading-relaxed">
                      {current.text}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border border-white/60 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors text-[0.9rem]"
                    >
                      View Project
                      <ArrowRight
                        className="transform transition-transform duration-300 group-hover:translate-x-1"
                        size={16}
                      />
                    </a>
                  </div>
                </div>

                {/* Images */}
                <div className="flex flex-row gap-2 px-2 py-2">
                  <div className="relative flex-[2] h-48 rounded-md overflow-hidden">
                    <Image src={current.images[0]} alt="result1" fill className="object-cover object-center" />
                  </div>
                  <div className="relative flex-[3] h-48 rounded-md overflow-hidden">
                    <Image src={current.images[1]} alt="result2" fill className="object-cover object-center" />
                  </div>
                  <div className="relative flex-[2] h-48 rounded-md overflow-hidden">
                    <Image src={current.images[2]} alt="result3" fill className="object-cover object-center" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop version - unchanged
  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start overflow-hidden py-6 sm:py-10 px-3 sm:px-4 md:px-12 lg:px-20 xl:px-32 2xl:px-48"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="mb-8 sm:mb-12 md:mb-20 text-center w-full max-w-[1600px]"
      >
        <motion.h2
          style={{ opacity: headingOpacity }}
          className="text-[clamp(4rem,12vw,10rem)] sm:text-[clamp(6rem,10vw,10rem)] md:text-[10rem] font-bold tracking-tight text-white leading-[1.05]"
        >
          <div className="text-center sm:text-left sm:ml-[4rem]">{renderLetters("Radiant")}</div>
          <div className="text-center sm:text-left sm:mt-2 sm:ml-[15rem] -mt-2 sm:mt-2">{renderLetters("Results", 3)}</div>
        </motion.h2>
      </div>

      {/* Card Stack */}
      <div className="w-full max-w-[1600px] relative h-[70vh] sm:h-[80vh] md:h-[90vh]">
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
                bg-black rounded-tr-[2rem] sm:rounded-tr-[4rem] md:rounded-tr-[10rem] 
                rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-[2rem] 
                flex flex-col shadow-2xl border border-white/40 overflow-hidden"
            >
              {/* Aurora Background */}
              <div className="absolute w-full inset-0 rounded-tr-[2rem] sm:rounded-tr-[4rem] md:rounded-tr-[10rem] rounded-tl-[2rem] rounded-br-[2rem] rounded-bl-[2rem] overflow-hidden">
                <Aurora
                  colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
                  blend={0.7}
                  amplitude={2.0}
                  speed={1.0}
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full h-full flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
                <div className="flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-12 flex-shrink-0 md:flex-shrink">
                  <div className="h-[60px] sm:h-[80px] md:h-[120px] flex items-start mb-4 sm:mb-6 md:mb-8">
                    <div className="relative w-[100px] h-[60px] sm:w-[120px] sm:h-[80px] md:w-[160px] md:h-[120px] flex items-center justify-start">
                      <Image 
                        src={current.logo} 
                        alt="logo" 
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    
                    {/* Stats Section */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-[clamp(4rem,12vw,6rem)] sm:text-[clamp(6rem,10vw,8rem)] md:text-[clamp(9rem,8vw,8rem)] font-extrabold bg-gradient-to-r from-pink-500 to-rose-700 bg-clip-text text-transparent leading-none mb-2 sm:mb-3 md:mb-4">
                        {current.percentage}
                      </h3>
                      <p className="text-[clamp(0.9rem,3vw,1.1rem)] sm:text-[clamp(1rem,2.5vw,1.3rem)] md:text-[clamp(1.2rem,1.8vw,1.8rem)] text-gray-300 leading-relaxed max-w-[400px]">
                        {current.text}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-6 md:mt-8">
                      <a
                        href={current.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border border-white/60 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition-colors text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]"
                      >
                        View Project
                        <ArrowRight
                          className="transform transition-transform duration-300 group-hover:translate-x-1"
                          size={16}
                        />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="flex-1 md:flex-none flex flex-row md:items-center gap-2 sm:gap-3 md:gap-4 px-2 sm:px-3 md:px-2 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-6 w-full max-w-7xl mx-auto md:-ml-20 min-h-0">
                  <div className="relative flex-[2] h-50 sm:h-auto sm:aspect-[9/16] min-w-[80px] sm:min-w-[120px] md:min-w-[180px] rounded-md sm:rounded-lg overflow-hidden">
                    <Image src={current.images[0]} alt="result1" fill className="object-cover object-center" />
                  </div>
                  <div className="relative flex-[3] h-50 sm:h-auto sm:aspect-[9/16] min-w-[100px] sm:min-w-[140px] md:min-w-[200px] rounded-md sm:rounded-lg overflow-hidden">
                    <Image src={current.images[1]} alt="result2" fill className="object-cover object-center" />
                  </div>
                  <div className="relative flex-[2] h-50 sm:h-auto sm:aspect-[9/16] min-w-[80px] sm:min-w-[120px] md:min-w-[180px] rounded-md sm:rounded-lg overflow-hidden">
                    <Image src={current.images[2]} alt="result3" fill className="object-cover object-center" />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div
                className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-8 flex gap-2 sm:gap-3 md:gap-4 z-20
                ${cardIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity`}
              >
                <button
                  onClick={prevCard}
                  className="hover:scale-110 transition-transform"
                >
                  <CircleArrowLeft size={screenWidth < 640 ? 24 : screenWidth < 768 ? 28 : 32} />
                </button>
                <button
                  onClick={nextCard}
                  className="hover:scale-110 transition-transform"
                >
                  <CircleArrowRight size={screenWidth < 640 ? 24 : screenWidth < 768 ? 28 : 32} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}