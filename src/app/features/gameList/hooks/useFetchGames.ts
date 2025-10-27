"use client"

import {Game} from "@/app/shared/types/game"
import {useEffect, useState} from "react";
import {API_BASE_URL} from "@/app/config/api";

export function useFetchGames() {
    const [games, setGames] = useState<Game[]>([])

    const fetchPopularGames = async () => {
        try{
            const response = await fetch(`${API_BASE_URL}getPopularGames`);
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
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPopularGames();
    }, []);

    return {games}
}