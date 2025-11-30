import Hero from "@/app/shared/components/Hero";
import { GameLayoutProps } from "../types/gameDetail";

export default function GameLayout({ data }: GameLayoutProps) {
  if(!data) {
    return <p>Laster spilldata...</p>
  }
  
  return (
    <>
      <Hero
        imageUrl={"/images/gamePageBanner.png"}
        imageAlt="Banner image"
      />

      <section className="main-game-detail bg-primary-light min-h-screen p-6">
        <article className="headline bg-primary p-4 md:flex gap-6 rounded-lg shadow-lg">
          <img
            src={data.game.coverImageUrl || "/images/placeholderGame.png"}
            alt={data.game.title}
            className="w-64 h-80 object-cover rounded-md shadow-md hover:scale-105"
            loading="lazy"
          />

          <div className="text-area flex-1">
            <h1 className="text-glow-orange font-press text-base mb-2">
              {data.game.title}
            </h1>

          
            <div className="flex flex-wrap gap-2 mb-2">
              {data.genres.map((genre) => (
                <span key={genre} className="text-xs bg-black/20 px-2 py-1 rounded-md">
                  {genre}
                </span>
              ))}
              {data.platforms.map((platform) => (
                <span key={platform} className="text-xs bg-black/20 px-2 py-1 rounded-md">
                  {platform}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm mb-2 font-bold">
              Genre: {data.genres.join(", ")}
            </p>

            {data.game.rating !== undefined && (

              <p className="text-gray-300 text-sm font-bold">
                Rating: <span className="text-yellow-400 text-sm font-bold">
                  {data.game.rating.toFixed()}/100
                </span>
              </p>
            )}
          </div>
        </article>

        <article className="overview bg-primary mt-4 p-4 rounded-lg shadow-lg">
          <h2 className="text-glow-orange font-press text-lg mb-2">Overview</h2>
          <p className="text-gray-200 text-sm leading-relaxed">{data.game.description}</p>
        </article>

        {data.developers.length > 0 && (
          <article className="developer bg-primary mt-4 p-4 rounded-lg">
            <h2 className="text-glow-orange font-press text-lg mb-2">Developer</h2>
            <p className="text-gray-300 text-sm">
              {data.developers.join(", ")}
            </p>
          </article>
        )}
      </section>
    </>
  );
}
