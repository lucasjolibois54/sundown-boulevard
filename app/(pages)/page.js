"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "../components/home/Hero";
import Subhero from "../components/home/Subhero";
import About from "../components/home/About";
import TextLoop from "../components/home/TextLoop";
import ExampleComponent from "../components/cursor-examples/ExampleComponent";
import SecondHero from "../components/home/SecondHero";

export default function Home() {
  const [theme, setTheme] = useState("dark-theme");

  useEffect(() => {
    const handleScroll = () => {
      const aboutElem = document.getElementById("aboutComponent");
      const buffer = 0.5 * window.innerHeight;

      if (aboutElem) {
        const rect = aboutElem.getBoundingClientRect();

        if (rect.top <= window.innerHeight - buffer && rect.bottom >= 0) {
          setTheme("light-theme");
        } else {
          setTheme("dark-theme");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.className = ""; // reset the theme
    };
  }, []);

  useEffect(() => {
    document.body.className = theme; // theme class
    // transition
    document.body.style.transition =
      "background-color 0.3s ease, color 0.3s ease";
  }, [theme]);

  return (
    <>
      <main id="home-page" className="pb-56">
        {/* <Hero /> */}
        <SecondHero />
        {/* <div id="targetComponent" style={{ height: "150vh", zIndex: 0 }} /> */}
      </main>
      <div className="max-w-6xl mx-auto px-6">
        <Subhero />
        <div id="aboutComponent">
          <About />
        </div>
      </div>
      <TextLoop/>
      {/* <ExampleComponent/> */}
    </>
  );
}
