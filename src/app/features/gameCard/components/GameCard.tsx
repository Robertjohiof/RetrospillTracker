import { GameCardProps } from "@features/gameCard/types/gameCardProps";
import Heading from "@/app/shared/components/Heading";

export default function GameCard(props: GameCardProps) {
  const { id, title, imgUrl, altText } = props;
  return (
    <article
      className="
    w-full
    max-w-sm          /* Bred på mobil */
    sm:max-w-md       /* Bredere på små tablets */
    lg:max-w-52  /* normal på desktop */
  "
    >
      {/*TODO: link med dynamic slugs */}
      <a
        href={`/games/${id}`}
        className="
          group
          border border-white/10
          flex flex-col-reverse
          items-stretch          
          rounded-lg
          w-full
          bg-white/5
          shadow-md
        "
      >
        <Heading level={3} styling={"mt-4 mb-4 text-center"}>
          {title}
        </Heading>
        {/*TODO: Multiple image sizes from api*/}
        <picture className="overflow-hidden w-full">
          <img
            src={imgUrl ?? "/images/placeholderGame.png"}
            alt={altText}
            className="
              w-full
              aspect-[3/4]        
              object-cover
              rounded-md
              bg-black/30
              transition-transform duration-300
              group-hover:scale-[1.05]
            "
            loading="lazy"
          />
        </picture>
      </a>
    </article>
  );
}
