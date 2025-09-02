"use client";
import Aurora from "../components/Aurora";

export default function Page() {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Aurora
        colorStops={["#8e84fa", "#FF94B4", "#71cafe"]}
        blend={1.0}
        amplitude={1.0}
        speed={1.0}
        />
    </div>
  );
}



