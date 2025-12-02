"use client"
import {FormEvent, useEffect, useRef, useState} from "react";
import {Game} from "@/app/shared/types/game"
import {ChangeEvent} from "react";
import {API_ENDPOINT} from "@/app/shared/config/apiPaths";
import {IGDBData, igdbToGame} from "@/app/shared/utils/igdbToGame";
import {Filter} from "@features/gameSearch/type/filter";
import {Result} from "@/app/shared/types/result";
import {Errors} from "@/app/shared/types/errors";

const emptyFilter: Filter = {
    genres: "",
    year: {
        start: null,
        end: null,
    },
    platform: "",
    isSet: false,
}

export default function useSearchResults(){
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [error, setError] = useState<string|null>(null);
    const [filter, setFilter] = useState<Filter>(emptyFilter);

    function handleSearchChange(e:ChangeEvent<HTMLInputElement>){
        setQuery(e.target.value)
    }

    function handleFilterChange(e:ChangeEvent<HTMLSelectElement>, filterType:string){
        if (filterType === "year"){
            setFilter((prev)=>({...prev, [filterType]: JSON.parse(e.target.value), isSet: true}))
            return
        }
        setFilter((prev)=>({...prev, [filterType]: e.target.value, isSet: true}))
    }

    async function onSubmit(event:FormEvent<HTMLFormElement>): Promise<void>{
        setError(null)
        event.preventDefault()
        setLoading(true)
        let queryFilter = query
        if (filter.isSet){
            const filterString = encodeURIComponent(JSON.stringify(filter))
            queryFilter = `${query}&filter=${filterString}`
        }
        const result:Result<Game[]> = await (filter.isSet ? searchFetch(queryFilter) : searchFetch(queryFilter))
        if (!result.success){
            setError(result.error)
        }
        if(result.success){
            setGames(result.data)
        }
        setLoading(false)
    }

    async function onRender():Promise<void>{
        setError(null)
        setLoading(true)
        const urlParams = new URLSearchParams(window.location.search)
        const searchParam:string|null = urlParams.get("search")
        const result:Result<Game[]> = await(searchParam ? searchFetch(searchParam): fetchAll())
        if (!result.success){
            setError(result.error)
        }
        if(result.success){
            setGames(result.data)
        }
        setLoading(false)
    }

    async function searchFetch(query:string):Promise<Result<Game[]>>{
        try {
            const response = await fetch(`${API_ENDPOINT.GET_SEARCH_GAMES}${query}`);
            if(!response.ok){
                return {
                    success: false,
                    errorCode: Errors.NOT_FOUND,
                    error: response.statusText
                };
            }
            const data = await response.json();
            const gamesData = igdbToGame(data as IGDBData)
            return {success: true, data: gamesData}
        }
        catch(error){
            console.warn(error)
            return {
                success: false,
                errorCode: Errors.BAD_REQUEST,
                error: "Something went wrong"};
        }
    }

    async function fetchAll():Promise<Result<Game[]>>{
        try {
            const response = await fetch(`${API_ENDPOINT.GET_ALL_GAMES}`)
            if(!response.ok){
                return {
                    success: false,
                    errorCode: Errors.NOT_FOUND,
                    error: response.statusText
                };
            }
            const data = await response.json();
            const gamesData = igdbToGame(data as IGDBData)
            return {success: true, data: gamesData}
        }
        catch(error){
            console.warn(error)
            return {
                success: false,
                errorCode: Errors.BAD_REQUEST,
                error: "Something went wrong"
            };
        }
    }

    useEffect(() => {
        onRender()
    }, []);


    return {error, games, loading, handleSearchChange, handleFilterChange, onSubmit, query};
}