import GameList from "@features/gameList/GameList"
import {useFetchGames} from "@features/gameList/hooks/useFetchGames";

export default function GameWrapper() {
    const {games} = useFetchGames()

    return (
        <>
            <GameList games={games} categoryTitle={"Popular games"}/>
            <GameList games={[{id:"1",title: "something",imgUrl: "jnasjdj", apiKey: "dasda", description: "something"}]} categoryTitle={"Top rated"}/>
        </>
    )
}