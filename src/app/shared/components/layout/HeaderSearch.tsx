"use client";

import { React } from "rwsdk/client";
import SearchIcon from "../ui/SearchIcon";

export default function HeaderSearch() {
  return (
    <form
      action="/search"
      method="GET"
      className="relative w-full max-w-sm flex-1"
    >
      <input
        type="search"
        name="search"
        minLength={2}
        placeholder="Search games"
        className="w-full rounded-xl border border-white/10 bg-white/5 
                   px-10 py-1.5 text-sm text-white placeholder-white/50 
                   outline-none transition-all
                   focus:border-pink-500/40 focus:ring-1 focus:ring-pink-500/60
                   focus:shadow-[0_0_12px_rgba(255,77,216,0.6),0_0_28px_rgba(0,234,255,0.45)]
                   animate-[neonPulse_1.6s_ease-in-out_infinite]"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 text-glow-cyan"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  );
}
