"use client"

import type { RequestInfo } from "rwsdk/worker";
import Hero from "../shared/components/Hero";
import GameList from "@features/gameList/GameList";
import {listGames} from "@/app/shared/services/gameService";
import {useEffect, useState} from "react";
import { Game } from "@/app/shared/types/game"
import GameWrapper from "@features/gameList/components/GameWrapper";

export default function HomePage({ ctx }: RequestInfo) {
    interface IGDBGame {
        id: number;
        name: string;
        cover?: {
            url: string;
        };
        summary?: string;
        developers?: {
            name: string;
        }[];
        platforms?: {
            abbreviation: string;
        }[];
    }

  const [popularGames, setPopularGames] = useState<Game[]>([]);

  const fetchPopularGames = async () => {
      try{
          const response = await fetch("http://localhost:5173/api/v1/getPopularGames");
          const data = await response.json();
          // @ts-ignore
          setPopularGames(data.data.map((game:IGDBGame) => {return {
              id: game.id.toString(),
              title: game.name,
              imgUrl: game.cover,
              description: game.summary,
          }}));
      }
      catch (error) {
          console.error(error);
      }
  }

    useEffect(() => {
        fetchPopularGames();
    }, []);

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
          <GameWrapper/>
      </>

  );
}