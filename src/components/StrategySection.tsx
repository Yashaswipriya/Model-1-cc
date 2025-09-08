"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    title: "Discovery & research",
    description:
      "We start by understanding your business, goals, competitors, and target audience.",
    image: "/research.avif",
  },
  {
    title: "Strategy & Planning",
    description:
      "We design a custom roadmap tailored to your brand's needs and budget.",
    image: "/planning.avif",
  },
  {
    title: "Monitoring & Optimization",
    description:
      "We track performance using analytics, adjust campaigns, and optimize strategies for better ROI",
    image: "/optimization.avif",
  },
  {
    title: "Reporting & Growth",
    description:
      "You get transparent reports that show real results leads, sales and growth. We refine and scale what works.",
    image: "/growth.avif",
  },
];

export default function IlluminationJourney() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

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

  return (
    <section className="relative w-full py-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="pt-20 pb-40 text-center">
          <h2 className="text-8xl font-bold mb-4 mt-10">Our Illumination Journey</h2>
          <p className="text-2xl text-gray-800 max-w-3xl text-center mx-auto">
            Our process is simple, transparent and designed to illuminate your
            path from vision to brand.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-25 relative">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div
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
              >
                {/* Section Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 py-8">
                  {/* Left: Number + Title */}
                  <div>
                    <span className="text-3xl font-semibold text-black mb-4 block">
                      {String(index + 1).padStart(2, "0")}/
                    </span>
                    <h3 className="text-6xl font-semibold">{step.title}</h3>
                  </div>

                  {/* Right: Description */}
                  <p className="md:col-span-1 text-2xl leading-relaxed text-gray-900">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Divider */}
                <div className="w-270 h-px bg-black"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
