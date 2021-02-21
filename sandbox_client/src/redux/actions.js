import { FIND_USERS,AUTH_LOGIN,AUTH_LOGOUT,FIND_NOTES,CLEAR_NOTES, APP_LOADING, APP_LOADED, FIND_SHARED_NOTES, CREATE_NOTE } from "./types";
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
        try{
            const data = await request('/api/auth/login','POST',{...form})
            dispatch({type:AUTH_LOGIN, payload: data})
            localStorage.setItem(storageName, JSON.stringify(data))
            message(`Добро пожаловать, ${data.userName}!`)
        }
        catch(e){
            message(e)
        }
        
    }
}

export function reduxLogout(){
    return async dispatch =>{
        localStorage.removeItem(storageName)
        dispatch(clearNotes())
        dispatch({type:AUTH_LOGOUT})
    }
}

export function findNotes(token){
    return async dispatch =>{
        try{
            dispatch(loading())
            const fetched = await request('/api/note/notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if(fetched.e){throw fetched}
            dispatch({type:FIND_NOTES, payload: fetched})
            dispatch(loaded())
        }
        catch(error){
            dispatch(loaded())
            if(error.e.message==="jwt expired"){dispatch(reduxLogout())}
            message(error.message)
        }
    }
}

export function createNote({newNote,token}){
    return async dispatch =>{
        try {
            dispatch(loading())
            await request('/api/note/create', 'POST', { ...newNote }, {
                authorization: `Bearer ${token}`
            })
            
            dispatch(loaded())

        }
        catch (e) { }
    }
}

export function findSharedNotes(token){
    return async dispatch =>{
        try{
            dispatch(loading())
            const fetched = await request('/api/note/shared_notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if(fetched.e){throw fetched}
            dispatch({type:FIND_SHARED_NOTES, payload: fetched})
            dispatch(loaded())
        }
        catch(error){
            dispatch(loaded())
            if(error.e.message==="jwt expired"){dispatch(reduxLogout())}
            message(error.message)
        }
    }
}

export function clearNotes(){
    return async dispatch =>{
        
        dispatch({type:CLEAR_NOTES})
    }
}

export function loading(){
    return async dispatch =>{
        dispatch({type:APP_LOADING})
    }
}

export function loaded(){
    return async dispatch =>{
        dispatch({type:APP_LOADED})
    }
}
