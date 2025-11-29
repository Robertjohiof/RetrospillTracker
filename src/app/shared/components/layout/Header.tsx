"use client";

import Login from "@/app/pages/Login";
import { useState } from "react";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "../ui/MobileMenu";

export default function Header() {
  // Temp placeholder
  const isAuthenticated = false;
  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen((prev) => !prev);
  }

  return (
    <header className="sticky top-0 w-full bg-[#0a0015] px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      {/* Logo + Title */}
      <a
        href="/"
        className="flex items-center gap-2 hover:opacity-90 transition"
      >
        <img
          src="/images/retro80sLogo.png"
          alt="RetroSpillTracker logo"
          className="h-10 w-auto"
        />
        <h1 className="text-glow-pink text-xl font-bold hidden sm:block tracking-wide">
          RetroSpillTracker
        </h1>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10 text-base font-semibold flex-1 justify-center">
        <a
          href="/"
          className="nav-link text-orange-500 hover:text-pink-400 transition"
        >
          Home
        </a>

        <div className="flex justify-center flex-1 max-w-sm">
          <HeaderSearch />
        </div>

        <a
          href="/search"
          className="nav-link text-orange-500 hover:text-pink-400 transition"
        >
          Browse
        </a>

        <a
          href="/forum"
          className="nav-link text-orange-500 hover:text-pink-400 transition"
        >
          Forum
        </a>

        {isAuthenticated && (
          <a
            href="/profile"
            className="nav-link text-orange-500 hover:text-pink-400 transition"
          >
            Profile
          </a>
        )}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Mobile Burger Menu */}
        <MobileMenu isAuthenticated={isAuthenticated} />

        {/* Login / Sign Up */}
        <button
          onClick={togglePop}
          className="nav-link font-medium text-sm sm:text-base"
        >
          Login
        </button>
        {seen && <Login toggle={togglePop} />}

        <span className="text-glow-orange text-xl sm:text-2xl -mx-1 hidden xs:inline">
          /
        </span>

        <a href="/signup" className="btn-glow text-sm sm:text-lg">
          Sign up
        </a>
      </div>
    </header>
  );
}
