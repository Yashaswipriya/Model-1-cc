"use client";
import { motion, useAnimation, easeOut, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ServicesHeading() {
  const ref = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  // ---------- Letter animation trigger (only on scroll entry, not on refresh) ----------
  // We keep flags in a ref so checks don't re-trigger the effect loops.
  const enterFlags = useRef({
    initiallyVisible: false,
    canAnimateOnReenter: false,
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // detect if element is inside viewport right after mount (initial page load)
    const rect = node.getBoundingClientRect();
    enterFlags.current.initiallyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the heading was initially visible, wait for it to leave then re-enter.
          if (enterFlags.current.initiallyVisible) {
            if (!entry.isIntersecting) {
              // user scrolled away — now allow animation on next enter
              enterFlags.current.canAnimateOnReenter = true;
            } else if (entry.isIntersecting && enterFlags.current.canAnimateOnReenter) {
              controls.start("visible");
              observer.disconnect();
            }
          } else {
            // Not initially visible: animate on first intersection
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
  }, [controls]);

  // ---------- Scroll-based floating + scale + disappear ----------
  const [startScroll, setStartScroll] = useState(0);
  const [endScroll, setEndScroll] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const calc = () => {
      if (!ref.current) return;
      const top = ref.current.offsetTop;
      const height = ref.current.offsetHeight;
      // start when heading is around the middle of viewport, end after it's well above cards
      setStartScroll(top + window.innerHeight / 1.2);
      setEndScroll(top + window.innerHeight + height * 0.8); // adjust 0.8 → 0.7/0.9 as needed
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // only apply transforms once endScroll is calculated to avoid initial flicker
  const scale = useTransform(scrollY, [startScroll, endScroll], [1, 0.6], { clamp: true });
  const y = useTransform(scrollY, [startScroll, endScroll], [0, -210], { clamp: true }); // floats up as it shrinks
  const opacity = useTransform(scrollY, [endScroll - 1, endScroll], [1, 0]); // fully disappears at the end

  // ---------- Letter variants & renderer ----------
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

  // Avoid passing transforms before endScroll is set (to prevent transient effects)
  const motionStyle = endScroll > 0 ? { scale, y, opacity } : {};

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className="relative flex flex-col items-start justify-center min-h-[50vh] px-6 sm:px-12 md:px-20 lg:px-32"
    >
      <div className="relative -translate-x-6 sm:-translate-x-12 md:-translate-x-20 lg:-translate-x-40">
        <motion.h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold uppercase leading-[1]">
          <div className="text-left">{renderLetters("Our")}</div>
          <div className="text-left mt-2 sm:mt-3 md:mt-4 md:ml-10 lg:ml-25">
            {renderLetters("Radiance", 3)}
          </div>
        </motion.h2>
      </div>

      {/* Arrow */}
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
