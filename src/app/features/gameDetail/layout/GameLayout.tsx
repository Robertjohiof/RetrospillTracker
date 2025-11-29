import Hero from "@/app/shared/components/Hero";
import { GameLayoutProps } from "../types/gameDetail";

export default function GameLayout({ data }: GameLayoutProps) {
  console.log(data)
  
  return (
    <>
      <Hero
        imageUrl={data.coverImageUrl || "/images/gamePageBanner.png"}
        imageAlt={data.title}
      />

      <section className="main-game-detail bg-primary-light min-h-screen p-6">
        <article className="headline bg-primary p-4 md:flex gap-6 rounded-lg shadow-lg">
          <img
            src={data.coverImageUrl || "/images/placeholderGame.png"}
            alt={data.title}
            className="w-64 h-80 object-cover rounded-md shadow-md hover:scale-105"
            loading="lazy"
          />

          <div className="text-area flex-1">
            <h1 className="text-glow-orange font-press text-2xl mb-2">
              {data.title}
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

            <p className="text-gray-300 text-sm mb-2">
              Developed by: <strong>{data.developers.join(", ")}</strong>
            </p>

            {data.rating !== undefined && (
              <p className="text-yellow-400 text-sm font-bold">
                {data.rating}/10
              </p>
            )}
          </div>
        </article>

        <article className="overview bg-primary mt-4 p-4 rounded-lg shadow-lg">
          <h2 className="text-glow-orange font-press text-lg mb-2">Overview</h2>
          <p className="text-gray-200 text-sm leading-relaxed">{data.description}</p>
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
