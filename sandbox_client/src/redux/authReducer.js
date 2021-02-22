import { AUTH_LOGIN,AUTH_LOGOUT,AUTH_CHECK } from "./types"

const initialState={
    token:'',
    userId:'',
    userName:''
}
export const authReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case AUTH_LOGIN:
            return{...state, ...payload}
        case AUTH_LOGOUT:
            return{...state, token:'',userId:'',userName:''}
        case AUTH_CHECK:
            return state
        
        
        default: return state
    }
    
}