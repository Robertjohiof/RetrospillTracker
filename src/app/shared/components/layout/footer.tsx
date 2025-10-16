export default function Footer() {
  return (
    <footer className="the-footer">
      <div className="footer-container">
        © {new Date().getFullYear()} RetrospillTracker
      </div>
    </footer>
  );
}
