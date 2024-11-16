"use client";

import Image from "next/image";
import abc from "../app/image/abc.jpeg";
import name from "../app/image/name.png";
import { useState, useEffect, useMemo } from "react";

export default function Portfolio() {
  const [page, setPage] = useState("home");

  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      <title>M.Ibrahim Portfolio</title>

      {/* Header */}
      <header className="p-4 bg-gray-800 text-white flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Image src={name} alt="Logo" className="h-8 w-8 rounded-full mr-4" />
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
            <pre> A Passionate Web Developer</pre>
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
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(200);

  const phrases = useMemo(() => [
    "A Passionate Developer",
    "A Creative Thinker",
    "Turning Ideas into Reality",
    "Always Learning",
    "Dreaming Big",
    "Achieving Goals",
  ], []);

  useEffect(() => {
    const typeEffect = setTimeout(() => {
      const currentPhrase = phrases[index];

      if (!isDeleting) {
        setText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentPhrase.length) {
          setIsDeleting(true);
          setSpeed(1200); // Pause before deleting
        }
      } else {
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
        <Image
          src={abc}
          alt="M. Ibrahim Mubashir"
          width={350}
          height={350}
          className="rounded-3xl mx-auto shadow-xl"
        />
      </div>

      <h1 className="sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-extrabold mb-10 flex flex-col justify-center items-center">
        Welcome to M. Ibrahim&apos;s Portfolio
      </h1>

      <p
        className="text-2xl font-semibold text-[#F0F8FF] animate-fadeIn mb-8 flex flex-col justify-center items-center"
        style={{
          paddingLeft: "10px",
          letterSpacing: "2px",
          height: "40px", 
        }}
      >
        {text}
      </p>
    </div>
  );
}

function About() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about-section");

      if (aboutSection && aboutSection.getBoundingClientRect().top < window.innerHeight) {
        setFadeIn(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-12 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 text-center min-h-screen">
      <div
        id="about-section"
        className={`transition-all duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}
      >
        <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
        <p className="text-xl text-white mb-10 leading-relaxed max-w-4xl mx-auto">
          Hello! I&apos;m Muhammad Ibrahim Mubashir, a passionate and dedicated web developer with a strong interest in creating innovative and efficient solutions. I enjoy solving complex problems and building user-friendly applications that make a real impact.
          <br />
          <br />
          I specialize in front-end development with a focus on React.js, HTML, CSS, and JavaScript. I am also proficient in back-end technologies like Node.js and Express.js, and I have experience with databases such as MongoDB and MySQL.
          <br />
          <br />
          My goal is to continue growing as a developer, learning new technologies, and contributing to meaningful projects.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-indigo-700"
          >
            View My Resume
          </a>
          <a
            href="https://muhammadibrahimmubashirprojects.vercel.app/"
            target="_blank"
            className="text-indigo-600 font-semibold hover:underline"
          >
            View Projects
          </a>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 text-center min-h-screen p-12">
      <h2 className="text-4xl font-bold text-white mb-6">Contact Me</h2>
      <p className="text-xl text-white mb-10 max-w-4xl mx-auto">
        Feel free to reach out to me via email at
        <span className="text-indigo-300"> example@mail.com</span>
      </p>
    </div>
  );
}
