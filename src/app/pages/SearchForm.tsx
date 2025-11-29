"use client";

import { React } from "rwsdk/client";
import Button from "../shared/components/ui/Button";
import SearchIcon from "../shared/components/ui/SearchIcon";

type SearchFormProps = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function SearchForm({
  query,
  onQueryChange,
  onSubmit,
  isLoading,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-end gap-2">
      <section className="relative flex-1 min-w-[220px] ">
        <input
          value={query}
          onChange={onQueryChange}
          placeholder="Search games"
          className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-white placeholder-white/40 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/60 focus:shadow-[0_0_10px_rgba(255,77,216,0.5)] transition-all"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
          disabled={isLoading}
        >
          <SearchIcon className="w-4 h-4" />
        </button>
      </section>
      <Button
        type="submit"
        variant="glow"
        size="none"
        className="h-[48px] rounded-md px-5"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
