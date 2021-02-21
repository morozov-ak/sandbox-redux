import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { authReducer } from "./authReducer";
import { notesReducer } from "./notesReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    notes:notesReducer,
    app:appReducer
})