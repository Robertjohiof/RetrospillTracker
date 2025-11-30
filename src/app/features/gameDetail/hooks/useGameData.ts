import { useEffect, useState } from "react";
import { API_ENDPOINT, BASE_URL } from "@/app/shared/config/apiPaths";
import { ApiResponse, GameData } from "../types/gameDetail";

export function useGameData(gameId: number | string) {
  const [data, setData] = useState<GameData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGame = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_ENDPOINT.GET_GAME}${gameId}`);
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const json = await response.json() as ApiResponse<any[]>;

      const raw = json.data[0]

      console.log(raw)

      if (!raw) {
        throw new Error("Ingen spilldata funnet");
      }

      const formattedData: GameData = {
        game: {
          gameId: raw.id,
          title: raw.name,
          description: raw.summary ?? null,
          coverImageUrl: raw.cover?.url
            ? `https:${raw.cover.url.replace("t_thumb", "t_cover_big")}`
            : null,
          developers: raw.involved_companies?.map((c: any) => c.company?.name) ?? [],
          genres: raw.genres?.map((g: any) => g.name) ?? [],
          platforms: raw.platforms?.map((p: any) => p.name) ?? [],
          rating: raw.rating ?? null,
        },
        developers: raw.involved_companies?.map((c: any) => c.company?.name) ?? [],
        genres: raw.genres?.map((g: any) => g.name) ?? [],
        platforms: raw.platforms?.map((p: any) => p.name) ?? [],
      };

      setData(formattedData);
    } catch (error: any) {
      console.error("Feil ved henting av spill:", error);
      setError(error.message || "Noe gikk galt");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [gameId]);

  return { data, loading, error };
}