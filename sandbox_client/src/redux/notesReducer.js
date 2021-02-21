import { FIND_NOTES,CLEAR_NOTES, FIND_SHARED_NOTES } from "./types"

const initialState={
    notes:[],
    sharedNotes:[]
}
export const notesReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case FIND_NOTES:
            return{...state, notes:[...payload]}
        case CLEAR_NOTES:
            return{...state, notes:[]}
        case FIND_SHARED_NOTES:
            return{...state, sharedNotes:[...payload]}
        default: return state
    }
    
}