import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#0a0015] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-60 brightness-110 contrast-110"
        style={{ backgroundImage: "url('/images/RetroZoneBackground.png')" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
