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
          <Image
            src={name}
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
  
  // Wrap the phrases array with useMemo
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
        Welcome to M. Ibrahim&apos;s Portfolio
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
      <div
        id="about-section"
        className={`transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
        <p className="text-xl text-white mb-10 leading-relaxed max-w-4xl mx-auto">
          Hello! I'm Muhammad Ibrahim Mubashir, a passionate and dedicated web developer with a strong interest in creating innovative and efficient solutions. I enjoy solving complex problems and building user-friendly applications that make a real impact.
          <br />
          <br />
          I specialize in front-end development, with experience in HTML, CSS, JavaScript, and popular frameworks like React and Next.js. I also have knowledge in back-end technologies like Node.js, and I am always learning new skills to stay up-to-date with the latest trends in technology.
          <br />
          <br />
          Whether it's designing seamless user interfaces or optimizing web performance, I strive to deliver high-quality and scalable solutions. I believe in continuous learning and growing as a developer, always challenging myself with new projects and technologies.
          <br />
          <br />
          When I'm not coding, I enjoy problem-solving, reading tech blogs, and exploring new ideas. My goal is to contribute to meaningful projects that help others and improve the digital experience.
        </p>

        <h2 className="text-4xl font-bold text-white mb-8">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Project 1 */}
          <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-indigo-100 duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <span className="text-3xl text-indigo-600 mr-4">📄</span>
              <h3 className="text-2xl font-semibold text-gray-800">My Resume</h3>
            </div>
            <p className="text-lg text-gray-600 mb-6">This is my resume website where you can view and download my latest resume.</p>
            <a href="https://resume-muhammadibrahimmubashirs-projects.vercel.app/" target="_blank" className="text-indigo-600 font-semibold hover:underline">
              View (My Resume)
            </a>
          </div>

          {/* Project 2 */}
          <div className="bg-white p-8 rounded-xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-indigo-100 duration-300 ease-in-out">
            <div className="flex items-center mb-4">
              <span className="text-3xl text-indigo-600 mr-4">⚙️</span>
              <h3 className="text-2xl font-semibold text-gray-800">My Projects</h3>
            </div>
            <p className="text-lg text-gray-600 mb-6">Check out some of the projects I've built, ranging from web applications to personal projects that showcase my development skills.</p>
            <a href="https://muhammadibrahimmubashirprojects.vercel.app/" target="_blank" className="text-indigo-600 font-semibold hover:underline">
              View (Projects)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="bg-gradient-to-br from-teal-500 via-green-400 to-blue-500 text-white text-center p-12 h-screen">
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
      <p className="text-xl mb-10">Feel free to reach out for collaboration, queries, or just a friendly chat!</p>
      <form className="max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 mb-4 rounded-md text-gray-900"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 mb-4 rounded-md text-gray-900"
          rows={4}
        ></textarea>
        <button className="px-6 py-3 bg-indigo-600 rounded-md text-white hover:bg-indigo-700 transition-all duration-300">
          Send Message
        </button>
      </form>
    </div>
  );
}
