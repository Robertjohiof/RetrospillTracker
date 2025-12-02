"use client";

import { React } from "rwsdk/client";
import useSearchResults from "@features/gameSearch/hooks/useSearchResults";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

export default function Search() {
  const {
    games,
    handleSearchChange,
    handleFilterChange,
    onSubmit,
    loading,
    error,
    query,
  } = useSearchResults();

  // Mapper data fra hooken til props som SearchResults forventer.
  // Dette sikrer at alle properties har riktig type.
  const searchResults = games.map((game) => ({
    id: game.id,
    title: game.title,
    imgUrl: game.imgUrl ?? "/images/placeholder.png", // Sørger for at imgUrl alltid er en string
    altText: game.title,
  }));

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 text-cyan-300">
      {/* Filter-rad  */}
      <div className="mb-10 flex flex-wrap items-end justify-center gap-4">
        <SearchForm
          query={query}
          onQueryChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSubmit={onSubmit}
          isLoading={loading}
        />
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
