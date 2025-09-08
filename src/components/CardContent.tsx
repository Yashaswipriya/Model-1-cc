"use client";
import { Button } from "@/components/ui/button";

interface CardContentProps {
  imgSrc?: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  tags?: string[];
  description?: string;
}

export default function CardContent({
  imgSrc,
  videoSrc,
  title,
  subtitle,
  tags = [],
  description,
}: CardContentProps) {
  return (
    <div className="bg-white h-full rounded-4xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-12">
      {/* Left Side */}
      <div className="flex-1 min-h-0 space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
          {title}
        </h2>

        {subtitle && <p className="text-gray-600 text-sm md:text-base lg:text-lg">{subtitle}</p>}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm md:text-md font-medium hover:bg-black hover:text-white transition"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {description && <p className="text-gray-700 max-w-full md:max-w-md text-sm md:text-base lg:text-lg">{description}</p>}

        <Button className="rounded-full bg-black text-white hover:bg-pink-600 px-6 py-3 text-sm md:text-base">
          Find out more →
        </Button>
      </div>

      {/* Right Side (Responsive Media) */}
      {(videoSrc || imgSrc) && (
        <div className="flex-shrink-0 w-full md:w-[45%] lg:w-[50%] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[700px] flex justify-center items-center">
          <div className="rounded-tr-[4rem] rounded-bl-none rounded-br-none rounded-tl-none overflow-hidden shadow-2xl w-full h-full">
            {videoSrc ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <img
                src={imgSrc!}
                alt="Card Visual"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
