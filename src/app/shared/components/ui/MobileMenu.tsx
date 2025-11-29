"use client";

import { useState } from "react";
import HeaderSearch from "../layout/HeaderSearch";

interface MobileMenuProps {
  isAuthenticated: boolean;
}

export default function MobileMenu({ isAuthenticated }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      {/* Burger icon */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="burger-icon flex flex-col justify-center gap-1 p-2"
        aria-label="Open navigation menu"
      >
        <span className="h-0.5 w-6 rounded-full bg-current" />
        <span className="h-0.5 w-6 rounded-full bg-current" />
        <span className="h-0.5 w-6 rounded-full bg-current" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#0a0015] border border-white/10 shadow-lg z-30">
          <nav className="flex flex-col gap-3 p-4 text-base font-semibold">
            {/* Search inside the menu */}
            <div className="my-1">
              <HeaderSearch />
            </div>

            <a
              href="/"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </a>

            {/* Search/browse page */}
            <a
              href="/search"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Browse
            </a>

            {/* forum page */}
            <a
              href="/forum"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Forum
            </a>

            {/* profile page */}
            {isAuthenticated && (
              <a
                href="/profile"
                className="nav-link text-orange-500 hover:text-pink-400 transition"
                onClick={() => setOpen(false)}
              >
                Profile
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
