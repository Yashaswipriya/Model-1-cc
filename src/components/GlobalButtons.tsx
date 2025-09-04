"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function GlobalButtons() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 flex items-center gap-4 z-50">
      {/* Hire Us Button */}
      <button className="group flex items-center px-6 py-3 rounded-full text-md bg-black text-white font-medium shadow-lg hover:bg-pink-600 transition">
        Hire Us
        <ArrowRight
          className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
          size={20}
        />
      </button>

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
    </div>
  );
}
