"use client";
import { motion, easeOut } from "framer-motion";
import Image from "next/image";
export default function Hero() {
  return (
    <main className="relative flex h-screen items-center justify-center">
  <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-2">
  <h1 className="font-syne text-[14vw] sm:text-[10vw] md:text-[12vw] leading-[1.2] font-bold mx-auto text-center mb-20">
    <motion.span
      className="block transform md:translate-x-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
    >
      Illuminate
    </motion.span>

    <motion.span
      className="block transform md:translate-x-40 text-center md:text-right"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
      }}
      transition={{ delay: 0.2 }}
    >
      Elevate
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
      Dominate
    </motion.span>
  </h1>

  <motion.p
    className="max-w-xs md:max-w-sm text-base md:text-xl text-black md:ml-15 font-bricolage text-3xl mb-20"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: easeOut } }}
  >
   
     Illuminating brands with vibrant creativity, full spectrum strategy and innovative solutions to help your brand 
     <span className="font-bold"> shine in every digital space </span>
   
  </motion.p>
</div>

      <div className="absolute bottom-4 left-2">
        <Image
          src="/Logo.png" 
          alt="Logo"
          width={200}
          height={200}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

    </main>
  );
}



