import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./reducers/AuthReducer/authReducer";
import postReducer from "./reducers/PostReducer/postReducer";
import profileReducer from "./reducers/ProfileReducer/profileReducer";

const rootReducer = combineReducers({
    authReducer,
    postReducer,
    profileReducer
})

export const setupStore = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof setupStore.dispatch
