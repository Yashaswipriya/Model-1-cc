import React from 'react';
import Image from 'next/image';
import Aurora from '@/components/Aurora';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
        {/* Aurora Background */}
              <div className="fixed inset-0 -z-10">
                <Aurora
                  colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
                  blend={0.3}
                  amplitude={2.0}
                  speed={1.0}
                />
              </div>
      {/* Why we exist section */}
      <section className="py-20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Large section header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
              WHY WE EXIST.
            </h2>
            <div className="">
              <p className="text-3xl md:text-4xl leading-tight mb-4 text-white" style={{ textIndent: '15rem' }}>
                The Goat Agency was founded in 2015 to help brands leverage the influence of online creators.
                As one of the OG influencer marketing agencies, we pioneered many of the practices that are still used today.
              </p>
            </div>
          </div>

          {/* Image and text layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-8 text-xl leading-relaxed text-white">
              <p>
                Social media changed everything. Instead of brands placing themselves at the center of advertising, it became about real people and real stories.
              </p>
              <p className="text-2xl font-bold">
                We call it the <span className="font-black">Human Media Revolution</span>.
              </p>
              <p>
                Online creators emerged as one of the most powerful forces within the Human Media Revolution. Recognizing this early on, Goat pioneered harnessing <span className="font-bold">creator content in combination with paid media</span> to help brands build influence with <span className="font-bold">niche audiences at scale</span>.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center border border-gray-700">
                <span className="text-gray-400 text-lg">Interview Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we've built section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Large section header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8 text-right mr-[13rem]">
              WHAT WE'VE BUILT.
            </h2>
            <div className="">
              <p className="text-3xl md:text-4xl leading-tight mb-4 text-white" style={{ textIndent: '15rem' }}>
                In 2025, The Goat Agency represents 650 social and influencer experts in 37 markets worldwide. We are globally recognized for our award-winning work, and credited for helping to shape the influencer industry and spearhead the Human Media Revolution.
              </p>
            </div>
          </div>

          {/* Image and text layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            <div className="space-y-8 text-xl leading-relaxed text-white">
              <p>
                Now, the idea of human media is so much bigger, faster and more complex. Our capabilities have expanded to reflect this and keep our clients at the forefront of what's possible.
              </p>
              <p>
                We were the first influencer marketing agency to run paid media through influencers' own channels. We were the first to use influencer content within Amazon's DSP. We were the first to partner with YouTube on an AI-powered influencer solution. And we're the only truly globally scaled-up influencer marketing agency in the world, with 650 employees all acting as one unified team.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center border border-gray-700">
                <span className="text-gray-400 text-lg">Team Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our mission section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Large section header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8">
              OUR MISSION.
            </h2>
            <div className="">
              <p className="text-3xl md:text-4xl leading-tight text-white" style={{ textIndent: '15rem' }}>
                We no longer see ourselves as "just" an influencer marketing agency. Influencer shouldn't be constrained to one line on a media plan, so our mission is to help brands Influence Everywhere, to continue driving the human media revolution forward, and to empower content creators in all their forms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;