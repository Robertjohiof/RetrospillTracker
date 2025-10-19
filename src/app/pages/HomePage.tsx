import type { RequestInfo } from "rwsdk/worker";
import Layout from "../shared/components/layout/Layout";

export default function HomePage({ ctx }: RequestInfo) {
  const isLoggedIn = Boolean(ctx.user?.id);

  // Erstattes når Drizzle schema er klart
  const popular = [
    {
      id: "smb3",
      title: "Super Mario Bros. 3",
      cover: "/images/supermariobros3.jpg",
    },
    {
      id: "alttp",
      title: "Zelda: A Link to the Past",
      cover: "/images/Zelda1.png",
    },
    { id: "chrono", title: "Chrono Trigger", cover: "/images/chrono.jpg" },
  ];
  const topRated = [
    {
      id: "oot",
      title: "Zelda: Ocarina of Time",
      cover: "/images/Zeldaoot.jpg",
    },
    { id: "hl1", title: "Half-Life", cover: "/images/halflife.jpg" },
    {
      id: "smw",
      title: "Super Mario World",
      cover: "/images/supermarioworld.jpg",
    },
  ];
  const personal = [
    {
      id: "metroid",
      title: "Super Metroid",
      cover: "/images/supermetroid.jpg",
    },
    { id: "ff6", title: "Final Fantasy VI", cover: "/images/ffVI.jpg" },
  ];

  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/*Hero med CTA*/}
        <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-glow-pink text-3xl font-extrabold tracking-tight sm:text-4xl">
            Join the retro family
          </h1>
          <p className="mt-3 text-glow-cyan max-w-xl">
            Discover classic games, log your favorites, and get personalized
            recommendations.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/signup" className="btn-glow">
              Join now
            </a>
            <a
              href="/browse"
              className="rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:text-[#33D4FF]"
            >
              Explore
            </a>
          </div>
        </section>

        <Section
          title="Popular games"
          link="/browse?sort=popular"
          items={popular}
        />

        <Section
          title="Top rated"
          link="/browse?sort=rating"
          items={topRated}
        />

        {isLoggedIn && (
          <Section
            title="Personal recommendation"
            link="/browse?tab=recommended"
            items={personal}
          />
        )}
      </main>
    </Layout>
  );
}

// Erstattes med GameCard og Game cards wrapper når ferdig

function Section({
  title,
  link,
  items,
}: {
  title: string;
  link?: string;
  items: { id: string; title: string; cover: string }[];
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-glow-pink text-lg font-bold tracking-tight">
          {title}
        </h2>
        {link && (
          <a href={link} className="nav-link text-sm hover:underline">
            Show all
          </a>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((game) => (
          <a
            key={game.id}
            href={`/games/${game.id}`}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={game.cover}
                alt={game.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-3">
              <div className="line-clamp-1 text-sm font-semibold">
                {game.title}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
