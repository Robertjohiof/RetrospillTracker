const BASE_URL = "http://localhost:5173/"
const API_URL = "api/v1/"
const API_ENDPOINT = {
    GET_POPULAR_GAMES: `${BASE_URL + API_URL}getPopularGames`,
    GET_ALL_GAMES: `${BASE_URL + API_URL}getAllGames`,
    GET_SEARCH_GAMES: `${BASE_URL + API_URL}getSearchGames?search=`,
    GET_ALL_USERS: `${BASE_URL}/users`,
}

export { BASE_URL, API_URL, API_ENDPOINT }