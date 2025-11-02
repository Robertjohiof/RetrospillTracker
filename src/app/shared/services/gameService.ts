'use server'

import { createSuccessResponse, createErrorResponse } from "@/app/shared/lib/response";
import {requestInfo} from "rwsdk/worker"

const GET_URL = "https://api.igdb.com/v4/games";

//TODO: add logic for doing opperations for getting games from the repository
export function listGames() {
    return [
        {
            id: "1",
            title: "Super Mario Bros. 3",
            imgUrl: "/images/supermariobros3.jpg",
            description: "GAME",
            apiKey: "0329458",
        },
        {
            id: "2",
            title: "Zelda: A Link to the Past",
            imgUrl: "/images/Zeldaoot.jpg",
            description: "GAME",
            apiKey: "0349758",
        },
        {
            id: "3",
            title: "Chrono Trigger",
            imgUrl: "/images/chrono.jpg",
            description: "GAME",
            apiKey: "0379758",
        },
        {
            id: "4",
            title: "Chrono Trigger",
            imgUrl: "/images/chrono.jpg",
            description: "GAME",
            apiKey: "0379758",
        },
        {
            id: "5",
            title: "Chrono Trigger",
            imgUrl: "/images/chrono.jpg",
            description: "GAME",
            apiKey: "0379758",
        },
    ]
}

export async function getPopularGames() {
    const query = "fields name, cover.url, rating, rating_count, first_release_date; sort rating desc; limit 10;"
    try{
        const response = await fetch(GET_URL, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                contentType: "application/json",
            },
            body: query,
        })
        if (!response.ok) {
            console.error(response);
            createErrorResponse(response.statusText, response.status)
        }
        const data = await response.json();
        return createSuccessResponse(data)
    }
    catch (err) {
        if (err instanceof Error){
            return createErrorResponse(err.message, 500)
        }
        return createErrorResponse("An unknown error occurred", 500)
    }
}

export async function getAllGames() {
    const query = "fields name, cover.url, rating, rating_count, first_release_date; limit 24;"
    try{
        const response = await fetch(GET_URL, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                contentType: "application/json",
            },
            body: query,
        })
        //TODO: better error handling
        if (!response.ok) {
            console.error(response);
            createErrorResponse(response.statusText, response.status)
        }
        const data = await response.json();
        return createSuccessResponse(data)
    }
    catch (err) {
        if (err instanceof Error){
            return createErrorResponse(err.message, 500)
        }
        return createErrorResponse("An unknown error occurred", 500)
    }
}

export async function getSearchGames() {
    const {request} = requestInfo;
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    const query = `fields name, cover.url, rating, rating_count; first_release_date; search "${search}";`
    try{
        const response = await fetch(GET_URL, {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_API_ID as string,
                Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
                contentType: "application/json",
            },
            body: query,
        })
        if (!response.ok) {
            console.error(response);
            createErrorResponse(response.statusText, response.status)
        }
        const data = await response.json();
        return createSuccessResponse(data)
    }
    catch (err) {
        if (err instanceof Error){
            return createErrorResponse(err.message, 500)
        }
        return createErrorResponse("An unknown error occurred", 500)
    }
}