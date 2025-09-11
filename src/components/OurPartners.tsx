import { motion, easeOut } from "framer-motion";
import Image from "next/image";

const logos = [
  { src: "/logos/cafepress.svg", name: "CafePress" },
  { src: "/logos/calendly.svg", name: "Calendly" },
  { src: "/logos/caterpillar.svg", name: "Caterpillar" },
  { src: "/logos/edx.svg", name: "Edx" },
  { src: "/logos/jfrog.svg", name: "Jfrog" },
  { src: "/logos/kicad.svg", name: "Kicad" },
  { src: "/logos/oreilly.svg", name: "Oreilly" },
  { src: "/logos/petsathome.svg", name: "Pets At Home" },
  { src: "/logos/quickbooks.svg", name: "QuickBooks" },
  { src: "/logos/themoviedatabase.svg", name: "TheMovieDatabase" },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // delay between letters
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};


export default function Partners() {
    const text = "Bright\nConnections";
  return (
    <section className="bg-black py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-left">
        {/* OUR (left aligned) */}
      <motion.h2
      className="text-white font-bold text-[10rem] leading-[1.1] mb-[8rem]"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, i) => {
        if (char === "\n") {
          return <br key={i} />;
        }

        return (
          <motion.span
            key={i}
            variants={letter}
            className={`${char === "C" ? "ml-16 inline-block" : "inline-block"}`}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-20 items-center justify-center">
          {logos.map(({ src, name }, index) => (
            <motion.div
              key={index}
              className="flex justify-center items-center w-32 h-20 md:w-40 md:h-24 lg:w-48 lg:h-28 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={src}
                alt={name}
                fill
                className="object-contain invert" 
                sizes="(max-width: 768px) 8rem, (max-width: 1024px) 10rem, 12rem"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
