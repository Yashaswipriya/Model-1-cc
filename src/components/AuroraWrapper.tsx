// AuroraWrapper.tsx
"use client";
import Aurora from "./Aurora";

export default function AuroraWrapper() {
  return (
    <div className="absolute inset-0 -z-10">
      <Aurora
        colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
        blend={0.3}
        amplitude={2.0}
        speed={1.0}
      />
    </div>
  );
}
