import type { RequestInfo } from "rwsdk/worker";
import Hero from "../shared/components/Hero";
import GameList from "@features/gameList/GameList";
import {listGames} from "@/app/shared/services/gameService";

export default function HomePage({ ctx }: RequestInfo) {
  const isLoggedIn = Boolean(ctx.user?.id);

  return (
      <>
          {/*Hero med CTA*/}
          <Hero
              title="Join the retro family"
              subtitle="Discover classic games, log your favorites, and get personalized recommendations."
              primary={{ label: "Join now", href: "/signup" }}
              secondary={{ label: "Explore", href: "/browse" }}
              imageUrl="/images/herohome.png"
              imageAlt="Retro controller"
          />

          {/*TODO: bytt ut listGames med servicen som fetcher game basert på categori*/}
          <GameList games={listGames()} categoryTitle={"Popular games"}/>
          <GameList games={listGames()} categoryTitle={"Top Rated"}/>
          <GameList games={listGames()} categoryTitle={"Recommendations"}/>
      </>

  );
}