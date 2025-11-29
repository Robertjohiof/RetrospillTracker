"use client";

import Login from "@/app/pages/Login";
import { useState } from "react";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "../ui/MobileMenu";

export default function Header() {
  // TODO: Backend kobler dette til ekte auth (f.eks. useAuth())
  const mockUser: { username: string } | null = {
    username: "RetroPlayer", // sett til null for å teste ikke-innlogget
  };

  const isAuthenticated = !!mockUser;

  const [seen, setSeen] = useState(false);

  function togglePop() {
    setSeen((prev) => !prev);
  }

  return (
    <header className="sticky top-0 w-full bg-[#0a0015] px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      {/* VENSTRE: Burger + logo */}
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

      {/* MIDTEN: Navigasjon (desktop) */}
      <nav className="hidden md:flex items-center gap-10 text-base font-semibold flex-1 justify-center">
        <a href="/" className="nav-link">
          Home
        </a>

        <div className="flex justify-center flex-1 max-w-sm">
          <HeaderSearch />
        </div>

        <a href="/search" className="nav-link">
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

      {/* HØYRE: Auth-område */}
      <div className="flex items-center gap-3">
        {isAuthenticated && mockUser ? (
          // ===== INNLOGGET VISNING =====
          <div className="flex items-center gap-3">
            <span className="nav-link text-base">{mockUser.username}</span>
            <button className="btn-secondary text-sm px-3 py-1">Log out</button>
          </div>
        ) : (
          // ===== IKKE INNLOGGET VISNING =====
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
