"use client";

import Login from "@/app/pages/Login";
import { useState } from "react";

export default function Header() {
  // Temp placeholder
  const isAuthenticated = false;
  const [seen, setSeen] = useState<any>(false)

  function togglePop() {
    setSeen(!seen)
  }

  return (
    <header className="sticky top-0 w-full bg-[#0a0015] px-8 py-4 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      <a
        href="/"
        className="flex items-center gap-2 hover:opacity-90 transition"
      >
        <img
          src="/images/retro80sLogo.png"
          alt="RetroSpillTracker logo"
          className="h-10 w-auto"
        />
        <h1 className="text-glow-pink text-lg font-bold hidden sm:block">
          RetroSpillTracker
        </h1>
      </a>

      <nav className="hidden md:flex gap-8 text-sm font-semibold">
        <a href="/" className="nav-link">
          Home
        </a>
        <a href="/search" className="nav-link">
          Search
        </a>
        <a href="/browse" className="nav-link">
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

      <div className="flex gap-4">
        {/* <a href="/login" onClick={togglePop} className="nav-link font-medium">
          Log in
          {seen ? <Login toggle={togglePop} /> : null}
        </a> */}
        <button onClick={togglePop} className="nav-link font-medium">
          Log in
        </button>
        {seen && <Login toggle={togglePop} />}
        {/* <a href="/signup" className="btn-glow">
          Sign up
        </a> */}
      </div>
    </header>
  );
}
