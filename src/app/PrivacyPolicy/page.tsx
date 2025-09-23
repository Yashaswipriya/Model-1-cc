"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="relative bg-black text-white px-6 py-12 2xl:py-20 mx-auto">
      {/* Logo top-left */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 invert fill">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
          />
        </Link>
      </div>

      {/* Main heading */}
      <h1 className="text-4xl 2xl:text-5xl font-bold mb-6 text-pink-500 mt-24 pt-4">
        Privacy Policy - Illuminora
      </h1>

      <p className="mb-8 text-gray-300">
        <strong>Effective Date:</strong> [Insert Date]
      </p>

      <p className="mb-8 text-gray-300">
        At <strong>Illuminora</strong> (“we,” “our,” “us”), your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website and services. It applies globally, including compliance with Indian IT rules, GDPR (EU), and CCPA (California, US).
      </p>

      {/* Sections */}
      {[
        {
          title: "1. Information We Collect",
          color: "text-purple-400",
          content: (
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li><strong>Personal Information:</strong> Name, email, phone, company details (when you contact us or request services).</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device, cookies, analytics.</li>
              <li><strong>Project/Client Data:</strong> Any files, media, or access shared with us for marketing, advertising, or development.</li>
            </ul>
          ),
        },
        {
          title: "2. How We Use Your Information",
          color: "text-purple-400",
          content: (
            <>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Deliver our services (web design, branding, marketing, ads, analytics).</li>
                <li>Respond to inquiries, proposals, and support requests.</li>
                <li>Improve website functionality and user experience.</li>
                <li>Conduct analytics, campaign optimization, and reporting.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
              <p className="mt-2 text-gray-400">We do not sell your personal information.</p>
            </>
          ),
        },
        {
          title: "3. Legal Basis (For EU Clients – GDPR)",
          color: "text-purple-400",
          content: (
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Your consent (e.g., subscribing to newsletters).</li>
              <li>To perform a contract (delivering services you requested).</li>
              <li>To comply with legal obligations.</li>
              <li>For our legitimate interests (analytics, marketing, service improvement).</li>
            </ul>
          ),
        },
        {
          title: "4. Data Sharing",
          color: "text-purple-400",
          content: (
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Trusted third-party providers (hosting, analytics, advertising platforms such as Google, Meta, etc.) necessary for service delivery.</li>
              <li>Legal authorities if required by law.</li>
              <li>All client data shared for campaigns or projects remains confidential.</li>
            </ul>
          ),
        },
        {
          title: "5. Cookies & Tracking",
          color: "text-purple-400",
          content: (
            <>
              <p className="text-gray-300 mb-2">
                Our website uses cookies, pixels, and tracking tools (Google Analytics, Meta Pixel) to measure performance and improve user experience.
              </p>
              <p className="text-gray-300 mb-2">
                EU users will see a cookie consent banner in compliance with GDPR.
              </p>
              <p className="text-gray-300">
                You may disable cookies anytime in your browser.
              </p>
            </>
          ),
        },
        {
          title: "6. Your Rights",
          color: "text-purple-400",
          content: (
            <>
              <h3 className="text-xl font-semibold mb-2 text-pink-400">Under GDPR (EU):</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access, update, or delete your personal data.</li>
                <li>Request data portability.</li>
                <li>Restrict or object to processing.</li>
                <li>Withdraw consent at any time.</li>
                <li>File a complaint with your local data protection authority.</li>
              </ul>
              <h3 className="text-xl font-semibold mt-4 mb-2 text-pink-400">Under CCPA (California, US):</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Know what personal data we collect and how it’s used.</li>
                <li>Request deletion of personal data.</li>
                <li>Opt-out of sale of personal data (we do not sell personal data).</li>
                <li>Non-discrimination for exercising privacy rights.</li>
              </ul>
              <p className="mt-2 text-gray-400">
                To exercise these rights, contact us at [Insert Contact Email].
              </p>
            </>
          ),
        },
        {
          title: "7. Data Security",
          color: "text-purple-400",
          content: <p className="text-gray-300">We use appropriate technical and organizational measures to protect your data. However, no transmission online is 100% secure.</p>,
        },
        {
          title: "8. Data Retention",
          color: "text-purple-400",
          content: <p className="text-gray-300">We retain personal information only as long as necessary to fulfill the purpose it was collected for, or as required by law.</p>,
        },
        {
          title: "9. International Data Transfers",
          color: "text-purple-400",
          content: <p className="text-gray-300">If you are located outside India, your information may be transferred and stored in India or other countries. By using our services, you consent to such transfers.</p>,
        },
        {
          title: "10. Third-Party Links",
          color: "text-purple-400",
          content: <p className="text-gray-300">Our website may include links to external sites. We are not responsible for their privacy practices.</p>,
        },
        {
          title: "11. Updates to This Policy",
          color: "text-purple-400",
          content: <p className="text-gray-300">We may update this Privacy Policy periodically. Updates will be posted here with a revised “Effective Date.”</p>,
        },
      ].map((section, idx) => (
        <section key={idx} className="mb-8">
          <h2 className={`text-2xl 2xl:text-3xl font-semibold mb-4 ${section.color}`}>{section.title}</h2>
          {section.content}
        </section>
      ))}

      {/* Footer */}
      <Footer />
    </div>
  );
}
