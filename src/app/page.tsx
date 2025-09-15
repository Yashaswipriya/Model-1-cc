"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Aurora from "../components/Aurora";
import Hero from "../components/Hero";
import ServicesHeading from "../components/ServiceHeading";
import ScrollStack from "../components/ScrollStack";
import CardContent from "../components/CardContent";
import StrategySection from "@/components/StrategySection";
import OurWorkSection from "@/components/OurWorks";
import OurResults from "@/components/OurResults";
import OurPartners from "@/components/OurPartners";
import FaqSection from "@/components/FaqSection";
import ThreeBlob from "@/components/ThreeBlob";
import Footer from "@/components/Footer";

const cardsData = [
  {
    title: "Web Design & Development",
    tags: ["Wordpress", "Blogs", "Portfolio", "E-Commerce"],
    description:
      "Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.",
    videoSrc: "/WebDesign.mp4",
  },
  {
    title: "Brand Strategy",
    tags: ["Brand Identity", "Positioning", "Storytelling", "Visual Design"],
    description:
      "Build a memorable brand that resonates with your audience and grows your business.",
    videoSrc: "/brandStrategy.mp4",
  },
  {
    title: "Video Editing",
    tags: ["Adobe Premiere Pro", "Final Cut Pro", "After Effects", "DaVinci Resolve"],
    description:
      "Transform raw footage into captivating videos that tell your story, engage your audience, and leave a lasting impression.",
    videoSrc: "/videoEditing.mp4",
  },
  {
    title: "Paid Advertising",
    tags: ["Google Ads", "Facebook Ads", "Instagram Ads", "LinkedIn Ads"],
    description:
      "Design and run powerful, attention-grabbing ads that connect with your audience, boost engagement, and drive measurable results for your business.",
    videoSrc: "/PaidAds.mp4",
  },
  {
    title: "Social Media Management",
    tags: ["Content Creation", "Scheduling", "Analytics", "Community Engagement"],
    description:
      "Build and nurture a vibrant online community that amplifies your brand message, fosters loyalty, and drives meaningful interactions across all your social platforms.",
    videoSrc: "/socialMedia.mp4",
  },
];

export default function Page() {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);

  // Track scroll progress relative to the cards section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end start"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const isInView = useInView(blobRef, { margin: "-100px" });

  return (
    <main className="relative w-full">
     

      {/* Aurora Background */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
          blend={0.3}
          amplitude={2.0}
          speed={1.0}
        />
      </div>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* Services Section with Cards */}
      <section
        ref={sectionRef}
        className="relative flex flex-col items-center"
        style={{ height: `${cardsData.length * 100}vh` }}
      >
        <motion.div
          style={{ opacity: headingOpacity }}
          className="sticky top-24 z-30 w-full flex justify-center pointer-events-none"
        >
          <ServicesHeading />
        </motion.div>

        <div className="mt-40 w-full flex justify-center">
          <ScrollStack sectionHeightMultiplier={cardsData.length}>
            {cardsData.map((card, idx) => (
              <CardContent
                key={idx}
                title={card.title}
                tags={card.tags}
                description={card.description}
                videoSrc={card.videoSrc}
              />
            ))}
          </ScrollStack>
        </div>
      </section>

      <section className="relative z-20 bg-transparent">
        <StrategySection />
      </section>

      {/* Other Sections */}
      <section className="dark-section relative z-20 bg-black text-white min-h-screen">
        <OurWorkSection />
      </section>

      <section className="dark-section relative z-20 bg-black text-white">
        <OurResults />
      </section>

      <section className="dark-section relative z-20 bg-black text-white">
        <OurPartners />
      </section>

      <section id="faq" className="dark-section relative z-20 bg-black text-white">
        <FaqSection />
      </section>

      {/* ThreeBlob Section */}
      <section ref={blobRef} className="dark-section relative w-full h-screen bg-black z-10">
        <ThreeBlob startAnimation={isInView} />
      </section>

      <section className="dark-section relative z-20 bg-black text-white">
        <Footer />
      </section>
    </main>
  );
}



