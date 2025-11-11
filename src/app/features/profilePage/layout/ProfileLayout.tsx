import Hero from "@/app/shared/components/Hero";
import NavigationTemp from "@/app/shared/components/NavigationTemp";

interface ProfileLayoutProps {
  data: any;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (v: string) => void;
}

export function ProfileLayout({ data, loading, error, search, setSearch}: ProfileLayoutProps) {
  if (loading) return <p>Fetching data...</p>
  if (error) return <p>{error}</p>

  console.log(data.userGames)
  
  return (
    <div className="styling-profilepage">
      <section className="relative">
        <span className="h-7">
          <Hero imageUrl="/images/gameover.png" imageAlt="Hero banner that says Game Over" />
        </span>
        <span>
          <NavigationTemp />
        </span>
        <span className="absolute right-1 bottom-20 bg-white rounded-full w-30 opacity-50">
          <img src="/images/avatartest.png" alt="Avatar" />
        </span>
      </section>

      <section className="bg-primary-light grid grid-cols-5 grid-rows-3 gap-2 p-3">
        <article className="row-span-full col-span-1 bg-primary p-5">
          <h2 className="font-press text-glow-orange text-sm">Search</h2>
          <section>
            <input
              type="text"
              placeholder="Search game..."
              className="bg-gray-400 w-full p-0.5"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>
        </article>

        {/* Playing, Planning, Played */}
        {["Playing", "Planning", "Played"].map((title) => (
          <article key={title} className="col-span-4">
            <h2 className="text-glow-cyan font-press text-lg">{title}</h2>
            <table className="w-full bg-primary font-orbitron text-sm table-auto p-3">
              <thead>
                <tr className="text-glow-orange text-left">
                  <th className="text-left">Title</th>
                  <th className="text-center">Start date</th>
                  <th className="text-right">Platform</th>
                </tr>
              </thead>
              <tbody>
                {data && data.userGames && data.userGames.length > 0 ? (
                  data.userGames.map((game: any) =>
                    <tr key={game.gameId}>
                      <td className="text-left">{game.title}</td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan={3} className="text-center p-3 text-gray-400">
                      Ingen spill funnet
                    </td>
                  </tr>
                  )}
                <tr className="text-white">
                  <td className="text-left">Temp</td>
                  <td className="text-center">Temp</td>
                  <td className="text-right">Temp</td>
                </tr>
              </tbody>
            </table>
          </article>
        ))}
      </section>
    </div>
  );
}
