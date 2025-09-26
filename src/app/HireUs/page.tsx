"use client";
import Aurora from "../../components/Aurora";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HireUsPage() {
  const [selectedProject, setSelectedProject] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName:"",
    email: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setConsent(false);
  e.preventDefault();

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, selectedProject }),
    });

    if (res.ok) {
      alert("Your query has been sent!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setSelectedProject("");
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <main className="dark-section w-full min-h-screen bg-black text-white relative">
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
 <div className="absolute top-8 left-4 invert fill">
  <Link href="/">
    <Image
      src="/Logo.png"
      alt="Logo"
      width={120}
      height={120}
      className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer w-30 sm:w-28 md:w-40 lg:w-48"
    />
  </Link>
</div>

<div className="max-w-md sm:max-w-xl lg:max-w-xl flex flex-col justify-center h-full px-4 sm:px-6 lg:px-0 pt-20 sm:pt-0">
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-tight">
    Let's get your project started
  </h1>
  <p className="mt-4 sm:mt-6 text-base sm:text-lg max-w-md sm:max-w-lg">
    Tell us about your project idea, budget, and goals. We'll get back to you with how we can help.
  </p>
</div>


  {/* Right Side: Contact Details */}
  <div className="mt-8 lg:mt-0 flex flex-col justify-center text-3xl 2xl:text-5xl gap-4 h-full mb-30 sm:mb-0">
    <p className="text-gray-500">New Business?</p>
    <p>+91-9310674298</p>
    <p>
      {" "}
      <a
        href="mailto:hello@illuminora.co.in"
        className="underline hover:text-pink-400 transition"
      >
        hello@illuminora.co.in
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
<section className="relative z-10 py-2 px-6 lg:px-16 -mt-30 2xl:-mt-50">
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
  <form onSubmit={handleSubmit} className="w-full max-w-screen-3xl mx-auto space-y-10 px-4 lg:px-16">
    {/* Row 1: First, Last, Email */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <label className="block mb-2 text-sm font-medium">First name*</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white py-2 outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Last name*</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white py-2 outline-none"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium">Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white py-2 outline-none"
        />
      </div>
    </div>


    {/* Message */}
    <div>
      <label className="block mb-2 text-sm font-medium">Message</label>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full bg-transparent border-b border-white py-2 outline-none"
      />
    </div>

    {/* Radio Options */}
    <div className="space-y-4">
      <label className="flex items-center gap-3">
        <input type="radio" 
        name="consent" 
        className="w-5 h-5" 
        checked={consent} 
        onChange={() => setConsent(!consent)} 
        required
        />
        <span>
          I understand that Illumiora will securely hold my data in accordance with their privacy policy*.
        </span>
      </label>
    </div>

    {/* Submit Button */}
    <div className="flex justify-end">
      <button
        type="submit"
        className="group bg-white text-black flex items-center px-10 py-3 rounded-full text-md font-medium shadow-lg transition"
      >
        Submit
        <ArrowRight
              className="ml-4 transform transition-transform duration-300 group-hover:translate-x-1"
              size={25}
            />
      </button>
    </div>
  </form>
</section>

      <section className="relative z-10">
      <Footer/>
      </section>
    </main>
  );
}