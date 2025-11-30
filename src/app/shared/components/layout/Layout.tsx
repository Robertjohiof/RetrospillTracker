import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "rwsdk/router";

export default function Layout({ children }: LayoutProps) {
  return (
    // isolate for at z-index fungerer litt mer smooth
    <div className="min-h-dvh bg-[#0a0015] relative overflow-x-hidden isolate">
      {/* Låst bakgrunn, for parallax effekt*/}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-no-repeat bg-cover bg-center bg-fixed opacity-60 brightness-110 contrast-110"
        style={{ backgroundImage: "url('/images/RetroZoneBackground.png')" }}
        aria-hidden="true"
      />

      {/* Gradient over bakgrunn for kontrast */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Header />
        <main className="max-w-7xl mx-auto bg-gradient-to-b from-blue-950/35 to-pink-500/35 px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
