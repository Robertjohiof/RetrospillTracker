import {Filter} from "@features/gameSearch/type/filter";

export const buildFilterQuery = (filter:Filter)=>{
    const {genres, platform,year:{start, end}, isSet} = filter
    if (!isSet)return "";

    const conditions:string[] = []

    if(genres.trim() !== ""){
        conditions.push(`genres=(${genres})`)
    }

    if(start !== null){
        conditions.push(`first_release_date>=${start}`)
    }

    if(end !== null){
        conditions.push(`first_release_date<=${end}`)
    }

    if(platform.trim() !== ""){
        conditions.push(`platforms=(${platform})`)
    }

    if(conditions.length === 0)return "";

    return `where ${conditions.join(" & ")};`;
}

export const buildSearchQuery = (search:string)=>{
    if(search.trim() !== ""){
        return `search "${search}";`
    }
    return ""
}