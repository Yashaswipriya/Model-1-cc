"use client";

import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@illuminora.com");
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
  };

  const sectors = [
    "Agencies",
    "SaaS & Tech",
    "B2B Transformation",
    "Healthcare",
    "Media & Entertainment",
    "Retail",
  ];

  return (
    <footer className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left Column: Logo + Navigation */}
          <div className="flex flex-col gap-6">
            <Image
              src="/Logo.png"
              alt="Illuminora Logo"
              width={200}
              height={200}
              className="object-contain filter invert"
            />
            <div className="h-[1rem]"></div>
            <div className="flex gap-4 text-gray-400">
              <motion.a
                href="/logos/caterpillar.svg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FF94B4" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="invert fill"
              >
                <Linkedin size={40} />
              </motion.a>
              <motion.a
                href="/logos/cafepress.svg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FF94B4" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Facebook size={40} />
              </motion.a>
              <motion.a
                href="/logos/calendly.svg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#FF94B4" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Instagram size={40} />
              </motion.a>
            </div>
            <div className="h-[1rem]"></div>
            <ul className="flex flex-col md:flex-row gap-6 text-white text-xl">
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#faq" className="hover:text-white transition">FAQs</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Right Column: Email + Social + Newsletter */}
          <div className="flex flex-col gap-6 items-start md:items-end relative">
            <button
              onClick={handleCopyEmail}
              className="text-6xl font-semibold hover:text-pink-400 transition"
            >
              hello@illuminora.com
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-6 right-0 text-md text-black bg-white px-2 py-1 rounded"
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>

            <a
              href="/newsletter"
              className="bg-black border border-white/60 text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Sign up to our newsletter
            </a>
          </div>
        </div>

        {/* Awards Row */}
        <div className="flex flex-wrap gap-6 justify-start md:justify-end items-center">
          <Image src="/dan-logo.png" alt="DAN Award" width={120} height={40} />
          <Image src="/clutch.svg" alt="Clutch" width={80} height={40} />
          <Image src="/awwwards.svg" alt="Awwwards" width={80} height={40} />
          <Image src="/cssda.svg" alt="CSSDA" width={80} height={40} />
        </div>

        {/* Sectors Row */}
        <div className="flex flex-wrap gap-3">
          {sectors.map((sector) => (
            <a
              key={sector}
              href={`/${sector.toLowerCase().replace(/\s/g, "-")}`}
              className="bg-black text-white border border-white/60 px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              {sector}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-700 pt-6 text-gray-400 text-center">
          © Illuminora 2025
        </div>
      </div>
    </footer>
  );
};

export default Footer;
