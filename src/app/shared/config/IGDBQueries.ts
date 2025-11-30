import {Filter} from "@features/gameSearch/type/filter";

const QUERY = {
    POPULAR_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; sort rating desc; limit 10;',
    ALL_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; limit 25;',
    SEARCH_GAMES: (search:string, filters:Filter):string => {return `fields name, cover.url, rating, rating_count, first_release_date;
    ${search.trim() ? `search "${search}";`: "" }
    ${filters.genres ? `where genres=(${filters.genres});` : ""}
    ${filters.console ? `where platforms=(${filters.console});` : ""}
    ${filters.year.start ? `where first_release_date>=${filters.year.start};` : ""}
    ${filters.year.end ? `where first_release_date<=${filters.year.end};` : ""}
    limit 25;`}
}

export {QUERY}