"use client";
import Aurora from "../../components/Aurora";
import Footer from "@/components/Footer";

import { useState } from "react";

export default function HireUsPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, selectedProject });
  };

  return (
    <main className="w-full min-h-screen bg-black text-white relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Aurora
          colorStops={["#978ff3", "#FF94B4", "#6cc7f9"]}
          blend={0.3}
          amplitude={2.0}
          speed={1.0}
        />
      </div>

      {/* Hero Section */}
<section className="relative z-10 py-20 px-4 lg:px-16 flex flex-col lg:flex-row justify-between min-h-screen items-center">
  {/* Left Side: Heading + Paragraph */}
  <div className="max-w-lg lg:max-w-xl flex flex-col justify-center h-full">
    <h1 className="text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-tight">
      Let's get your<br />project started
    </h1>
    <p className="mt-6 text-lg max-w-xl">
      Tell us about your project idea, budget, and goals. We'll get back to
      you with how we can help.
    </p>
  </div>

  {/* Right Side: Contact Details */}
  <div className="mt-8 lg:mt-0 flex flex-col justify-center text-3xl 2xl:text-5xl gap-4 h-full">
    <p className="text-gray-500">New Buisness?</p>
    <p>+44 (0)20 7112 8880</p>
    <p>
      {" "}
      <a
        href="mailto:hello@kota.co.uk"
        className="underline hover:text-pink-400 transition"
      >
        hello@kota.co.uk
      </a>
    </p>
    <p className="text-lg mt-4">
      Have a quick question you need answering?<br /> Check-Out:{" "}
      <a href="/#faq" className="underline hover:text-pink-400 transition">
        FAQ's
      </a>
    </p>
  </div>
</section>


{/* Pills Section */}
<section className="relative z-10 py-10 px-6 lg:px-16">
  <h2 className="text-2xl font-semibold mb-6">What do you need?</h2>
  <div className="flex flex-wrap gap-3">
    {["Website", "Branding", "Marketing", "Content Creation", "Paid Ads", "E-commerce", "Social Media"].map((option) => (
      <button
        key={option}
        onClick={() => setSelectedProject(option)}
        className={`px-6 py-3 rounded-full border transition-colors cursor-pointer ${
          selectedProject === option
            ? "bg-white text-black"
            : "border-white text-white hover:bg-white hover:text-black"
        }`}
      >
        {option}
      </button>
    ))}
  </div>
</section>


      {/* Form Section */}
      <section className="relative z-10 py-20 px-6 lg:px-16">
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
          />
          <input
            type="text"
            name="budget"
            placeholder="Your Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
          />
          <textarea
            name="message"
            placeholder="Tell us about your project"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-200 transition"
          >
            Send Request
          </button>
        </form>
      </section>
      <section className="relative z-10">
      <Footer/>
      </section>
    </main>
  );
}