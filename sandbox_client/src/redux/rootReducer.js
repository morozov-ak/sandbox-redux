import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { notesReducer } from "./notesReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    notes:notesReducer
})