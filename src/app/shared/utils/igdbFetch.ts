import {createErrorResponse, createSuccessResponse} from "@/app/shared/lib/response";

const IGDB_GAMES_API = "https://api.igdb.com/v4/games";
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";

// Twitch app-tokens utløper etter ca. 60 dager, så vi henter nytt token automatisk
// med client credentials og cacher det til det nesten er utløpt.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
    if (cachedToken && Date.now() < cachedToken.expiresAt) {
        return cachedToken.value;
    }

    const clientId = process.env.TWITCH_API_ID;
    const clientSecret = process.env.TWITCH_API_SECRET;
    if (!clientId || !clientSecret) {
        return process.env.OAUTH_TOKEN as string;
    }

    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
    });
    const response = await fetch(`${TWITCH_TOKEN_URL}?${params}`, { method: "POST" });
    if (!response.ok) {
        throw new Error(`Kunne ikke hente Twitch-token (${response.status})`);
    }

    const data = await response.json() as { access_token: string; expires_in: number };
    cachedToken = {
        value: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 60) * 1000,
    };
    return cachedToken.value;
}

export async function igdbFetch(query:string, endpoint:string = IGDB_GAMES_API):Promise<Response> {
    try {
        const response:Response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${await getAccessToken()}`,
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