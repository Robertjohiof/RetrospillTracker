"use client";

import { React } from "rwsdk/client";
import useSearchResults from "@features/gameSearch/hooks/useSearchResults";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

export default function Search() {
  const { games, handleSearchChange, onSubmit, loading, error, query } =
    useSearchResults();

  // Mapper data fra hooken til props som SearchResults forventer.
  // Dette sikrer at alle properties har riktig type.
  const searchResults = games.map((game) => ({
    title: game.title,
    imgUrl: game.imgUrl ?? "/images/placeholder.png", // Sørger for at imgUrl alltid er en string
    altText: game.title,
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 text-cyan-300">
      {/* Filter-rad (deaktiverte drop-downs foreløpig) */}
      <div className="mb-10 flex flex-wrap items-end justify-center gap-4">
        <SearchForm
          query={query}
          onQueryChange={handleSearchChange}
          onSubmit={onSubmit}
          isLoading={loading}
        />

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
      <div className="mt-8">
        {!error && (
          <SearchResults results={searchResults} isLoading={loading} />
        )}
      </div>
    </section>
  );
}
