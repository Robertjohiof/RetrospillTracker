import GameCard from "@features/gameCard/components/GameCard";
import {Game} from "@/app/shared/types/game";
import Heading from "@/app/shared/components/Heading";
import LoadingGame from "@features/gameList/components/LoadingGame";

export default function GameList({games, categoryTitle, loading}:{games:Game[], categoryTitle?:string, loading:boolean}) {
    return (
        <section className="flex flex-wrap justify-evenly gap-9 p-4">
            <Heading level={2} styling={"w-full"}>{categoryTitle}</Heading>
            {
                loading ? <LoadingGame/> : games.map(
                ({ id, title, imgUrl, description }) =>
                    <GameCard key={id} title={title} imgUrl={imgUrl} altText={description}/>
                )
            }
        </section>
    )
}