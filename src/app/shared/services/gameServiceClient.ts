import * as realServiceModule from "./gameService";
import { Game } from "@/app/shared/types/game";

// Backend-funksjoner (om/ når de finnes)
type RealService = {
  listAllGames?: (limit?: number, offset?: number) => Promise<Game[]>;
  getGameBySlug?: (slug: string) => Promise<Game | null>;
};
const realService = realServiceModule as unknown as RealService;

// ---- Hjelpere ----
const toSlug = (txt: string): string =>
  txt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const ensureHttps = (url?: string | null): string | undefined =>
  !url ? undefined : url.startsWith("//") ? `https:${url}` : url;

// Bytt IGDB-størrelse: /t_thumb/ -> /t_cover_big/
const replaceIgdbSize = (
  url?: string,
  size:
    | "t_cover_big"
    | "t_cover_small"
    | "t_thumb"
    | "t_720p"
    | "t_1080p" = "t_cover_big"
): string | undefined =>
  url ? url.replace(/\/t_[^/]+\//, `/${size}/`) : undefined;

// Rå IGDB-type (det vi mapper fra)
type RawGame = {
  id: number;
  name: string;
  slug?: string | null;
  summary?: string | null;
  cover?: { url?: string | null } | null;
  rating?: number | null;
  rating_count?: number | null;
  first_release_date?: number | null;
};

/** Hent alle via backend */
export async function listAllGames(limit = 24, offset = 0): Promise<Game[]> {
  if (typeof realService.listAllGames === "function") {
    return await realService.listAllGames(limit, offset);
  }
  return [];
}

/** Søk (én POST til Worker) */
export async function searchGames(
  searchText: string,
  limit = 24,
  offset = 0
): Promise<Game[]> {
  const res = await fetch("/api/v1/getSearchGames", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ search: searchText ?? "", limit, offset }),
  });
  if (!res.ok) return [];

  let payload: unknown;
  try {
    payload = await res.json();
  } catch {
    return [];
  }

  // Støtt både array og { data: [...] }
  const rows: RawGame[] = Array.isArray(payload)
    ? (payload as RawGame[])
    : Array.isArray((payload as any)?.data)
    ? ((payload as any).data as RawGame[])
    : [];
  if (!rows.length) return [];

  const mapped: Game[] = rows.map((raw) => {
    const https = ensureHttps(raw.cover?.url);
    const sized = replaceIgdbSize(https, "t_cover_big");
    const img = sized ?? "/images/placeholder.png";
    const slug =
      raw.slug && raw.slug.trim().length
        ? raw.slug
        : toSlug(raw.name || String(raw.id));
    return {
      id: String(raw.id),
      title: raw.name,
      imgUrl: img,
      description: raw.summary ?? "",
      slug,
    };
  });

  // Klientside-slice (til backend får paginering)
  return mapped.slice(offset, offset + limit);
}

/** Hent ett spill (slug) via backend */
export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (typeof realService.getGameBySlug === "function") {
    return await realService.getGameBySlug(slug);
  }
  return null;
}
