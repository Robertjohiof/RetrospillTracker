import { useEffect, useState } from "react";
import { BASE_URL } from "@/app/shared/config/apiPaths";
import { GameData, GameDetail } from "../types/gameDetail";
import {
  dbGames,
  dbDevelopers,
  dbGamesToDevelopers,
  dbGamesToGenres,
  dbGenres,
  dbGamesToPlatforms,
  dbPlatforms,
} from "@/app/data/dbTestData";

export function useGameData(gameId: number | string) {
  const [data, setData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const numericGameId = Number(gameId);

  const fetchGame = async () => {
    setLoading(true);
    setError(null);

    try {
      // Klar til API-bruk senere:
      // const response = await fetch(`${BASE_URL}games/${gameId}`);
      // const json = await response.json();
      // const game = json.data

      // Midlertidig henting fra dbTestData:
      const game = dbGames.find((g) => g.gameId === numericGameId);
      if (!game) {
        setError("Fant ikke spillet");
        return;
      }

      const developerIds = dbGamesToDevelopers
        .filter((rel) => rel.gameId === game.gameId)
        .map((rel) => rel.developerId);

      const developers = dbDevelopers
        .filter((d) => developerIds.includes(d.developerId))
        .map((d) => d.name);

      const genreIds = dbGamesToGenres
        .filter((rel) => rel.gameId === game.gameId)
        .map((rel) => rel.genreId);

      const genres = dbGenres
        .filter((g) => genreIds.includes(g.genreId))
        .map((g) => g.name);

      const platformIds = dbGamesToPlatforms
        .filter((rel) => rel.gameId === game.gameId)
        .map((rel) => rel.platformId);

      const platforms = dbPlatforms
        .filter((p) => platformIds.includes(p.platformId))
        .map((p) => p.name);

      setData({
        game: {
          gameId: game.gameId,
          title: game.title,
          description: game.description,
          coverImageUrl: game.coverImageUrl ?? null,
          developers,
          genres,
          platforms,
        },
        developers,
        genres,
        platforms,
      });

      setSearch(game.title);
    } catch (error) {
      console.error(error);
      setError("Feil ved henting av spilldata");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  return { data, loading, error, search, setSearch };
}
