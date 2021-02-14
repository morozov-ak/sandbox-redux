import { FIND_NOTES } from "./types"

const initialState={
    notes:[]
}
export const notesReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case FIND_NOTES:
            console.log("payload:", payload)
            return{...state, notes:[...payload]}
        
        
        default: return state
    }
    
}