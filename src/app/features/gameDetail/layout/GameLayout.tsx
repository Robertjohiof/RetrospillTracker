import Hero from "@/app/shared/components/Hero";

export default function GameLayout({ data }: { data: any }) {
  console.log(data)
  
  return (
    <>
      <Hero imageUrl="/images/gamePageBanner.png" imageAlt="Hero banner" />

      <section className="main-game-detail bg-primary-light">
        <article className="headline bg-primary p-2">
          <img
            src={data.coverImageUrl || "/images/placeholderGame.png"}
            alt={"altText"}
            className="w-full object-cover rounded-md bg-black/30 transition-transform duration-300 group-hover:scale-[1.05]"
            loading="lazy"
          />
          <div className="text-area">
          <h1 className="text-glow-orange font-press text-sm">{data.title}</h1>
            <span className="text-gray-300 font-press text-[10px] mt-1">
            <p className="">Genre:
              {data.genres.join(", ")}
            </p>
            <p>Platform:
              {data.platforms.join(", ")}
            </p>
            <p>
              Developed by: {data.developers.join(", ")}
            </p>
            </span>
          </div>
        </article>
        <article className="overview bg-primary mt-4 p-2 font-press">
          <h2 className="text-glow-orange text-sm mb-2">Overview</h2>
          <p className="text-gray-200 text-[10px]">{data.description}</p>
        </article>
      </section>
    </>
  );
}
