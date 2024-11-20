"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Utility to merge Tailwind classes, provided by Shadcn.
import CommonMainNavigation from "./CommonMainNavigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleDrawer}
        className="block lg:hidden p-2 rounded-md border border-gray-300 bg-white shadow-sm dark:bg-blue-950 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="sr-only">Open Menu</span>
        {/* Icon: Hamburger */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          onClick={toggleDrawer}
          className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
        >
          <span className="sr-only">Close Menu</span>
          {/* Icon: Close */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Navigation */}
        <nav className="mt-16 px-4 lg:hidden">
          <CommonMainNavigation />
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </>
  );
}
