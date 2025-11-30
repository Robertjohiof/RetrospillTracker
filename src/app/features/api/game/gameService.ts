"use server";

import { requestInfo } from "rwsdk/worker";
import {QUERY} from "@/app/shared/config/IGDBQueries";
import {igdbFetch} from "@/app/shared/utils/igdbFetch";
import {Filter} from "@features/gameSearch/type/filter";

// TODO: add logic for doing operations for getting games from the repository
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
  ];
}

export async function getPopularGames() {
  const query = QUERY.POPULAR_GAMES

  return await igdbFetch(query)
}

export async function getAllGames() {
  const query = QUERY.ALL_GAMES;

  return await igdbFetch(query)
}

export async function getSearchGames() {
  const { request } = requestInfo;
  const url = new URL(request.url);
  let search = url.searchParams.get("search");
  const filterParams = url.searchParams.get("filter");

  let filters:Filter = {
      genres: "",
      year: {
          start: null,
          end: null,
      },
      platform: "",
      isSet: false,
  };
  if (filterParams) {
      filters = JSON.parse(decodeURIComponent(filterParams));
  }

  //TODO: make proper validation
  const safeSearch = (search ?? "").replace(/"/g, '\\"');

  const query = QUERY.SEARCH_GAMES(safeSearch,filters);

  return await igdbFetch(query)
}

export async function getGenres() {
    return await igdbFetch("fields name;limit 300;","https://api.igdb.com/v4/genres");
}

export async function getReleaseDates(){
    return await igdbFetch("fields y;where y != null;sort y asc;limit 300;","https://api.igdb.com/v4/release_dates");
}

export async function getConsoles(){
    return await igdbFetch("fields name;where platform_type = 1;sort name asc;limit 300;", "https://api.igdb.com/v4/platforms");
}