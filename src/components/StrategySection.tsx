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
  const targetPos = useRef({ x: 0, y: 0 });

  // Smooth cursor follow
  const [pos, setPos] = useState({ x: 0, y: 0 });
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

  // Letter animation variants
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
    <section className="relative w-full py-200 md:py-200 lg:py-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="pt-12 pb-16 text-center mb-20 md:mb-32 lg:mb-40 xl:mb-48">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 md:mb-10 whitespace-nowrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            {renderLetters("Our Illumination Journey")}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto"
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
        <div className="flex flex-col gap-16 sm:gap-20 relative">
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: easeOut, delay: index * 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-10 py-6 sm:py-8">
                  {/* Step number and title */}
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <span className="text-2xl sm:text-3xl font-semibold text-black">
                      {String(index + 1).padStart(2, "0")}/
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold">
                      {step.title}
                    </h3>
                  </div>

                  {/* Step description */}
                  <p className="md:col-span-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-900 mt-20 ml-40">
                    {step.description}
                  </p>
                </div>

                <div className="w-full h-px bg-black mt-4" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
