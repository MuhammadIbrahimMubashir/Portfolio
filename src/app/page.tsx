"use client";

import Image from "next/image";
import abc from "../app/image/abc.jpeg";
// Removed unused import of 'name'

import { useState, useEffect, useMemo } from "react";

export default function Portfolio() {
  const [page, setPage] = useState("home");

  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      <title>M.Ibrahim&apos;s Portfolio</title> {/* Escaped apostrophe */}

      {/* Header */}
      <header className="p-4 bg-gray-800 text-white flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image
            src={abc}
            alt="Logo"
            className="h-8 w-8 rounded-full mr-4"
          />
        </div>

        {/* Centered: Navigation buttons */}
        <div className="flex-1 flex justify-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setPage("home")}
            className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Home
          </button>
          <button
            onClick={() => setPage("about")}
            className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => setPage("contact")}
            className="px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 space-y-4 sm:space-y-0">
          {/* Left: Name */}
          <div className="text-xl font-semibold">
            Muhammad Ibrahim Mubashir
          </div>

          {/* Center: Tagline */}
          <div className="text-sm opacity-75">
            <pre>             A Passionate Web Developer</pre>
          </div>

          {/* Right: Copyright */}
          <div className="text-sm opacity-50 text-right">
            &copy; {new Date().getFullYear()} Muhammad Ibrahim Mubashir. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Home() {
  const [text, setText] = useState("");
  
  // UseMemo for phrases to avoid rerendering on every update
  const phrases = useMemo(() => [
    "A Passionate Developer",
    "A Creative Thinker",
    "Turning Ideas into Reality",
    "Always Learning",
    "Dreaming Big",
    "Achieving Goals",
  ], []);

  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(200);

  useEffect(() => {
    const typeEffect = setTimeout(() => {
      const currentPhrase = phrases[index];

      if (!isDeleting) {
        // Typing Effect
        setText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentPhrase.length) {
          setIsDeleting(true);
          setSpeed(1200); // Pause before deleting
        }
      } else {
        // Deleting Effect
        setText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % phrases.length);
          setSpeed(200); // Reset speed
        }
      }
    }, isDeleting ? 120 : speed);

    return () => clearTimeout(typeEffect);
  }, [text, charIndex, isDeleting, speed, index, phrases]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 min-h-screen">
      <div className="mb-2 px-6 py-10 justify-center">
        {/* Image Section */}
        <Image
          src={abc}
          alt="M. Ibrahim Mubashir"
          width={350} // Adjust the size as needed
          height={350} // Adjust the size as needed
          className="rounded-3xl mx-auto shadow-xl"
        />
      </div>

      <h1 className="sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold mb-10 flex flex-col justify-center items-center">
        Welcome to M. Ibrahim&apos;s Portfolio {/* Escaped apostrophe */}
      </h1>

      <p
        className="text-2xl font-semibold text-[#F0F8FF] animate-fadeIn mb-8 flex flex-col justify-center items-center"
        style={{
          paddingLeft: "10px",
          letterSpacing: "2px",
          height: "40px", // Fixed height to prevent layout shift
        }}
      >
        {text}
      </p>
    </div>
  );
}

function About() {
  const [fadeIn, setFadeIn] = useState(false);

  // Scroll effect for fade-in
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about-section');

      if (aboutSection && aboutSection.getBoundingClientRect().top < window.innerHeight) {
        setFadeIn(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="p-12 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 text-center min-h-screen">
      <h1 id="about-section" className={`text-4xl text-white font-bold mb-8 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        About Me
      </h1>
      <p className={`text-xl text-white mb-4 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        I am a passionate developer who loves to explore new technologies.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="p-12 bg-gradient-to-br from-teal-500 via-green-400 to-lime-300 min-h-screen">
      <h1 className="text-4xl text-center font-semibold text-white">Contact Me</h1>
      <form className="mt-8 text-center">
        <input type="text" placeholder="Name" className="mb-4 p-3 rounded-md text-gray-900" />
        <input type="email" placeholder="Email" className="mb-4 p-3 rounded-md text-gray-900" />
        <textarea placeholder="Message" className="mb-4 p-3 rounded-md text-gray-900" />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
