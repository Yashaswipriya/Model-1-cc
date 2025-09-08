"use client";
import React, { useEffect, useRef, useState } from "react";

interface ScrollStackProps {
  children: React.ReactNode[];
  animationDuration?: string;
  sectionHeightMultiplier?: number;
  className?: string;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  animationDuration = "1s",
  sectionHeightMultiplier = 3,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ticking = useRef(false);
  const cardCount = children.length;

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

    return {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) translateY(${translateY})`,
      width: "95%",                // 90% of viewport width
      maxWidth: "1400px",          // cap on large screens
      height: "90vh",              // ~80% viewport height
      opacity,
      zIndex: 10 + index,
      pointerEvents: isVisible ? "auto" : "none",
      borderRadius: "1rem",        // optional: rounded corners
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
