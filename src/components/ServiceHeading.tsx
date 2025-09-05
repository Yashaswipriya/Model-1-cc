"use client";
import { motion, useAnimation, easeOut } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ServicesHeading() {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);
  
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: easeOut },
    }),
  };

  const renderLetters = (text: string, offset = 0) =>
    text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i + offset}
        variants={letterVariants}
        initial="hidden"
        animate={controls}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-start justify-center min-h-[10vh] px-20 md:px-50"
    >
      {/* Heading */}
      <motion.h2
        className="text-7xl md:text-8xl font-semibold uppercase tracking-[.15em] leading-[0.95]"
      >
        <div className="text-left">{renderLetters("Our")}</div>
        <div className="text-left md:ml-16 mt-2">{renderLetters("Radiance", 3)}</div>
      </motion.h2>

      {/* Static Arrow — Pushed to Right */}
      <div className="absolute right-6 md:right-5 top-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 111.42 110.66"
          className="w-[100px] h-[350px] fill-black"
        >
          <polygon points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"></polygon>
        </svg>
      </div>
    </section>
  );
}

