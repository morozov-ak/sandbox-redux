import { 
    FIND_USERS,
    GET_EDITING_NOTE,
    SAVE_EDITING_NOTE,
    ADMIN_FIND_NOTES,
    ADMIN_FIND_USERS,
    CLEAN_EDITING_NOTE, 
    FIND_NOTES,
    CLEAR_NOTES, 
    FIND_SHARED_NOTES,
    ADMIN_DELETE_NOTE,
    DELETE_NOTE,
    CREATE_NOTE,
    ADMIN_DELETE_USER } from "./types"

const initialState={
    notes:[],
    sharedNotes:[],
    users:[],
    note:[],
    adminedNotes:[],
    adminedUsers:[],
    chekedUsers:[]

}
export const notesReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case FIND_NOTES:
            return{...state, notes:[...payload]}
        case ADMIN_FIND_NOTES:
            return{...state, adminedNotes:[...payload]}
        case ADMIN_FIND_USERS:
            return{...state, adminedUsers:[...payload]}
        case ADMIN_DELETE_USER:
            return state
        case ADMIN_DELETE_NOTE:
            return state
        case CLEAR_NOTES:
            return{...state, notes:[]}
        case FIND_SHARED_NOTES:
            return{...state, sharedNotes:[...payload]}
        case DELETE_NOTE:
            return{...state, notes:[...payload]}
        case FIND_USERS:
            return{...state, users:[...payload]}
        case GET_EDITING_NOTE:
            return{...state, note:payload}
        case CLEAN_EDITING_NOTE:
            return{...state, note:[]}
        case CREATE_NOTE:
            return state
        case SAVE_EDITING_NOTE:
            return state
            
        default: return state
    }
    
}