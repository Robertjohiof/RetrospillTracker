"use client";

import Login from "@/app/pages/Login";
import { useState } from "react";
import HeaderSearch from "./HeaderSearch";
import MobileMenu from "../ui/MobileMenu";
import Button from "@/app/shared/components/ui/Button";

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

  function handleLogout() {
    // TODO: byttes ut med ekte logout-logikk
    console.log("Log out clicked from Header");
  }

  return (
    <header className="relative sticky top-0 w-full bg-[#0a0015] px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      {/* VENSTRE: logo */}
      <div className="flex items-center gap-4 basis-1/3 min-w-0">
        <a
          href="/"
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <img
            src="/images/retro80sLogo.png"
            alt="RetroSpillTracker logo"
            className="h-10 w-auto"
          />
          <h1 className="text-glow-pink text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide hidden lg:block">
            RetroSpillTracker
          </h1>
        </a>
      </div>

      {/* MIDTEN: Søk  */}
      <div className="flex justify-center basis-1/3 min-w-0">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
          <HeaderSearch />
        </div>
      </div>

      {/* HØYRE: Navigasjon (desktop) + auth + burger (mobil) */}
      <div className="flex items-center gap-3">
        {/* Navigasjon – kun desktop */}
        <nav className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/search" className="nav-link">
            Browse
          </a>

          {isAuthenticated && (
            <a href="/profilepage/sell-mango" className="nav-link">
              Profile
            </a>
          )}
        </nav>

        {/* Auth-område */}
        {isAuthenticated && mockUser ? (
          <div className="flex items-center justify-end gap-2 sm:gap-3 min-w-0">
            <img
              src="/images/user_logo1.png"
              alt="User avatar"
              className="h-10 w-10 rounded-full border border-white/20 shadow-md object-cover"
            />

            <div className="hidden md:inline-flex">
              <Button
                type="button"
                onClick={handleLogout}
                variant="none"
                size="none"
                className="logout-btn"
              >
                Log out
              </Button>
            </div>
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
