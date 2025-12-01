"use client";

import Hero from "../shared/components/Hero";
import GameWrapper from "@features/gameList/components/GameWrapper";

export default function HomePage() {
  return (
    <>
      {/*Hero med CTA*/}
      <Hero
        title="Join the retro family"
        subtitle="Discover classic games, log your favorites, and get personalized recommendations."
        primary={{ label: "Join now", href: "/signup" }}
        secondary={{ label: "Explore", href: "/search" }}
        imageUrl="/images/herohome.png"
        imageAlt="Retro controller"
      />

      {/*TODO: bytt ut listGames med servicen som fetcher game basert på categori*/}
      <GameWrapper />
    </>
  );
}
