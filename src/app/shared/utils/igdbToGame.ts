import {Game} from "@/app/shared/types/game"

export interface IGDBGame {
    id: number;
    name: string;
    cover?: {
        url: string;
    };
    summary?: string;
    developers?: {
        name: string;
    }[];
    platforms?: {
        abbreviation: string;
    }[];
}

export type IGDBData = {
    data: IGDBGame[];
    success: boolean;
}

type jsonData<T> = T[]

export function igdbToGame(igdbData:IGDBData):Game[] {
    console.log("igdbToGame", igdbData);
    return igdbData.data.map((game: IGDBGame) => {
        return {
            id: game.id.toString(),
            title: game.name,
            imgUrl: game.cover?.url.replace("t_thumb", "t_cover_big"),
            slug: ""
        }
    })
}