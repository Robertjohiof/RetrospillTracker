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
    <header className="sticky top-0 w-full bg-[#0a0015] px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      {/* LEFT: Burger + Logo */}
      <div className="flex items-center gap-4">
        <MobileMenu isAuthenticated={isAuthenticated} />

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
      </div>

      {/* CENTER: Navigation (Desktop only) */}
      <nav className="hidden md:flex items-center gap-10 text-base font-semibold flex-1 justify-center">
        <a href="/" className="nav-link">
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
        <a href="/forum" className="nav-link">
          Forum
        </a>

        {isAuthenticated && (
          <a href="/profile" className="nav-link">
            Profile
          </a>
        )}
      </nav>

      {/* RIGHT: Auth buttons */}
      <div className="flex gap-4">
        <button onClick={togglePop} className="nav-link font-medium">
          Login
        </button>
        {seen && <Login toggle={togglePop} />}

        <span className="text-glow-orange text-2xl -mx-1">/</span>

        <a href="/signup" className="btn-glow text-lg">
          Sign up
        </a>
      </div>
    </header>
  );
}
