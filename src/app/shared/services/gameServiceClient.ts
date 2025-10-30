import { dbGames } from "@/app/data/dbTestData";
import * as realServiceModule from "./gameService";
import { Game } from "@/app/shared/types/game";

// Veksler mellom mock-data (lokalt) og ekte API-kall
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

// Forventer at disse funksjonene finnes i backend senere
type RealService = {
  listAllGames?: (limit?: number, offset?: number) => Promise<Game[]>;
  searchGames?: (args: {
    text?: string;
    limit?: number;
    offset?: number;
  }) => Promise<Game[]>;
  getGameBySlug?: (slug: string) => Promise<Game | null>;
};

// Caster importen slik at TypeScript ikke klager
const realService = realServiceModule as unknown as RealService;

/** Henter alle spill (bruker mock-data foreløpig) */
export async function listAllGames(limit = 24, offset = 0): Promise<Game[]> {
  if (USE_MOCKS) {
    const allGames: Game[] = [...dbGames] as unknown as Game[];
    const paginatedGames = allGames.slice(offset, offset + limit);
    return paginatedGames;
  }

  if (typeof realService.listAllGames === "function") {
    return await realService.listAllGames(limit, offset);
  }
  return [];
}

/** Søker etter spill basert på tittel, slug eller beskrivelse */
export async function searchGames(
  searchText: string,
  limit = 24,
  offset = 0
): Promise<Game[]> {
  if (USE_MOCKS) {
    const query = (searchText ?? "").toLowerCase();

    const matchingGames = (dbGames as unknown as Game[]).filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.slug?.toLowerCase().includes(query) ||
        (game.description?.toLowerCase().includes(query) ?? false)
    );

    return matchingGames.slice(offset, offset + limit);
  }

  if (typeof realService.searchGames === "function") {
    return await realService.searchGames({ text: searchText, limit, offset });
  }
  return [];
}

/** Henter ett enkelt spill basert på slug (for detaljside) */
export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (USE_MOCKS) {
    const foundGame =
      (dbGames as unknown as Game[]).find((game) => game.slug === slug) ?? null;
    return foundGame;
  }

  if (typeof realService.getGameBySlug === "function") {
    return await realService.getGameBySlug(slug);
  }
  return null;
}
