"use client";

import { useState } from "react";

interface MobileMenuProps {
  isAuthenticated: boolean;
}

export default function MobileMenu({ isAuthenticated }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // TODO: backend kobler dette til ekte logout
  function handleLogout() {
    console.log("Log out clicked (mobile menu)");
    setOpen(false);
  }

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
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0a0015] border border-white/10 shadow-lg z-30">
          <nav className="flex flex-col gap-3 p-4 text-base font-semibold">
            <a
              href="/"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Home
            </a>

            <a
              href="/search"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Browse
            </a>

            <a
              href="/forum"
              className="nav-link text-orange-500 hover:text-pink-400 transition"
              onClick={() => setOpen(false)}
            >
              Forum
            </a>

            {isAuthenticated && (
              <a
                href="/profile"
                className="nav-link text-orange-500 hover:text-pink-400 transition"
                onClick={() => setOpen(false)}
              >
                Profile
              </a>
            )}

            {/* Log out inside burger menu on small screens */}
            {isAuthenticated && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 border border-white/10 hover:bg-slate-800"
                >
                  Log out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
