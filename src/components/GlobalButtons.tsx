"use client";
import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function GlobalButtons() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = ["Home", "About", "Services", "Contact", "Start your project"];
  
  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2, ease: easeIn } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: easeOut },
    }),
  };

  return (
    // Top-right buttons
    <div className="fixed top-6 right-6 flex items-center gap-4 z-999">
      {/* Hire Us Button */}
        <div className="flex gap-2">
          <button className="group flex items-center px-10 py-3 rounded-full text-md bg-black text-white font-medium shadow-lg hover:bg-pink-600 transition">
            Hire Us
            <ArrowRight
              className="ml-4 transform transition-transform duration-300 group-hover:translate-x-1"
              size={25}
            />
          </button>
        </div>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white relative transition"
        >
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </button>

        {/* Menu Dialog + Backdrop */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
              />

              {/* Dialog */}
              <motion.div
                className="absolute top-14 right-0 bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 z-30 min-w-[280px]"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dialogVariants}
              >
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuItemVariants}
                  >
                    {item === "Start your project" ? (
                      <button className="group flex items-center justify-center px-4 py-3 rounded-full text-md bg-black text-white font-medium shadow-lg hover:bg-pink-600 transition w-full">
                        {item}
                        <ArrowRight
                          className="ml-4 transform transition-transform duration-300 group-hover:translate-x-1"
                          size={25}
                        />
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="text-black text-xl font-medium hover:text-gray-600 transition-colors"
                      >
                        {item}
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
  );
}
