import { gameCardProps } from "@features/gameCard/types/gameCardProps";

export default function GameCard(props: gameCardProps) {
    const { title, imgUrl, altText } = props;
    return (
        <article className="max-w-52 min-w-24 overflow-hidden">
            <a href={"/"} className="group border border-white/10 flex flex-col-reverse items-center rounded-lg w-full bg-white/5 shadow-md overflow-hidden">
                <h3 className="text-sm font-semibold font-main text-iceblue m-2 p-2 text-center rounded-lg">{title}</h3>
                <picture className="overflow-hidden">
                    <img src={imgUrl} alt={altText} className="w-full h-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-[1.05]"/>
                </picture>
            </a>
        </article>
    )
}