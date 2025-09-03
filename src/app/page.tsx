"use client";  
import Aurora from "../components/Aurora"; 
import Hero from "../components/Hero"; 
import ServicesHeading from "../components/ServiceHeading"; 
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack"; 
import { motion, useScroll, useTransform } from "framer-motion"; 
import { useRef } from "react";  

export default function Page() {   
  const sectionRef = useRef(null);    
  
  // Track scroll progress relative to this outer section   
  const { scrollYProgress } = useScroll({     
    target: sectionRef,     
    offset: ["start center", "end start"],   
  });    
  
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);    
  
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

      {/* Services Section */}       
      <section ref={sectionRef} className="relative min-h-[200vh]">         
        {/* Heading stays in place and fades out */}         
        <motion.div           
          style={{ opacity: headingOpacity }}           
          className="sticky top-24 z-30 w-full flex justify-center pointer-events-none"         
        >           
          <ServicesHeading />         
        </motion.div>          

        {/* ScrollStack takes full width and height */}         
        <div className="relative z-20 h-screen">           
          <ScrollStack className="no-scrollbar">             
            <ScrollStackItem itemClassName="text-black">               
              <h2 className="text-3xl font-bold mb-4">Card 1</h2>               
              <p className="text-lg">This is the first card in the stack</p>             
            </ScrollStackItem>             
            <ScrollStackItem itemClassName="text-black">               
              <h2 className="text-3xl font-bold mb-4">Card 2</h2>               
              <p className="text-lg">This is the second card in the stack</p>             
            </ScrollStackItem>             
            <ScrollStackItem itemClassName="text-black">               
              <h2 className="text-3xl font-bold mb-4">Card 3</h2>               
              <p className="text-lg">This is the third card in the stack</p>             
            </ScrollStackItem>
            <ScrollStackItem itemClassName="text-black">               
              <h2 className="text-3xl font-bold mb-4">Card 4</h2>               
              <p className="text-lg">This is the fourth card in the stack</p>             
            </ScrollStackItem>           
          </ScrollStack>         
        </div>       
      </section>     
    </main>   
  ); 
}





