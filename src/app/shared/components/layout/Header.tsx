export default function Header() {
  return (
    <header className="the-header">
      <div className="header-container">
        <h1 className="logo">RetroSpillTracker</h1>
        <nav className="nav">
          <a href="/Home">Hjem</a>
          <a href="/Browse">Utforsk</a>
          <a href="/Profile">Profil</a>
          <a href="/SignUp">Logg inn</a>
        </nav>
      </div>
    </header>
  );
}
