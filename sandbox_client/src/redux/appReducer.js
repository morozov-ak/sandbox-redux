import { APP_LOADING, APP_LOADED } from "./types"

const initialState={
    loading:false
}
export const appReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case APP_LOADING:
            return{...state, loading:true}
        case APP_LOADED:
            return{...state, loading:false}
        default: return state
    }
    
}