import { FIND_USERS,GET_EDITING_NOTE,SAVE_EDITING_NOTE,ADMIN_FIND_NOTES,CLEAN_EDITING_NOTE, FIND_NOTES,CLEAR_NOTES, FIND_SHARED_NOTES,DELETE_NOTE,CREATE_NOTE } from "./types"

const initialState={
    notes:[],
    sharedNotes:[],
    users:[],
    note:[],
    adminedNotes:[]

}
export const notesReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case FIND_NOTES:
            return{...state, notes:[...payload]}
        case ADMIN_FIND_NOTES:
            return{...state, adminedNotes:[...payload]}
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