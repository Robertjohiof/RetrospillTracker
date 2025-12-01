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
      {/* VENSTRE: logo */}
      <div className="flex items-center gap-4">
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

      {/* MIDTEN: Søk – alltid i midten */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-md md:max-w-xl">
          <HeaderSearch />
        </div>
      </div>

      {/* HØYRE: Navigasjon (desktop) + auth + burger (mobil) */}
      <div className="flex items-center gap-3">
        {/* Navigasjon – kun desktop */}
        <nav className="hidden md:flex items-center gap-10 text-base font-semibold">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/search" className="nav-link">
            Browse
          </a>
          <a href="/forum" className="nav-link">
            Forum
          </a>
          {isAuthenticated && (
            <a href="/profilepage/sell-mango" className="nav-link">
              Profile
            </a>
          )}
        </nav>

        {/* Auth-område */}
        {isAuthenticated && mockUser ? (
          // ===== INNLOGGET VISNING =====
          <div className="flex items-center gap-3">
            <img
              src="/images/user_logo1.png" // ← bruker logo
              alt="User avatar"
              className="h-8 w-8 rounded-full border border-white/20 shadow-md object-cover"
            />
            <button className="btn-secondary text-sm px-3 py-1 hidden md:inline-flex">
              Log out
            </button>
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

        {/* Burger-meny – nå helt til høyre (mobil) */}
        <MobileMenu isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
