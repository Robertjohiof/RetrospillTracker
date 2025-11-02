"use client";

import { useEffect, useState } from "react";
import {
  listAllGames,
  searchGames,
} from "@/app/shared/services/gameServiceClient";
import type { Game } from "@/app/shared/types/game";
import GameCard from "@/app/features/gameCard/components/GameCard";
import { React } from "rwsdk/client";

export default function Search() {
  // lokal state
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // init: les ?search/ ?query fra URL og søk
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = params.get("search") || params.get("query") || "";
    if (initial) {
      setQuery(initial);
      (async () => {
        setLoading(true);
        setError(null);
        try {
          const results = await searchGames(initial, 24, 0);
          setGames(results);
        } catch {
          setError("Not able to find games");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  // submit fra lokalt søkefelt
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const text = query.trim();
      const results = text
        ? await searchGames(text, 24, 0)
        : await listAllGames(24, 0);
      setGames(results);
    } catch {
      setError("Not able to find games");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 text-cyan-300">
      {/* Filter-rad (deaktiverte drop-downs foreløpig) */}
      <div className="mb-10 flex flex-wrap items-end justify-center gap-4">
        {/* Søk */}
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              placeholder="Search games"
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 
                   text-white placeholder-white/40 outline-none focus:border-pink-500/40 
                   focus:ring-1 focus:ring-pink-500/60 focus:shadow-[0_0_10px_rgba(255,77,216,0.5)]
                   transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70">
              🔍
            </span>
          </div>
          <button
            type="submit"
            className="h-[48px] rounded-md bg-orange-500 text-black font-semibold px-5 
                 hover:bg-pink-500 hover:text-white transition-all duration-200 
                 shadow-[0_0_6px_rgba(255,77,216,0.5)] focus:shadow-[0_0_10px_rgba(255,77,216,0.8)] 
                 active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Genres */}
        <div className="flex flex-col w-[150px]">
          <label className="mb-1 block text-sm text-cyan-400">Genres</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
          >
            <option>Any</option>
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col w-[120px]">
          <label className="mb-1 block text-sm text-cyan-400">Year</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
          >
            <option>Any</option>
          </select>
        </div>

        {/* Console */}
        <div className="flex flex-col w-[150px]">
          <label className="mb-1 block text-sm text-cyan-400">Console</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
          >
            <option>Any</option>
          </select>
        </div>

        {/* More filters */}
        <div className="flex flex-col w-[160px]">
          <label className="mb-1 block text-sm text-transparent select-none">
            .
          </label>
          <button
            className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 hover:bg-white/15 disabled:opacity-50"
            disabled
            title="Flere filtre kommer senere"
          >
            More filters
          </button>
        </div>
      </div>

      {/* Status */}
      {loading && <p>Fetching games...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Resultater */}
      {!loading && !error && (
        <>
          <h2 className="mb-4 text-xl font-bold text-cyan-400">
            Results {games.length ? `(${games.length})` : ""}
          </h2>

          {games.length === 0 ? (
            <p>No games found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {games.map((game) => (
                <GameCard
                  key={game.id ?? game.slug}
                  title={game.title}
                  imgUrl={game.imgUrl ?? "/images/placeholder.png"}
                  altText={game.title}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
