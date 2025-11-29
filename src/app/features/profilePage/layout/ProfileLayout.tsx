"use client"
import Hero from "@/app/shared/components/Hero";
import NavigationTemp from "@/app/shared/components/NavigationTemp";
import { ProfileData } from "../types/user";

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
  
  console.log(data, "ProfileLayout")
  const user = data?.user;

  return (
    <div className="styling-profilepage">
      <section className="relative">
        <span className="h-7">
          <Hero imageUrl="/images/gameover.png" imageAlt="Hero banner that says Game Over" />
        </span>
        <span>
          <NavigationTemp />
        </span>
        {/* <span className="absolute right-1 bottom-20 bg-white rounded-full w-30 opacity-50">
          <img src="/images/avatartest.png" alt="Avatar" />
        </span> */}
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
          <table className="w-full bg-primary font-orbitron text-sm table-auto p-3">
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
      </section>
    </div>
  );
}
