export default function Footer() {
  return (
    <footer className="bg-[#0a0015]/90 text-orange-400 py-6 mt-12 border-t border-pink-700/40">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm tracking-wide">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-semibold">RetroSpillTracker</span>.
        All rights reserved.
      </div>
    </footer>
  );
}
