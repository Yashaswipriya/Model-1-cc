"use client";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
export default function Hero() {
  return (
    <main className="relative flex h-screen items-center justify-center">
      {/* Hero Text Section */}
  <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-2">
  {/* Heading */}
  <h1 className="font-syne text-[10vw] md:text-[15vw] leading-[0.9] font-bold mx-auto text-center mb-20">
    <motion.span
      className="block transform md:-translate-x-40"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
    >
      Step
    </motion.span>

    <motion.span
      className="block transform md:translate-x-20 text-center md:text-right"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
      transition={{ delay: 0.2 }}
    >
      into the
    </motion.span>

    <motion.span
      className="block transform md:translate-x-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
      transition={{ delay: 0.4 }}
    >
      glow
    </motion.span>
  </h1>

  {/* Paragraph box next to "glow" */}
  <motion.p
    className="max-w-xs md:max-w-sm text-base md:text-2xl text-black md:ml-2 font-bricolage text-3xl mb-20 font-bold"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: easeOut } }}
  >
    Illuminate. Elevate. Dominate.
  </motion.p>
</div>
{/* ✅ Bottom-left logo */}
      <div className="absolute bottom-4 left-2">
        <Image
          src="/Logo.png" // <-- place logo.png inside /public folder
          alt="Logo"
          width={200}
          height={200}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

    </main>
  );
}



