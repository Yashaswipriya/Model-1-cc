"use client";

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
    <main className="w-full min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-16">
        <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
          Start Your Project
        </h1>
        <p className="mt-6 text-lg max-w-xl">
          Tell us about your project idea, budget, and goals. We’ll get back to
          you with how we can help.
        </p>
        <div className="mt-8 text-lg">
          <p>📞 +44 (0)20 7112 8880</p>
          <p>📧 hello@kota.co.uk</p>
        </div>
      </section>

      {/* Pills Section */}
      <section className="py-10 px-6 lg:px-16">
        <h2 className="text-2xl font-semibold mb-6">What do you need?</h2>
        <div className="flex flex-wrap gap-3">
          {["Website", "Branding", "Marketing", "Other"].map((option) => (
            <button
              key={option}
              onClick={() => setSelectedProject(option)}
              className={`px-6 py-3 rounded-full border transition-colors ${
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
      <section className="py-20 px-6 lg:px-16">
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 bg-transparent border-b border-white outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
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
    </main>
  );
}
