"use client";
import Hero from "@/app/shared/components/Hero";
import { GameLayoutProps } from "../types/gameDetail";

function formatRating(rating?: number | null) {
  return rating ? `${rating.toFixed(0)}/100` : "No rating available";
}

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
        <article className="headline bg-primary p-4 flex flex-col md:flex-row items-center md:items-start gap-6 rounded-lg shadow-lg">
          <img
            src={data.game.coverImageUrl || "/images/placeholderGame.png"}
            alt={data.game.title}
            className="w-100 h-auto object-cover rounded-md shadow-md hover:scale-105"
            loading="lazy"
          />

          <div className="text-area flex-1">
            <h1 className="text-glow-orange font-press text-base mb-2">
              {data.game.title}
            </h1>

          
            <div className="flex flex-wrap gap-2 mb-2">
              {data.genres.map((genre) => (
                <span key={genre} className="text-xs text-gray-300 font-bold px-2 py-1 rounded-md">
                  {genre}
                </span>
              ))}
              {data.platforms.map((platform) => (
                <span key={platform} className="text-xs text-gray-300 font-bold px-2 py-1 rounded-md">
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
                  {formatRating(data.game.rating)}
                </span>
              </p>
            )}
            <p>{data.created_at}</p>
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
