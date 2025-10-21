"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "ComputerChacha",
    year: "2025",
    video: "/WorkVideos/Project-1.mp4",
    img: "/WorkImages/cc.png",
    description: "We crafted a gaming web experience for a customised PC builder",
    tags: ["UI/UX", "Web Design"],
    link: "http://www.computerchacha.in",
  },

  {
    id: 2,
    title: "WhyNoTravel",
    year: "2024",
    video: "/WorkVideos/Project-2.mp4",
    img: "/WorkImages/WhyNoTravel.png",
    description: "Wanderers - We created eye-catching content for a travel page",
    tags: ["Social Media", "Content Creation"],
    link: "https://www.instagram.com/_whynotravel_/",
  },

  {
    id: 3,
    title: "GopalEstate",
    year: "2024",
    video: "/WorkVideos/Project-3.mp4",
    img: "/WorkImages/GopalEstate.png",
    description: "A future ready Real Estate Social Media",
    tags: ["Web Design", "Branding"],
    link:"https://www.instagram.com/gopalestate/",
  },

  {
    id: 4,
    title: "NityaVibes",
    year: "2023",
    video: "/WorkVideos/Project-4.mp4",
    img: "/WorkImages/Nitya.png",
    description: "Working with Beauty Influencer's Social Media",
    tags: ["Social Media", "Content Creation"],
    link: "https://www.instagram.com/nitya.vibes/",
  },

  {
    id: 5,
    title: "MintyRead",
    year: "2023",
    video: "/WorkVideos/Project-5.mp4",
    img: "/WorkImages/Minty.png",
    description: "Designed a Blog Website for Fashion & Everyday stuff.",
    tags: ["Web Design", "Branding"],
    link: "https://mintyread.com/",
  },
];

export default function OurWorkSection() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-black text-white py-20 px-4 md:py-40 md:px-16">
      {/* Heading + Subheading */}
      <div className="grid md:grid-cols-2 gap-8 items-start mb-12 md:mb-16">
        {!isMobile ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight overflow-visible">
              {"Illuminated".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h2>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight -mt-4 md:-mt-6 lg:-mt-8 ml-6 overflow-visible">
              {"Creations".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </motion.div>
        ) : (
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-snug">Illuminated Creations</h2>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={`text-2xl sm:text-3xl mb-2 md:mb-4`}>Making brands a damn site better.</h3>
          <p className="text-base sm:text-lg text-gray-300">
            Let's face it, first impressions matter. Your website's an opportunity to wow your audience, so why choose bad design?
          </p>
        </motion.div>
      </div>

      {/* Projects */}
      <div className="flex flex-col gap-6">
        <ProjectCard {...projects[0]} large isMobile={isMobile} />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.slice(1).map((p) => (
            <ProjectCard key={p.id} {...p} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  title: string;
  year: string;
  video: string;
  img: string;
  description: string;
  tags: string[];
  large?: boolean;
  link: string;
  isMobile?: boolean;
};

function ProjectCard({
  title,
  year,
  video,
  img,
  description,
  tags,
  link,
  large = false,
  isMobile = false,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-lg border border-white/40 transition-all duration-300 ${
        large ? "aspect-[16/9] sm:w-full sm:h-[90vh]" : "aspect-[16/9]"
      } hover:scale-105`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      {isMobile ? (
        <img src={img} alt={title} className="w-full h-full object-cover" />
      ) : (
        <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
      )}

      {/* Hover Overlay (desktop only) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4"
        >
          <h4 className="text-xl font-bold mb-2 border-b border-white/40 pb-1">{title}</h4>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl text-gray-200 px-4 max-w-[80%]"
          >
            {description}
          </motion.p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs bg-white/10 border border-white/30 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top-right Year */}
      <span className="absolute top-3 right-3 bg-black/70 border border-white/50 text-white text-xs px-2 py-1 rounded">
        {year}
      </span>

      {/* Top-left Diagonal Arrow Link */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 left-3 text-white bg-black/60 border border-white/50 p-2 rounded-full hover:scale-110 transition-transform duration-200"
      >
        <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
}
