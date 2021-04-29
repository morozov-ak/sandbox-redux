import { 
    FIND_USERS,
    //AUTH_REGISTER,
    //ADMIN_DELETE_NOTE, 
    AUTH_LOGIN,
    ADMIN_DELETE_USER, 
    AUTH_LOGOUT,
    ADMIN_FIND_USERS, 
    ADMIN_FIND_NOTES, 
    SAVE_EDITING_NOTE, 
    AUTH_CHANGE_PASSWORD, 
    CLEAN_EDITING_NOTE, 
    GET_EDITING_NOTE, 
    FIND_NOTES, 
    CLEAR_NOTES, 
    APP_LOADING, 
    APP_LOADED, 
    FIND_SHARED_NOTES, 
    CREATE_NOTE, 
    DELETE_NOTE, 
    AUTH_CHECK } from "./types";

import {request} from "../hooks/http.hook"
//import { useHttp } from "../hooks/http.hook"
import { message } from "../utilites/message";

//const  request  = useHttp()
const storageName = 'userData'


export function findUsers(token) {
    return async dispatch => {
        try {
            const fetchedU = await request(`/api/note/users`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            dispatch({ type: FIND_USERS, payload: fetchedU })
        } catch (e) { }
        
    }
}

export function findAdminUsers(token) {
    return async dispatch => {
        try {
            const fetchedU = await request(`/api/note/adminUsers`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            dispatch({ type: ADMIN_FIND_USERS, payload: fetchedU })
        } catch (e) { }
        
    }
}

export function adminDeleteUser({token,user}) {
    return async dispatch => {
        try {
            //const fetched = 
            await request(`/api/note/deleteUser/${user._id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            dispatch(findAdminUsers(token))
            dispatch({ type: ADMIN_DELETE_USER})
        } catch (e) { }
        
    }
}
export function adminDeleteNote({token,user}) {
    return async dispatch => {
        try {
            await request(`/api/note/deleteNote/${user._id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
            dispatch(findAdminUsers(token))
            dispatch({ type: ADMIN_DELETE_USER})
        } catch (e) { }
        
    }
}

export function findAdminNotes({token,userId}) {
    return async dispatch => {
        try {
            dispatch(loading())
            const fetchedU = await request(`/api/note/adminNotes/${userId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            dispatch(loaded())
            dispatch({ type: ADMIN_FIND_NOTES, payload: fetchedU })
        } catch (e) {dispatch(loaded()) }
        
    }
}
export function getEditingNote({token, noteId,note}) {
    return async dispatch => {
        try {
            dispatch(loading())
            if(note){dispatch({ type: GET_EDITING_NOTE, payload: note })}
            else{
                const fetchedU = await request(`/api/note/${noteId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                dispatch({ type: GET_EDITING_NOTE, payload: fetchedU })
            }
            
            dispatch(loaded())
        } catch (e) { dispatch(loaded())}
        
    }
}
export function cleanEditingNote() {
    return async dispatch => {
            dispatch({ type: CLEAN_EDITING_NOTE })
        
    }
}

export function reduxLogin(form) {
    return async dispatch => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            //console.log("data::",data)
            if(data.error || (data.status===500)){throw data}
            dispatch({ type: AUTH_LOGIN, payload: data })
            localStorage.setItem(storageName, JSON.stringify(data))
            message(`Добро пожаловать, ${data.userName}!`)
        }
        catch (error) {
            //console.log("error catched")
            message("произошла ошибка")
        }
    }
}

export function reduxRegister(form) {
    return async dispatch => {
        try {
            const data = await request('/api/auth/register','POST',{...form})
            dispatch({ type: AUTH_LOGIN, payload: data })
            if(data.error){throw data}
            localStorage.setItem(storageName, JSON.stringify(data))
            message(`Добро пожаловать, ${data.userName}!`)
            
        }
        catch (error) {
            message(error.error)
        }
    }
}

export function changePassword({form, token}) {
    return async dispatch => {
        try {
            const data = await request('/api/note/change_password','POST',{...form},{
                authorization: `Bearer ${token}`
            })
            if(data.error){throw data}
            dispatch({ type: AUTH_CHANGE_PASSWORD})
            localStorage.setItem(storageName, JSON.stringify(data))
            message(data.message)
            return "/"
        }
        catch (e) {
            message(e.error)
        }

    }
}

export function reduxLogout() {
    return async dispatch => {
        localStorage.removeItem(storageName)
        dispatch(clearNotes())
        dispatch({ type: AUTH_LOGOUT })
    }
}

export function findNotes(token) {
    return async dispatch => {
        try {
            dispatch(loading())
            const fetched = await request('/api/note/notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if (fetched.e) { throw fetched }
            dispatch({ type: FIND_NOTES, payload: fetched })
            dispatch(loaded())
        }
        catch (error) {
            dispatch(loaded())
            if (error.e && (error.e.message === "jwt expired")) { dispatch(reduxLogout()) }
            message(error.message)
        }
    }
}
export function checkAuth(token) {
    return async dispatch => {
        try {
            dispatch(loading())
            const fetched = await request('/api/note/notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if (fetched.e) { throw fetched }
            dispatch({ type: AUTH_CHECK })
            dispatch(loaded())
        }
        catch (error) {
            dispatch(loaded())
            if (error.e && (error.e.message === "jwt expired")) { dispatch(reduxLogout()) }
        }
    }
}

export function createNote({ newNote, token }) {
    return async dispatch => {
        console.log("whaaat?")
        try {
            dispatch(loading())
            await request('/api/note/create', 'POST', { ...newNote }, {
                authorization: `Bearer ${token}`
            })
            dispatch({ type: CREATE_NOTE })
            dispatch(loaded())

        }
        catch (e) { }
    }
}

export function saveNote({ newNote, token }) {
    return async dispatch => {
        try {
            dispatch(loading())
            await request('/api/note/save', 'POST', { ...newNote }, {
                authorization: `Bearer ${token}`
            })
            dispatch({ type: SAVE_EDITING_NOTE })
            dispatch(loaded())
            message("Заметка сохранена")

        }
        catch (e) { }
    }
}


export function editNote({ newNote, token }) {
    return async dispatch => {
        try {
            dispatch(loading())
            await request('/api/note/create', 'POST', { ...newNote }, {
                authorization: `Bearer ${token}`
            })
            dispatch({ type: CREATE_NOTE })
            dispatch(loaded())

        }
        catch (e) { }
    }
}
export function deleteNote({ id, token }) {

    return async dispatch => {
        try {
            dispatch(loading())
            await request('/api/note/deleteNote', 'POST', { noteNameId: id }, {
                authorization: `Bearer ${token}`
            })
            const fetched = await request('/api/note/notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if (fetched.e) { throw fetched }

            dispatch({ type: DELETE_NOTE, payload: fetched })
            dispatch(loaded())
            message("Удалено")
            return {route:"Notes/"}

        }
        catch (error) {
            dispatch(loaded())
            if (error.e && (error.e.message === "jwt expired")) { dispatch(reduxLogout()) }
            message(error.message)
        }
    }
}

export function findSharedNotes(token) {
    return async dispatch => {
        try {
            dispatch(loading())
            const fetched = await request('/api/note/shared_notes', 'GET', null, { Authorization: `Bearer ${token}` })
            if (fetched.e) { throw fetched }
            dispatch({ type: FIND_SHARED_NOTES, payload: fetched })
            dispatch(loaded())
        }
        catch (error) {
            dispatch(loaded())
            if (error.e.message === "jwt expired") { dispatch(reduxLogout()) }
            message(error.message)
        }
    }
}

export function clearNotes() {
    return async dispatch => {
        dispatch({ type: CLEAR_NOTES })
    }
}

export function loading() {
    return async dispatch => {
        dispatch({ type: APP_LOADING })
    }
}

export function loaded() {
    return async dispatch => {
        dispatch({ type: APP_LOADED })
    }
}
