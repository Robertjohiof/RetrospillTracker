import { gameCardProps } from "@features/gameCard/types/gameCardProps";

export default function GameCard(props: gameCardProps) {
    const { title, imgUrl, altText } = props;
    return (
        <article className="flex flex-col-reverse items-center rounded-lg max-w-48 min-w-24 bg-primary shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-lg font-semibold text-secondary mt-3 mb-4 px-3 text-center rounded-lg">{title}</h3>
            <img srcSet={imgUrl} alt={altText} className="w-full h-48 object-contain rounded-lg"/>
        </article>
    )
}