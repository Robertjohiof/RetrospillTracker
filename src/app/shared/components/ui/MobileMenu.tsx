"use client";

import { useState } from "react";
import Button from "@/app/shared/components/ui/Button";

interface MobileMenuProps {
  isAuthenticated: boolean;
}

export default function MobileMenu({ isAuthenticated }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

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
        <div className="absolute right-0 mt-2 w-auto min-w-[12rem] px-4 py-2 rounded-2xl bg-[#0a0015] border border-pink-500/20 shadow-lg z-30">
          <nav className="flex flex-col gap-3 pt-2 text-base font-semibold tracking-wide">
            <style>{`
              .menu-item {
                padding: 6px 12px;
                border-radius: 12px;
                transition: 0.25s ease;
              }
              .menu-item:hover {
                background: rgba(255, 0, 120, 0.12);
                border: 1px solid rgba(255, 0, 160, 0.6);
                box-shadow: 0 0 14px rgba(255, 0, 140, 0.85);
                color: #ff80d0 !important;
              }
            `}</style>

            <a
              href="/"
              className="menu-item text-orange-500"
              onClick={() => setOpen(false)}
            >
              Home
            </a>

            <a
              href="/search"
              className="menu-item text-orange-500"
              onClick={() => setOpen(false)}
            >
              Browse
            </a>

            <a
              href="/forum"
              className="menu-item text-orange-500"
              onClick={() => setOpen(false)}
            >
              Forum
            </a>

            {isAuthenticated && (
              <a
                href="/profile"
                className="menu-item text-orange-500"
                onClick={() => setOpen(false)}
              >
                Profile
              </a>
            )}

            {/* Log out  */}
            {isAuthenticated && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <Button
                  type="button"
                  onClick={handleLogout}
                  variant="glow"
                  size="md"
                  className="logout-btn w-full justify-center"
                >
                  Log out
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
