import { FIND_USERS } from "./types";


export function findUsers(){

    return async dispatch =>{
        const res = await fetch('/api/note/users', {method: "GET"})
        const json = await res.json()
        dispatch({type:FIND_USERS, payload: json})
    }
}

