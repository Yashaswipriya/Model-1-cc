"use client";
import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GlobalButtons() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Detect if "dark-section" is in view
 useEffect(() => {
  const handleScroll = () => {
    const darkSections = document.querySelectorAll<HTMLElement>(".dark-section");
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY;
    const viewportCenter = scrollTop + viewportHeight / 2;

    let shouldBeDark = false;
    
    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = scrollTop + rect.top;
      const sectionBottom = sectionTop + rect.height;
      
      if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
        shouldBeDark = true;
      }
    });

    setDarkMode(shouldBeDark);
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll);
  handleScroll(); // Initial check

  return () => window.removeEventListener('scroll', throttledScroll);
}, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/AboutUs" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/HireUs" },
    { label: "Start your project", href: "/HireUs", cta: true },
  ];

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2, ease: easeIn } },
  };

  return (
    <div className="fixed top-6 right-6 flex items-center gap-4 z-[999]">
      {/* Hire Us Button */}
      <div className="flex gap-2">
        <Link href="/HireUs" onClick={() => setMenuOpen(false)}>
          <button
            className={`group flex items-center px-4 py-2 sm:px-10 sm:py-3 rounded-full text-md font-medium shadow-lg transition
            ${
              darkMode
                ? "bg-white text-black hover:bg-pink-600"
                : "bg-black text-white hover:bg-pink-600"
            }`}
          >
            Hire Us
            <ArrowRight
              className="ml-4 transform transition-transform duration-300 group-hover:translate-x-1"
              size={25}
            />
          </button>
        </Link>
      </div>

      {/* Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`w-12 h-12 flex items-center justify-center rounded-full transition
          ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
      >
        <span
          className={`absolute h-0.5 w-6 transition-transform duration-300 ${
            darkMode ? "bg-black" : "bg-white"
          } ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`}
        />
        <span
          className={`absolute h-0.5 w-6 transition-opacity duration-300 ${
            darkMode ? "bg-black" : "bg-white"
          } ${menuOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`absolute h-0.5 w-6 transition-transform duration-300 ${
            darkMode ? "bg-black" : "bg-white"
          } ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`}
        />
      </button>

      {/* Menu Dialog */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-14 right-0 bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 z-30 min-w-[280px]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
          >
            {menuItems.map((item) =>
              item.cta ? (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  <button className="group flex items-center justify-center px-8 py-3 rounded-full text-md font-medium shadow-lg transition bg-black text-white hover:bg-pink-600 w-full whitespace-nowrap">
                    {item.label}
                    <ArrowRight
                      className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1"
                      size={20}
                    />
                  </button>
                </Link>
              ) : (
                <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} scroll={true}>
                  <span className="text-black text-xl font-medium hover:text-gray-600 cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
