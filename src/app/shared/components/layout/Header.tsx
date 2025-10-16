export default function Header() {
  return (
    <header className="the-header">
      <div className="header-container">
        <h1 className="logo">RetroSpillTracker</h1>
        <nav className="nav">
          <a href="/">Hjem</a>
          <a href="/browse">Utforsk</a>
          <a href="/profile">Profil</a>
          <a href="/signUp">Logg inn</a>
        </nav>
      </div>
    </header>
  );
}
