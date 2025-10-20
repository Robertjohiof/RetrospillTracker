import GameCard from "@features/gameCard/components/GameCard";
import {Game} from "@/app/shared/types/game";

export default function GameList({games, categoryTitle}:{games:Game[], categoryTitle?:string}) {
    return (
        <section className="flex flex-wrap justify-start gap-5">
            <h2 className="text-iceblue w-full items-center">{categoryTitle}</h2>
            {games.map(
                ({ id, title, imgUrl, description }) =>
                    <GameCard key={id} title={title} imgUrl={imgUrl} altText={description}/>
                )
            }
        </section>
    )
}