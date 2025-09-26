"use client";

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
    <div
      className="
        bg-white h-[80vh] sm:h-full mt-10 sm:mt-0 rounded-4xl overflow-hidden p-3 sm:p-6 md:p-8 
        flex flex-col md:flex-row items-center gap-6 md:gap-12
        w-[90vw] 2xl:w-[90vw] 3xl:w-[90vw] 4xl:w-[90vw]
        max-w-[1400px] 2xl:max-w-none 3xl:max-w-none 4xl:max-w-none
        mx-auto
      "
    >
      {/* Left Side */}
      <div className="flex-1 min-h-0 space-y-4 2xl:space-y-6 3xl:space-y-8 4xl:space-y-20">
        <h2
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
            2xl:text-8xl 3xl:text-[9rem] 4xl:text-[10rem]
            font-bold leading-tight text-gray-900
          "
        >
          {title}
        </h2>

        {subtitle && (
          <p className="text-gray-600 text-sm md:text-base lg:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">
            {subtitle}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 2xl:gap-3 3xl:gap-4 4xl:gap-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 rounded-full text-xs sm:text-sm md:text-md 
                  2xl:text-lg 3xl:text-xl 4xl:text-2xl
                  font-medium hover:bg-black hover:text-white transition
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p
            className="
              text-gray-700 max-w-full md:max-w-md text-sm md:text-base lg:text-lg
              2xl:text-xl 3xl:text-3xl 4xl:text-5xl
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Right Side (Responsive Media) */}
      {(videoSrc || imgSrc) && (
        <div
          className="
            flex-shrink-0 w-full md:w-[45%] lg:w-[50%] 
            h-[500px] sm:h-[300px] md:h-[400px] md:h-[400px] lg:h-[500px] xl:h-[700px] 
            2xl:h-[600px] 3xl:h-[1000px] 4xl:h-[2000px]
            flex justify-center items-center
          "
        >
          <div className="rounded-tr-[4rem] rounded-bl-none rounded-br-none rounded-tl-none overflow-hidden shadow-2xl w-full h-full">
            {videoSrc ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
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

