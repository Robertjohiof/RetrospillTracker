"use client";

import { useEffect, useState } from "react";
import {
  listAllGames,
  searchGames,
} from "@/app/shared/services/gameServiceClient";
import type { Game } from "@/app/shared/types/game";
import GameCard from "@/app/features/gameCard/components/GameCard";
import { React } from "rwsdk/client";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const first = await listAllGames(24, 0);
        setGames(first);
      } catch {
        setError("Not able to load games.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const results = query.trim()
        ? await searchGames(query, 24, 0)
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
      {/* Filter rad */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {/* Search */}
        <form onSubmit={onSubmit} className="col-span-1 md:col-span-1">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/70"></span>
            <input
              value={query}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
              placeholder="Search games"
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 outline-none"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-4 py-2 hover:bg-white/15"
          >
            Search
          </button>
        </form>
        {/* Genre */}
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm text-cyan-400">Genres</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
            title="kommer senere"
          >
            <option>Any</option>
          </select>
        </div>

        {/* Year */}
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm text-cyan-400">Year</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
            title="Kommer senere"
          >
            <option>Any</option>
          </select>
        </div>

        {/* Console */}
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm text-cyan-400">Console</label>
          <select
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
            disabled
            title="Kommer senere"
          >
            <option>Any</option>
          </select>
        </div>

        {/* More filters */}
        <div className="md:col-span-1">
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

      {/*Sections*/}
      {!loading && !error && (
        <div className="space-y-12">
          {/* Popular now */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-cyan-400">
              Popular now
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {(games ?? []).slice(0, 5).map((game) => (
                <GameCard
                  key={game.id ?? game.slug}
                  title={game.title}
                  imgUrl={game.imgUrl ?? "/images/placeholder.png"}
                  altText={game.title}
                />
              ))}
            </div>
          </section>

          {/* All time popular */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-cyan-400">
              All time popular
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {(games ?? []).slice(5, 10).map((game) => (
                <GameCard
                  key={(game.id ?? game.slug) + "-all"}
                  title={game.title}
                  imgUrl={game.imgUrl ?? "/images/placeholder.png"}
                  altText={game.title}
                />
              ))}
            </div>
          </section>

          {/* Hidden Gems */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-cyan-400">
              Hidden Gems
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {(games ?? []).slice(10, 15).map((game) => (
                <GameCard
                  key={(game.id ?? game.slug) + "-gems"}
                  title={game.title}
                  imgUrl={game.imgUrl ?? "/images/placeholder.png"}
                  altText={game.title}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && games.length === 0 && <p>No games found.</p>}
    </section>
  );
}
