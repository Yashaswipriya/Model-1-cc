"use client";
import { useEffect, useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  { title: "Discovery & research", description: "We start by understanding your business, goals, competitors, and target audience.", image: "/research.avif" },
  { title: "Strategy & Planning", description: "We design a custom roadmap tailored to your brand's needs and budget.", image: "/planning.avif" },
  { title: "Monitoring & Optimization", description: "We track performance using analytics, adjust campaigns, and optimize strategies for better ROI", image: "/optimization.avif" },
  { title: "Reporting & Growth", description: "You get transparent reports that show real results leads, sales and growth. We refine and scale what works.", image: "/growth.avif" },
];

export default function IlluminationJourney() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Smooth cursor follow (unchanged)
  useEffect(() => {
    let frame: number;
    const lerp = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.15,
        y: prev.y + (targetPos.current.y - prev.y) * 0.15,
      }));
      frame = requestAnimationFrame(lerp);
    };
    frame = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(frame);
  }, []);

  // ✅ Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.4, ease: easeOut },
    }),
  };

  const renderLetters = (text: string) =>
    text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <section className="relative w-full py-150">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="pt-30 pb-55 text-center">
          {/* ✅ Animate letters only when heading comes into view */}
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-10 mt-10 whitespace-nowrap text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }} // triggers when 40% in view
          >
            {renderLetters("Our Illumination Journey")}
          </motion.h2>

          {/* ✅ Fade in tagline after heading is visible */}
          <motion.p
            className="text-2xl text-gray-800 max-w-3xl text-center mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Our process is simple, transparent and designed to illuminate your
            path from vision to brand.
          </motion.p>
        </div>

        {/* Steps */}
        {/* Steps */}
<div className="flex flex-col gap-20 relative">
  {steps.map((step, index) => {
    const isActive = activeStep === index;
    return (
      <motion.div
        key={index}
        className="relative"
        onMouseEnter={() => setActiveStep(index)}
        onMouseLeave={() => setActiveStep(null)}
        onMouseMove={(e) => {
          if (!isActive) return;
          const rect = e.currentTarget.getBoundingClientRect();
          targetPos.current.x = e.clientX - rect.left;
          targetPos.current.y = e.clientY - rect.top;
        }}
        initial={{ opacity: 0, y: 50 }} // start hidden and below
        whileInView={{ opacity: 1, y: 0 }} // fade in and slide up
        viewport={{ once: true, amount: 0.3 }} // trigger when 30% visible
        transition={{ duration: 0.6, ease: easeOut, delay: index * 0.2 }} // stagger each step
      >
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 py-8">
          <div>
            <span className="text-3xl font-semibold text-black mb-4 block">
              {String(index + 1).padStart(2, "0")}/
            </span>
            <h3 className="text-6xl md:text-8xl font-semibold">{step.title}</h3>
          </div>
          <p className="md:col-span-2 text-2xl leading-relaxed text-gray-900 ml-60">
            {step.description}
          </p>
        </div>
        <div className="w-270 h-px bg-black"></div>
      </motion.div>
    );
  })}
</div>
      </div>
    </section>
  );
}
