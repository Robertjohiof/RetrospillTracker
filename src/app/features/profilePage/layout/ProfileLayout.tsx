"use client"
import Hero from "@/app/shared/components/Hero";
import NavigationTemp from "@/app/shared/components/NavigationTemp";
import { ProfileData, UserGame } from "../types/user";
import { useState } from "react";

interface ProfileLayoutProps {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (v: string) => void;
}

export function ProfileLayout({ data, loading, error, search, setSearch}: ProfileLayoutProps) {
  if (loading) return <p>Fetching data...</p>
  if (error) return <p>{error}</p>
  
  const user = data?.user;
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredGames: UserGame[] =
    statusFilter && data?.userGames
      ? data.userGames.filter((game) => game.status === statusFilter)
      : data?.userGames ?? [];

  const favoriteGames = data?.userGames
    ?.filter((game) => game.score !== null && game.score >= 8)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0)) ?? [];

  return (
    <div className="styling-profilepage">
      <section className="relative">
        <span className="h-7">
          <Hero imageUrl="/images/gameover.png" imageAlt="Hero banner that says Game Over" />
        </span>
        <span>
          <NavigationTemp />
        </span>
      </section>

      <section className="bg-primary-light grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-3 gap-3 p-3">
        <article className="md:row-span-full md:col-span-1 bg-primary p-2 flex flex-col space-y-8">
          <section className="flex justify-between md:gap-10 md:flex-col-reverse bg-primary-light">
            <div>
              <span className="font-press text-glow-pink text-[10px] flex md:mb-2">
                User:
                <h4 className="font-press text-glow-cyan">{user?.userName}</h4>
              </span>
              <span className="font-press text-glow-pink text-[10px] flex md:mb-2">
                Fname:
                <h4 className="font-press text-glow-cyan">{user?.firstName}</h4>
              </span>
              <span className="font-press text-glow-pink text-[10px] flex md:mb-2">
                Lname:
                <h4 className="font-press text-glow-cyan">{user?.lastName}</h4>
              </span>
              <p className="font-press text-white text-[10px]">"{user?.biography}!"</p>
            </div>
            <span className="w-20 md:w-40 self-center rounded-full bg-white">
              <img src="images/avatartest.png" alt="Avatar picture" />
            </span>
          </section>
          
          <section className="flex flex-col gap-2">
            <h2 className="font-press text-glow-orange text-[12px]">Search my games</h2>
            <input
              type="text"
              placeholder="Search game..."
              className="bg-gray-100 w-40 md:w-2/3 p-0.5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>
        </article>
        
        <article className="md:col-span-2 playing">
          <h2 className="text-glow-cyan font-press text-sm">Playing</h2>
          <table className="w-full bg-primary font-orbitron text-sm md:text-base table-auto p-3">
            <thead>
              <tr className="text-glow-orange text-left">
                <th className="text-left">Title</th>
                <th className="text-center">Start date</th>
                <th className="text-right">Platform</th>
              </tr>
            </thead>
            <tbody>
              {data?.userGames?.length ? (
                data.userGames.map((game) => (
                  <tr key={game.gameId} className="text-white border-b border-gray-700 hover:bg-gray-800/30">
                    <td className="py-2">
                      <a href={`/games/${game.gameId}`} className="hover:text-glow-orange transition">
                        {game.title}
                      </a>
                    </td>
                    <td className="text-center">
                      {game.finishedAt
                        ? new Date(game.finishedAt).toLocaleDateString()
                        : game.status === "PLAYING"
                        ? "In progress"
                        : "-"}
                    </td>
                    <td className="text-right">
                      {game.platform || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-3 text-gray-400">
                    Ingen spill funnet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
        <article className="md:col-span-2 status">
          <div className="flex justify-between items-center mb-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-glow-cyan font-press text-sm">Status</h2>
              <div className="flex gap-2 text-xs flex-wrap">
                {["ALL", "PLAYING", "COMPLETED", "BACKLOG", "DROPPED"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status === "ALL" ? null : status)}
                    className={`px-2 py-1 rounded-md border 
                      ${statusFilter === status || (status === "ALL" && statusFilter === null)
                        ? "border-glow-orange text-glow-orange"
                        : "border-gray-500 text-gray-300 hover:border-glow-orange hover:text-glow-orange"}`}
                    >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <table className="w-full bg-primary font-orbitron text-sm table-auto p-3 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-glow-orange text-left border-b border-gray-600">
                <th>Title</th>
                <th className="text-center">Status</th>
                <th className="text-center">Play Time</th>                
                <th className="text-right">Finished</th>
              </tr>
            </thead>
            <tbody>
              {data?.userGames?.length ? (
                filteredGames.map((game) => (
                  <tr key={game.gameId} className="text-white border-b border-gray-700 hover:bg-gray-800/30 text-[12px] md:text-base">
                    <td className="py-2">
                      <a href={`/games/${game.gameId}`} className="hover:text-glow-orange transition">
                        {game.title.length > 20 ? `${game.title.slice(0, 20)}...` : game.title}
                      </a>
                    </td>

                    <td className="text-center">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] md:text-sm ${
                          game.status === "PLAYING" ? "bg-yellow-500/70 text-yellow-100" :
                          game.status === "COMPLETED" ? "bg-green-600/70 text-green-100" :
                          game.status === "DROPPED" ? "bg-red-600/70 text-red-100" :
                          game.status === "PAUSED" ? "bg-blue-600/70 text-blue-100" :
                          "bg-gray-600/70 text-gray-200"
                        }`}
                      >
                        {game.status || "-"}
                      </span>
                    </td>
                    <td className="text-center">{game.playTime ? `${game.playTime} hrs` : "-"}</td>
                    <td className="text-center">
                      {game.finishedAt
                        ? new Date(game.finishedAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-3 text-gray-400">
                    Ingen spill funnet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
        <article className="md:col-span-2 favorites mt-6">
          <h2 className="text-glow-cyan font-press text-sm">
            Favorite Games
            <span className="ml-2 text-gray-400 text-xs">({favoriteGames.length})</span>
          </h2>

          <table className="w-full bg-primary font-orbitron text-sm table-auto p-3 rounded-lg overflow-hidden">
            <thead>
              <tr className="text-glow-orange text-left border-b border-gray-600">
                <th>Title</th>
                <th className="text-center">Score</th>
                <th className="text-center">Status</th>
                <th className="text-right">Finished</th>
              </tr>
            </thead>
            <tbody>
              {favoriteGames.length ? (
                favoriteGames.map((game) => (
                  <tr key={game.gameId} className="text-white border-b border-gray-700 hover:bg-gray-800/30 text-[12px] md:text-base">
                    <td className="py-2">
                      <a href={`/games/${game.gameId}`} className="hover:text-glow-orange transition">
                        {game.title.length > 20 ? `${game.title.slice(0, 20)}...` : game.title}
                      </a>
                    </td>
                    <td className="text-center">{game.score ? `${game.score}/10` : "-"}</td>
                    <td className="text-center text-[10px] md:text-base">{game.status || "-"}</td>
                    <td className="text-right text-[10px] md:text-base">
                      {game.finishedAt
                        ? new Date(game.finishedAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-3 text-gray-400">
                    Ingen favorittspill funnet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </section>
    </div>
  );
}
