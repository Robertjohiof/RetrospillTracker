import {Filter} from "@features/gameSearch/type/filter";
import {buildFilterQuery, buildSearchQuery} from "@features/gameSearch/util/buildYearFilter";

const QUERY = {
    POPULAR_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; sort rating desc; limit 10;',
    ALL_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; limit 25;',
    SEARCH_GAMES: (search:string, filters:Filter):string => {return `fields name, cover.url, rating, rating_count, first_release_date;
    ${buildSearchQuery(search)}
    ${buildFilterQuery(filters)}
    limit 25;`},
    SEARCH_GAME: (gameId:string):string => {return `fields name, cover.url, created_at, rating, summary, slug, involved_companies.company.name, genres.name, platforms.name; where id = ${gameId}; limit 1;`;},
}

export {QUERY}