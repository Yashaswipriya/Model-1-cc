"use client";
import React, { useEffect, useRef, useState } from "react";

interface ScrollStackProps {
  children: React.ReactNode[];         // array of card components
  cardHeight?: string;                  // height of each card
  animationDuration?: string;           // CSS transition duration
  sectionHeightMultiplier?: number;    // how much scroll space
  className?: string;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  cardHeight = "40rem",
  animationDuration = "1s",
  sectionHeightMultiplier = 3,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ticking = useRef(false);
  const cardCount = children.length;

  // Scroll handler
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

  // Generate card styles
  const getCardStyle = (index: number) => {
    const isVisible = activeIndex >= index;
    const translateY = isVisible ? "0px" : "100px";
    const scale = 1;
    const opacity = isVisible ? 1 : 0;
    return {
      transform: `translateX(-50%) translateY(${translateY}) scale(${scale})`,
      opacity,
      zIndex: 10 + index,
      transition: `transform ${animationDuration} cubic-bezier(0.19, 1, 0.22, 1), opacity ${animationDuration}`,
      position: "absolute" as const,
      top: "3%",
      left: "50%",
      width: "100%",
      maxWidth: "75rem",
      pointerEvents: isVisible ? "auto" as React.CSSProperties['pointerEvents'] : "none" as React.CSSProperties['pointerEvents'],
      height: cardHeight,
    };
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full max-h-screen ${className}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <div
        ref={sectionRef}
        className="relative w-full"
        style={{ height: `${sectionHeightMultiplier * 100}vh` }}
      >
        <div className="sticky top-0  h-screen flex items-center justify-center overflow-hidden">
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
