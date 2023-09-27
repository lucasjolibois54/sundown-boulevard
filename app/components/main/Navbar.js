"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/cursor/CursorContext";

import Image from "next/image";

import Logo from "./full-logo.svg";

function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const { setCursorText, setCursorVariant } = useCursor();
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = document.documentElement.scrollTop;
      const threshold = 5; // The threshold value

      if (currentScrollPos > scrollPos + threshold) {
        // Scrolling down past the threshold, hide the navigation bar
        setShowNav(false);
      } else if (currentScrollPos < scrollPos - threshold) {
        // Scrolling up past the threshold, show the navigation bar
        setShowNav(true);
      }

      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPos]);

  const navVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3,
      },
      /* visible: {
            y: '0%',
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeInOut',
            },*/
    },
  };

  return (
    <>
      <motion.div
        className={`navbar ${showNav ? "navbar--show" : "navbar--hide"}`}
        variants={navVariants}
        initial="hidden"
        animate={showNav ? "visible" : "hidden"}
      >
        <div className="bg-dark-bg  border-b border-gray-800">
          <header className=" max-w-6xl mx-auto pt-5 pb-5 ">
            <nav
              className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-2xl md:text-lg text-main-text
        "
            >
              <div>
                <Link href="/">
                  <Image src={Logo} alt="Logo" />
                </Link>
              </div>
              <div className="md:hidden md:p-4 mt-0 mr-1 py-0 block cursor-pointer">
                <Link href="/order">
                  <div className="bg-cat-btn text-sm inline-block transition-all duration-500 hover:text-white hover:border-white hover:bg-dark-bg text-cat-text border border-cat-text py-2 px-5 rounded-full">
                    <span className="flex">Order Now!</span>
                  </div>
                </Link>
              </div>

              <div
                className="hidden w-full md:flex md:items-center md:w-auto"
                id="menu"
              >
                <ul
                  className="
                py-4
                md:py-0
              text-base text-main-text
              md:flex
              md:justify-between"
                >
                  <li>
                    <Link href="/">
                      <p className="md:p-4 py-2 block hover:text-blue-hover cursor-pointer">
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#about">
                      <p className="md:p-4 py-2 block hover:text-blue-hover cursor-pointer">
                        About
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search">
                      <p className="md:p-4 py-2 block hover:text-blue-hover cursor-pointer">
                        Search
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/order">
                      <p className="md:p-4 py-2 block hover:text-blue-hover cursor-pointer">
                        Products
                      </p>
                    </Link>
                  </li>

                  <li className="pl-2 ml-2 py-2">
                    {/* <Link href="/contact">
                      <div className="bg-main-color text-dark-bg py-2 px-5 rounded-full flex">
                        <span className="mr-6">Let&apos;s Talk!</span>
                        <img
                          className="h-6"
                          alt="message-icon"
                          src="https://res.cloudinary.com/debkwdctz/image/upload/v1692688849/mail_owk7er.png"
                        />
                      </div>
                    </Link> */}
                    <Link
                      onMouseEnter={() => {
                        setCursorText("");
                        setCursorVariant("time");
                      }}
                      onMouseLeave={() => {
                        setCursorText("");
                        setCursorVariant("default");
                      }}
                      href="/order"
                      className="hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-800 border-2 hover:BORDER-bgColorDark rounded-lg group"
                    >
                      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
                      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                      <span className="relative">Order Now!</span>
                    </Link>
                  </li>
                </ul>
                <button onClick={showModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    fill="currentColor"
                    className="bi bi-cart2 ml-4 hover:scale-110"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </button>
              </div>
            </nav>
          </header>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
