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
    company: "",
    budget: "",
    message: "",
    attachments: null as FileList | null,
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
 <div className="absolute top-10 left-2 invert fill">
  <Link href="/">
    <Image
      src="/Logo.png" // <-- place logo.png inside /public folder
      alt="Logo"
      width={200}
      height={200}
      className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
    />
  </Link>
</div>
  <div className="max-w-lg lg:max-w-xl flex flex-col justify-center h-full">
    <h1 className="whitespace-nowrap text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-tight">
      Let's get your project started
    </h1>
    <p className="mt-6 text-lg max-w-xl">
      Tell us about your project idea, budget, and goals. We'll get back to you with how we can help.
      
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

    {/* Row 2: Budget + Attachments */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Budget */}
  <div>
    <label className="block mb-2 text-sm font-medium">Budget (£)</label>
    <input
      type="text"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      className="w-full bg-transparent border-b border-white py-2 outline-none"
    />
    <p className="mt-2 text-xs text-gray-300">
      More info on minimum/typical budget sizes can be found{" "}
      <a href="#" className="underline">
        here
      </a>.
    </p>
  </div>

  {/* Attachments */}
  <div>
    <label className="block mb-2 text-sm font-medium flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 10-5.657-5.657L6.343 10.172a6 6 0 108.485 8.485L20.657 12"
        />
      </svg>
      Attachments
    </label>
    <input
      type="file"
      name="attachments"
      multiple
      onChange={(e) =>
        setFormData({ ...formData, attachments: e.target.files })
      }
      className="w-full bg-transparent border-b border-white py-2 outline-none file:hidden"
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
        <input type="radio" name="consent" className="w-5 h-5" />
        <span>I'm happy to receive a monthly newsletter from Illuminora</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="radio" name="consent" className="w-5 h-5" />
        <span>
          I understand that Illumiora will securely hold my data in accordance with their privacy policy.
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