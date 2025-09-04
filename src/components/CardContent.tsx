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
    <div className="bg-white h-full rounded-3xl shadow-lg overflow-hidden p-8 flex flex-col md:flex-row items-center gap-8">
      {/* Left Side */}
      <div className="flex-1 min-h-0 space-y-4">
        <h2 className="text-3xl md:text-7xl font-bold leading-tight text-gray-900 ">
          {title}
        </h2>

        <p className="text-gray-600">{subtitle}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-3 bg-gray-100 rounded-full text-md font-medium hover:bg-black hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-700 max-w-md">{description}</p>

        <Button variant="outline" className="rounded-full bg-black text-white hover:bg-pink-600">
          Find out more →
        </Button>
      </div>

      {/* Right Side (Fixed Size) */}
      {(videoSrc || imgSrc) && (
        <div className="shrink-0 w-[550px] h-[450px] max-w-full flex justify-center items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl w-full h-full">
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
