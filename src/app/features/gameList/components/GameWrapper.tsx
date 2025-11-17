import GameList from "@features/gameList/GameList"
import {useFetchGames} from "@features/gameList/hooks/useFetchGames";
import {Suspense} from "react";
import LoadingGame from "@features/gameList/components/LoadingGame";

export default function GameWrapper() {
    const {games, loading, error} = useFetchGames("getPopularGames")

    return (
        <>
            <GameList games={games} categoryTitle={"Popular games"} loading={loading}/>
        </>
    )
}
