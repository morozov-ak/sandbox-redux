import { FIND_USERS, AUTH_LOGIN, AUTH_LOGOUT,CLEAN_EDITING_NOTE,GET_EDITING_NOTE, FIND_NOTES, CLEAR_NOTES, APP_LOADING, APP_LOADED, FIND_SHARED_NOTES, CREATE_NOTE, DELETE_NOTE, AUTH_CHECK } from "./types";
import { useHttp } from "../hooks/http.hook"
import { message } from "../utilites/message";

const { request } = useHttp()
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
export function getEditingNote({token, noteId}) {
    return async dispatch => {
        try {
            dispatch(loading())
            const fetchedU = await request(`/api/note/${noteId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetchedU)
            dispatch({ type: GET_EDITING_NOTE, payload: fetchedU })
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
            dispatch({ type: AUTH_LOGIN, payload: data })
            localStorage.setItem(storageName, JSON.stringify(data))
            message(`Добро пожаловать, ${data.userName}!`)
        }
        catch (e) {
            message(e)
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
            console.log("errorr", error)
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
            console.log("errorr", error)
            if (error.e && (error.e.message === "jwt expired")) { dispatch(reduxLogout()) }
        }
    }
}

export function createNote({ newNote, token }) {
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


        }
        catch (error) {
            dispatch(loaded())
            console.log("errorr", error)
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
