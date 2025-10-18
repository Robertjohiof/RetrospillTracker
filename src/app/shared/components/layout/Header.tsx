export default function Header() {
  // Placeholder
  const isAuthenticated = false;

  return (
    <header className="the-header">
      <section className="header-container">
        <div className="logo">
          <img src="/logo.svg" alt="RetroSpillTracker logo" />
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/search">Search</a>
          <a href="/browse">Browse</a>
          <a href="/forum">Forum</a>

          {isAuthenticated && <a href="/profile">Profil</a>}
        </nav>

        <div className="login-signup-buttons">
          <a href="/login" className="login-link">
            Logg inn
          </a>
          <a href="/signup" className="signup-button">
            Sign up
          </a>
        </div>
      </section>
    </header>
  );
}
