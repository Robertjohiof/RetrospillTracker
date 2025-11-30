"use client";

import { React } from "rwsdk/client";
import Button from "../shared/components/ui/Button";
import {consoleOptions, genreOptions, yearOptions} from "@features/gameSearch/util/gameSearchFormOptions";

type SearchFormProps = {
  query: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>, filterType:string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export default function SearchForm({
  query,
  onQueryChange,
    onFilterChange,
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
          🔍
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
        <section className="flex flex-col w-[150px]">
            <label className="mb-1 block text-sm text-cyan-400">Genres</label>
            <select
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
                onChange={(e)=>onFilterChange(e,"genres")}
            >
                <option className="hidden" selected>choose</option>
                {genreOptions.map((genre) => (<option key={genre.id} value={genre.id}>{genre.name}</option>))}
            </select>
        </section>
        <section className="flex flex-col w-[120px]">
            <label className="mb-1 block text-sm text-cyan-400">Year</label>
            <select
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
                onChange={(e)=>onFilterChange(e,"year")}
            >
                <option className="hidden" selected>choose</option>
                {yearOptions.map((year)=>(<option key={year.id} value={JSON.stringify(year.date)}>{year.name}</option>))}
            </select>
        </section>
        <section className="flex flex-col w-[150px]">
            <label className="mb-1 block text-sm text-cyan-400">Console</label>
            <select
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3"
                onChange={(e)=>onFilterChange(e,"console")}
            >
                <option className="hidden" selected>choose</option>
                {consoleOptions.map((console) => (<option key={console.id} value={console.id}>{console.name}</option>))}
            </select>
        </section>
    </form>
  );
}
