import { gameCardProps } from "@features/gameCard/types/gameCardProps";
import Heading from "@/app/shared/components/Heading";

export default function GameCard(props: gameCardProps) {
  const { title, imgUrl, altText } = props;
  return (
    <article className="max-w-52 min-w-24">
      {/*TODO: add link with dynamic slugs */}
      <a
        href={"/"}
        className="group border border-white/10 flex flex-col-reverse items-center rounded-lg w-full bg-white/5 shadow-md h-80"
      >
        <Heading level={3} styling={"mt-4 mb-4 text-center"}>
          {title}
        </Heading>
        {/*TODO: handle multiple image sizes from api*/}
        <picture className="overflow-hidden">
          <img
            src={imgUrl ?? "/images/placeholder.png"}
            alt={altText}
            className="w-full aspect-[3/4] object-cover rounded-md bg-black/30 transition-transform duration-300 group-hover:scale-[1.05]"
            loading="lazy"
          />
        </picture>
      </a>
    </article>
  );
}
