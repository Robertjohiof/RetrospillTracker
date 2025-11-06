import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response";

const IGDB_GAMES_API = "https://api.igdb.com/v4/games";

export async function igdbFetch(query:string, endpoint:string = IGDB_GAMES_API):Promise<Response> {
    try {
        const response:Response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: query,
        });

        if (!response.ok) {
            console.error(response);
            return createErrorResponse(response.statusText, response.status);
        }

        const data = await response.json();
        return createSuccessResponse(data);
    } catch (err) {
        if (err instanceof Error) {
            return createErrorResponse(err.message, 500);
        }
        return createErrorResponse("En ukjent feil oppstod", 500);
    }
}