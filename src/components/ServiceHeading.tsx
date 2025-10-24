"use client";
import { motion, useAnimation, easeOut, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";

export default function ServicesHeading() {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const enterFlags = useRef({
    initiallyVisible: false,
    canAnimateOnReenter: false,
  });

  useEffect(() => {
    if (isMobile) return;

    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    enterFlags.current.initiallyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (enterFlags.current.initiallyVisible) {
            if (!entry.isIntersecting) {
              enterFlags.current.canAnimateOnReenter = true;
            } else if (entry.isIntersecting && enterFlags.current.canAnimateOnReenter) {
              controls.start("visible");
              observer.disconnect();
            }
          } else {
            if (entry.isIntersecting) {
              controls.start("visible");
              observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls, isMobile]);

  const [startScroll, setStartScroll] = useState(0);
  const [endScroll, setEndScroll] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isMobile) return;

    const calc = () => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      const height = ref.current.offsetHeight;
      setStartScroll(top + window.innerHeight / 1.2);
      setEndScroll(top + window.innerHeight + height * 0.8);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [isMobile]);

  const scale = useTransform(scrollY, [startScroll, endScroll], [1, 0.6], { clamp: true });
  const y = useTransform(scrollY, [startScroll, endScroll], [0, -210], { clamp: true });
  const opacity = useTransform(scrollY, [endScroll - 1, endScroll], [1, 0]);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.8, ease: easeOut },
    }),
  };
  
  const renderLetters = (text: string, offset = 0) => {
    if (isMobile) {
      return text.split("").map((char, i) => (
        <span key={`${text}-${i}`} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }

    return text.split("").map((char, i) => (
      <motion.span
        key={`${text}-${i}`}
        custom={i + offset}
        variants={letterVariants}
        initial="hidden"
        animate={controls}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };
  
  const motionStyle = endScroll > 0 && !isMobile ? { scale, y, opacity } : {};

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className="relative flex flex-col items-start justify-center min-h-[50vh] px-6 sm:px-12 md:px-20 lg:px-32"
    >
      <div className="relative -translate-x-6 sm:-translate-x-12 md:-translate-x-20 lg:-translate-x-40">
        <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold uppercase leading-[1]">
          <div className="text-left">{renderLetters("Our")}</div>
          <div className="text-left mt-2 sm:mt-3 md:mt-4 md:ml-10 lg:ml-25">
            {renderLetters("Radiance", 3)}
          </div>
        </h2>
      </div>

      <div className="hidden sm:block sm:absolute sm:right-5 sm:top-1/2 sm:-translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 111.42 110.66"
          className="w-[40px] h-[120px] sm:w-[60px] sm:h-[200px] md:w-[80px] md:h-[280px] lg:w-[100px] lg:h-[350px] fill-black"
        >
          <polygon points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"></polygon>
        </svg>
      </div>
    </motion.div>
  );
}