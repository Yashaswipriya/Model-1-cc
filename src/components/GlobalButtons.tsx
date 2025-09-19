"use client";
import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // ✅ import Link

export default function GlobalButtons() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Detect if "dark-section" is in view
  useEffect(() => {
    const darkSections = document.querySelectorAll<HTMLElement>(".dark-section");
    if (!darkSections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setDarkMode(entry.isIntersecting);
        });
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0.1,
      }
    );

    darkSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const menuItems = ["Home", "About", "Services", "Contact", "Start your project"];

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2, ease: easeIn } },
  };

  return (
    <div className="fixed top-6 right-6 flex items-center gap-4 z-[999]">
      {/* Hire Us Button */}
      <div className="flex gap-2">
        <Link href="/HireUs">
          <button
            className={`group flex items-center px-10 py-3 rounded-full text-md font-medium shadow-lg transition
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
            {menuItems.map((item) => (
              <a key={item} href="#" className="text-black text-xl font-medium hover:text-gray-600">
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
