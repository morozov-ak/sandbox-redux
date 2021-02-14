import { FIND_USERS,AUTH_LOGIN,AUTH_LOGOUT,FIND_NOTES } from "./types";
import {useHttp} from "../hooks/http.hook"
import { message } from "../utilites/message";

const {request} = useHttp()
const storageName = 'userData'


export function findUsers(){
    return async dispatch =>{
        const res = await fetch('/api/note/users', {method: "GET"})
        const json = await res.json()
        dispatch({type:FIND_USERS, payload: json})
    }
}
export function reduxLogin(form){
    return async dispatch =>{
        console.log("хой", form)
        try{
            const data = await request('/api/auth/login','POST',{...form})
            console.log("data:", data)
            dispatch({type:AUTH_LOGIN, payload: data})
            //localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken,name:name}))
            localStorage.setItem(storageName, JSON.stringify(data))
            message("login: ok")
        }
        catch(e){
            console.log("хуищще:")
        }
        
    }
}

export function reduxLogout(){
    return async dispatch =>{
        console.log("logout")
        dispatch({type:AUTH_LOGOUT})
    }
}

export function findNotes(token){
    return async dispatch =>{
        console.log("token:",token)
        const fetched = await request('/api/note/notes', 'GET', null, { Authorization: `Bearer ${token}` })
        //const json = await res.json()
        console.log("fetched in action:",fetched)
        dispatch({type:FIND_NOTES, payload: fetched})
    }
}
