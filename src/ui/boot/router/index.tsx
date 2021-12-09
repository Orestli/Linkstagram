import React, {useEffect} from 'react';
import {
    Routes,
    Route
} from "react-router-dom";

import Login from '../../pages/Login';
import SignUp from "../../pages/SignUp";
import Main from "../../pages/Main";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import Profile from "../../pages/Profile";
import Header from "../../components/Header";
import {getProfile} from "../../../core/store/reducers/profileReducer";
import {getMe} from "../../../core/store/reducers/authReducer";

const App: React.FC = () => {
    const username = useAppSelector(state => state.authReducer.username)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [])

    useEffect(() => {
        if (username) dispatch(getProfile(username))
    }, [username])

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/:username' element={<Profile />} />
                <Route path='/registration' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<h1>Page not found!</h1>} />
            </Routes>
        </>
    )
}

export default App