import { useEffect, useState } from "react";
import { API_ENDPOINT, BASE_URL } from "@/app/shared/config/apiPaths";
import { GameDetail } from "../types/gameDetail";
import { dbDevelopers, dbGames, dbGamesToDevelopers, dbGamesToGenres, dbGamesToPlatforms, dbGenres, dbPlatforms } from "@/app/data/dbTestData";

export function useGameData(gameId: number | string) {
  const [data, setData] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);

      const game = dbGames.find(
        (g) => g.gameId === Number(gameId) || g.slug === gameId
      );

      if (!game) {
        setError("Game not found");
        return;
      }

      const developers = dbGamesToDevelopers
        .filter((d) => d.gameId === game.gameId)
        .map((d) => dbDevelopers.find((dev) => dev.developerId === d.developerId)?.name)
        .filter(Boolean) as string[];

      const genres = dbGamesToGenres
        .filter((g) => g.gameId === game.gameId)
        .map((g) => dbGenres.find((gen) => gen.genreId === g.genreId)?.name)
        .filter(Boolean) as string[];

      const platforms = dbGamesToPlatforms
        .filter((p) => p.gameId === game.gameId)
        .map((p) => dbPlatforms.find((plat) => plat.platformId === p.platformId)?.name)
        .filter(Boolean) as string[];

      setData({
        gameId: game.gameId,
        title: game.title,
        description: game.description,
        coverImageUrl: game.coverImageUrl || "/images/placeholderGame.png",
        developers,
        genres,
        platforms,
      });

    } catch (err) {
      setError("Failed to load game data");
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  return { data, loading, error };
}