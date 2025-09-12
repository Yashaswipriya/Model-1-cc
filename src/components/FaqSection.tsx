import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
   {
    question: "What services do you offer?",
    answer:
      "We provide end-to-end digital solutions including web and app design, full-stack development, branding, and digital marketing. Our goal is to create user-centric experiences that help businesses stand out online and achieve measurable growth.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Absolutely. We enjoy working with startups at any stage — from idea validation to scaling. Our team helps refine concepts, build MVPs, and set up strong foundations in design and technology so startups can grow with confidence.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "The duration depends on scope and complexity. A standard website can take 6-10 weeks, while larger platforms may require 3-4 months. We maintain clear timelines and regular updates to ensure you're always in the loop.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "We combine strategy, creativity, and technology. Instead of just delivering a product, we collaborate closely with clients, understanding their goals and audiences. This ensures every design choice and development decision directly supports business objectives.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, we offer ongoing maintenance and support packages after launch. From performance monitoring to content updates and security patches, we ensure your digital presence stays fast, secure, and up-to-date.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Pricing varies depending on the project's scope, required features, and timeline. We offer transparent, customized quotes after discussing your needs in detail, ensuring there are no hidden costs along the way.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black text-white py-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 3xl:px-60 max-w-screen-4xl mx-auto">
      <h2 className="text-4xl md:text-8xl font-bold mb-12 text-left">FAQ's</h2>
      <div className="space-y-6 max-w-4xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            
            onClick={() => toggleFAQ(index)}
          >
           <div className="flex items-center text-left">
                <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 mr-3"
                >
                <Plus className="w-8 h-8" />
                </motion.div>
                <h3 className="text-[2rem] flex-1">{faq.question}</h3>
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-gray-300 text-[1.5rem]"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
