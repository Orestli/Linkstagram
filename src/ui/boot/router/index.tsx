import React, {useEffect} from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Login from '../../pages/Login';
import SignUp from "../../pages/SignUp";
import Main from "../../pages/Main";
import Profile from "../../pages/Profile";
import Header from "../../components/Header/Header";
import {useAppDispatch} from "../../hooks/redux";
import {getMe} from "../../../core/store/reducers/AuthReducer/authThunks";

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [])

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