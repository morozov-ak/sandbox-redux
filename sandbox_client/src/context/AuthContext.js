import {createContext} from 'react'

function noop(){}



export const AuthContext = createContext({
    token:null,
    userId:null,
    login:noop,
    logout:noop,
    message2:noop,
    Create:noop,
    getUsers:noop,
    setUsersListToSave:noop,
    isAuthenticated:false,
    UsersListToSave:[]
})

