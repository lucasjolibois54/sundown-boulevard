'use client'

import React from "react";
import Link from "next/link";

import { useCursor } from '@/cursor/CursorContext';

export default function About() {
  const { setCursorText, setCursorVariant } = useCursor();

  return (
    <>
      <div className="pt-28 sm:pt-20 flex flex-col w-full lg:flex-row mb-4">
        {/* Max width container, center aligned, with some padding */}
        <div className="max-w-6xl mx-auto lg:px-0 sm:px-6 sm:py-8">
          {/* <!-- Grid columns + some font styles for the children elements to inherit --> */}
          <div className="font-medium leading-7 space-y-2 sm:grid md:grid-cols-2 grid-rows-2 lg:grid-cols-2 sm:gap-4 sm:space-y-0">
            {/* <!-- Grid cell #1 --> */}
            <div className="py-3 pt-20 sm:pt-5 sm:p-5 float-left rounded">
              <img
                className="w-screen md:w-full  xl:w-6/6 sm:float-left mb-5 sm:mb-0"
                src={
                  "https://res.cloudinary.com/debkwdctz/image/upload/v1692702894/image_101_q1dkdg.png"
                }
                alt="Restaurant Image"
              />
            </div>

            {/* <!-- Grid cell #2 --> */}
            <div className=" py-3 sm:px-6 md-lg:ml-0 xl:ml-0 md-lg:mt-10 xl:mt-10 rounded">
              <h1 className=" sm:!leading-tight pt-4 sm:mt-5 text-6xl xsm:text-5xl sm:text-6xl md-lg:text-5xl lg:text-6xl font- stroke-title">
              Where Culinary Artistry Meets Timeless Tradition
              </h1>
              <p className="text-base md:text-lg text-dark-text py-5 lg:px-24 lg:pl-0 lg:pr-20 max-w-2xl font-light mt-2">
              At LeFaim, we blend the charm of timeless traditions with the innovation of modern culinary artistry. Our dishes, crafted with passion and precision, speak to the heart of gourmet dining. Every ingredient is handpicked, ensuring that our guests savor nothing but the best. Experience a symphony of flavors, textures, and aromas with every visit. Ready for a gastronomic journey? Order now and let your palate be the judge.
              </p>

              <div className="absolute  mt-0">
                <div className="flex sm:justify-center mt-5 gap-3">
                  {/* <Link 
                          className="contact"
                           href="/order">
                    <div className="cursor-pointer bg-main-color inline-block transition-all duration-300 hover:text-white hover:border-white hover:bg-dark-bg text-bg-dark-bg border border-cat-text py-2 px-5 rounded-full">
                      <span className="flex">
                        <span className="mx-0.5">Order Now!</span>
                      </span>
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
            class="hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-800 border-2 hover:BORDER-bgColorDark rounded-lg group"
          >
            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative">Order Now!</span>
          </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex py-5 px-10 max-w-6xl mx-auto items-center">
        {/* <div className="hidden md:flex-grow border-t h-6 border-gray-400"></div> */}
      </div>
    </>
  );
}
