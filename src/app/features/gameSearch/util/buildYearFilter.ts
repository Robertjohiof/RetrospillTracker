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
        conditions.push(`last_release_date<=${end}`)
    }

    if(platform.trim() !== ""){
        conditions.push(`platforms=(${platform})`)
    }

    if(conditions.length === 0)return "";

    console.log(conditions.join(" & "))
    return `where ${conditions.join(" & ")};`;
}