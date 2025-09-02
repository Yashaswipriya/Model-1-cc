"use client";
import Aurora from "../components/Aurora";
import Hero from "../components/Hero";

export default function Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
          blend={0.3}
          amplitude={2.0}
          speed={1.0}
        />
      </div>

      {/* Hero text */}
      <Hero  />
    </div>
  );
}






