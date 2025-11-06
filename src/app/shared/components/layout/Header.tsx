import HeaderSearch from "./HeaderSearch";
import { LinkButton } from "../ui/LinkButton";

export default function Header() {
  // Temp placeholder
  const isAuthenticated = false;

  return (
    <header className="sticky top-0 w-full bg-[#0a0015] px-8 py-3 flex items-center justify-between border-b border-white/10 shadow-md z-20">
      {/* Logo + tittel */}
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

      {/* Navigasjon + søk */}
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
          href="/browse"
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

      {/* Auth-knapper */}
      <div className="flex items-center gap-4">
        <a href="/login" className="nav-link font-medium">
          Log in
        </a>
        <LinkButton
          href="/signup"
          variant="glow"
          className="h-9 rounded-[0.4rem]"
        >
          Sign up
        </LinkButton>
      </div>
    </header>
  );
}
