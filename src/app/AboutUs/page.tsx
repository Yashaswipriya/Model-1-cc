import React from 'react';
import Image from 'next/image';
import Aurora from '@/components/Aurora';
import Footer from '@/components/Footer';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <div className="dark-section min-h-screen bg-black text-white relative">
        {/* Aurora Background */}
        <div className="fixed inset-0 z-0">
          <Aurora
            colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
            blend={0.3}
            amplitude={2.0}
            speed={1.0}
          />
        </div>
        <div className="absolute top-10 left-2 invert fill z-[9999]">
          <Link href="/" className="block">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={200}
              height={200}
              className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer w-30 sm:w-28 md:w-40 lg:w-48"
            />
          </Link>
        </div>
      
      <section className="py-20 relative z-10">
        <div className="mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
              WHY WE EXIST.
            </h2>
            <div className="">
              <p className="text-2xl md:text-3xl leading-tight mb-4 text-white">
               Illuminora was created to help brands shine brighter in the digital age. Born from years of experience in web design, paid ads, content creation and social media strategy, we saw how many businesses struggled to stand out and connect with their audience online.
                <span className='font-bold text-pink-600'>Our mission  is simple: transform names into brands</span> by blending creativity, strategy and technology. From startups finding their first light to growing businesses seeking a stronger digital presence, we craft solutions that illuminate your brand's path to success.
                At Illuminora, we don't just follow trends, we build strategies that set them.<span className='font-bold text-pink-600'> Let us help you shine online.</span>
              </p>
            </div>
          </div>

          {/* Image and text layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 text-xl leading-relaxed text-white">
              <p>
                Social media transformed the way brands connect with people. It's no longer about pushing ads at audiences, it's about real connections, real stories and real impact.
              </p>
              <p className="text-2xl font-bold text-pink-600">
                We call this the Brand Illumination Era
              </p>
              <p>
                In this new era, creative content, strategic storytelling and digital experiences define how a brand is seen. Recognizing this early on, Illuminora was built to help businesses harness the power of social platforms, paid media and compelling design to create influence and trust with their audiences at scale.
                At Illuminora, we don't just market, we make brands shine.
              </p>
            </div>
            <div className="relative">
              <video
                src="/AboutUsVideos/video-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-96 object-cover rounded-lg border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
              WHAT WE'VE BUILT.
            </h2>
            <div className="">
              <p className="text-2xl md:text-3xl leading-tight mb-4 text-white">
                In 2025, Illuminora stands as a growing digital agency built on years of hands-on experience with brands, startups and creators. From web design and development to social media management, 
                we've helped businesses <span className='text-pink-600 font-bold'>turn ideas into impact and names into brands.</span>
              </p>
            </div>
          </div>

          {/* Image and text layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8 text-xl leading-relaxed text-white">
              <p>
                While still young, we're already recognized for our fresh approach to digital marketing and our ability to help clients shine earlier, avoid mistakes and grow smarter. 
                At Illuminora, we're not just building campaigns — <span className='text-pink-600 font-bold'>we're building a new standard for how brands illuminate their presence online.</span>
              </p>
            </div>
            <div className="relative">
              <video
                src="/AboutUsVideos/video-2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-96 object-cover rounded-lg border border-gray-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
              OUR MISSION.
            </h2>
            <div className="">
              <p className="text-2xl md:text-3xl leading-tight text-white">
               We don't see ourselves as just another digital marketing agency. Branding isn't a single service or one line in a strategy
                — it's the sum of every interaction a customer has with you.
              </p>
            </div>
          </div>
          {/* Image and text layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8 text-xl leading-relaxed text-white">
            <p>
              Our mission is to illuminate brands across every touchpoint through web
              design, social media, paid ads, content and strategy, creating experiences
              that resonate, inspire and convert. At Illuminora, we exist to help
              businesses shine everywhere their audience is, turning vision into
              visibility and names into lasting brands.
            </p>
          </div>
          <div className="relative">
            <video
              src="/AboutUsVideos/video-3.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-96 object-cover rounded-lg border border-gray-700"
            />
          </div>
        </div>
        </div>
      </section>
      <section className='relative z-10'>
        <Footer />
      </section>
    </div>
  );
};

export default AboutPage;