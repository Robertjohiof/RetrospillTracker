export default function Header() {
  // Temp placeholder
  const isAuthenticated = false;

  return (
    <header className="bg-[#0a0015]/90 text-orange-400 px-8 py-4 flex items-center justify-between shadow-lg">
      <a
        href="/"
        className="flex items-center gap-2 hover:opacity-90 transition"
      >
        <img
          src="/images/retro80sLogo.png"
          alt="RetroSpillTracker logo"
          className="h-10 w-auto"
        />
        <h1 className="text-pink-500 text-lg font-bold hidden sm:block">
          RetroSpillTracker
        </h1>
      </a>

      <nav className="hidden md:flex gap-8 text-sm font-semibold">
        <a href="/" className="hover:text-pink-500 transition-colors">
          Home
        </a>
        <a href="/search" className="hover:text-pink-500 transition-colors">
          Search
        </a>
        <a href="/browse" className="hover:text-pink-500 transition-colors">
          Browse
        </a>
        <a href="/forum" className="hover:text-pink-500 transition-colors">
          Forum
        </a>

        {isAuthenticated && (
          <a href="/profile" className="hover:text-pink-500 transition-colors">
            Profile
          </a>
        )}
      </nav>

      <div className="flex gap-4">
        <a
          href="/login"
          className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
        >
          Log in
        </a>
        <a
          href="/signup"
          className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-md font-semibold shadow-md transition-all"
        >
          Sign up
        </a>
      </div>
    </header>
  );
}
