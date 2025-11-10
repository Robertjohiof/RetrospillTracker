const QUERY = {
    POPULAR_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; sort rating desc; limit 10;',
    ALL_GAMES: 'fields name, cover.url, rating, rating_count, first_release_date; limit 25;',
    SEARCH_GAMES: (search:string):string => {return `fields name, cover.url, rating, rating_count, first_release_date;
    search "${search}";
    limit 25;`}
}

export {QUERY}