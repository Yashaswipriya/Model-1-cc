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
  return "xl"; 
};

// Simple mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
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
  const isMobile = useIsMobile();

  // Update breakpoint on resize
  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop scroll logic
  useEffect(() => {
    if (isMobile) return;

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
  }, [cardCount, isMobile]);

  const getCardStyle = (index: number) => {
    if (isMobile) {
      return {
        position: "relative" as const,
        width: "100%",
        maxWidth: "100%",
        height: "auto",
        opacity: 1,
        zIndex: 10,
        pointerEvents: "auto",
        marginBottom: index === children.length - 1 ? "0" : "2rem",
      } as React.CSSProperties;
    }

    // Desktop: original scroll stack
    const isVisible = activeIndex >= index;
    const translateY = isVisible ? "0px" : "40px";
    const opacity = isVisible ? 1 : 0;

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
      default:
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
        style={{
          height: isMobile ? "auto" : `${sectionHeightMultiplier * 100}vh`,
        }}
      >
        <div
          className={`w-full flex items-center justify-center ${
            isMobile 
              ? "relative flex-col gap-8 py-8 px-4" 
              : "sticky top-0 h-screen"
          }`}
        >
          {children.map((child, index) => (
            <div key={index} style={getCardStyle(index)}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollStack;