"use client";
import { motion, useAnimation, easeOut, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ServicesHeading() {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  // Letter animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold: 0.7 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  // Fade heading out as it scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 65%"], // fade while section passes viewport
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.8, ease: easeOut },
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
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative flex flex-col items-start justify-center min-h-[50vh] px-20 md:px-50"
    >
      <div className="relative -translate-x-40">
        <motion.h2 className="text-8xl md:text-9xl 3xl:text-9xl font-semibold uppercase leading-[0.98]">
          <div className="text-left">{renderLetters("Our")}</div>
          <div className="text-left md:ml-25 mt-2">{renderLetters("Radiance", 3)}</div>
        </motion.h2>
      </div>

      {/* Arrow */}
      <div className="absolute right-6 md:right-5 top-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 111.42 110.66"
          className="w-[100px] h-[350px] fill-black"
        >
          <polygon points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"></polygon>
        </svg>
      </div>
    </motion.div>
  );
}
