import GameCard from "@features/gameCard/components/GameCard";
import {Game} from "@/app/shared/types/game";

export default function GameList({games}:{games:Game[]}) {
    return (
        <section className="flex gap-28 flex-wrap">
            {games.map(
                ({title, imgUrl, description}) =>
                    <GameCard title={title} imgUrl={imgUrl} altText={description}/>
                )
            }
        </section>
    )
}