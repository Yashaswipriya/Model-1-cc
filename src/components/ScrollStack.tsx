"use client";
import React, { useEffect, useRef, useState } from "react";

interface ScrollStackProps {
  children: React.ReactNode[];
  animationDuration?: string;
  sectionHeightMultiplier?: number;
  className?: string;
}

type Breakpoint = "xl" | "2xl" | "3xl" | "4xl";

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= 2560) return "4xl";
  if (width >= 1920) return "3xl";
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  return "xl"; // default fallback
};

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  animationDuration = "1s",
  sectionHeightMultiplier = 3,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("xl");
  const ticking = useRef(false);
  const cardCount = children.length;

  // Update breakpoint on resize
  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    handleResize(); // initialize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !sectionRef.current) return;
      if (ticking.current) return;

      requestAnimationFrame(() => {
        const sectionTop = sectionRef.current!.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const sectionHeight = sectionRef.current!.offsetHeight;
        const scrollableDistance = sectionHeight - viewportHeight;

        let progress = 0;
        if (sectionTop <= 0 && Math.abs(sectionTop) <= scrollableDistance) {
          progress = Math.abs(sectionTop) / scrollableDistance;
        } else if (sectionTop <= 0) {
          progress = 1;
        }

        const progressPerCard = 1 / cardCount;
        let newActive = 0;
        for (let i = 0; i < cardCount; i++) {
          if (progress >= progressPerCard * (i + 1)) newActive = i + 1;
        }

        setActiveIndex(Math.min(newActive, cardCount - 1));
        ticking.current = false;
      });

      ticking.current = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardCount]);

  const getCardStyle = (index: number) => {
    const isVisible = activeIndex >= index;
    const translateY = isVisible ? "0px" : "40px";
    const opacity = isVisible ? 1 : 0;

    // Tailwind-like responsive adjustments
    let width = "95%";
    let maxWidth = "1400px";
    let height = "90vh";

    switch (breakpoint) {
      case "2xl":
        maxWidth = "1600px";
        height = "85vh";
        break;
      case "3xl":
        maxWidth = "1920px";
        height = "90vh";
        break;
      case "4xl":
        maxWidth = "2560px";
        height = "90vh";
        break;
      default: // xl
        maxWidth = "1400px";
        height = "90vh";
    }

    return {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) translateY(${translateY})`,
      width,
      maxWidth,
      height,
      opacity,
      zIndex: 10 + index,
      pointerEvents: isVisible ? "auto" : "none",
      borderRadius: "1rem",
      overflow: "hidden",
      transition: `all ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1)`,
    } as React.CSSProperties;
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <div
        ref={sectionRef}
        className="relative w-full"
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            {children.map((child, index) => (
              <div key={index} style={getCardStyle(index)}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;
