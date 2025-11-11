"use client"

import {Game} from "@/app/shared/types/game"
import {useEffect, useState} from "react";
import {API_BASE_URL} from "@/app/config/api";

export function useFetchGames(apiEndpoint:string) {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const fetchPopularGames = async () => {
        setError(false)
        setLoading(true)
        try{
            const response = await fetch(`${API_BASE_URL}${apiEndpoint}`);
            if (!response.ok){
                return
            }
            const data:IGDBGame = await response.json();

            console.log(data);
            setGames(data.data.map((game:IGDBData) => {return {
                id: game.id.toString(),
                title: game.name,
                imgUrl: game.cover?.url.replace("t_thumb","t_cover_big"),
                description: game.summary,
            } as Game}));
        }
        catch (error) {
            setError(true);
            console.error(error);
            setLoading(false);
        }
        setTimeout(()=>{setLoading(false);},4000)

    }

    useEffect(() => {
        fetchPopularGames();
    }, []);

    return {games, loading, error}
}