import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
    authReducer,
    postReducer,
    profileReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']