import React, {useEffect} from "react";
import "./headerStyle.scss"
import '../../style/reset.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import defaultAvatar from "../../../public/images/default-avatar.png"
import {NavLink, useNavigate} from "react-router-dom";
import {getProfile} from "../../../core/store/reducers/ProfileReducer/profileThunks";

const Header: React.FC = () => {
    // eslint-disable-next-line camelcase
    const {profile_photo_url, username, isAuth} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Переадресация неавторизованного пользователя')

        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        dispatch(getProfile(username))
    }, [username])

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-title">
                    Linkstagram
                </div>
                <div className="nav">
                    {isAuth &&
                    <NavLink className="nav-item home-text" to="/">
                        <div className="home">
                            Home
                        </div>
                    </NavLink>
                    }
                    <div className="nav-item language language-text">
                        EN
                    </div>
                    {isAuth &&
                        <div className="nav-item profile">
                            <NavLink to="/profile" >
                                {/* eslint-disable-next-line camelcase */}
                                <img className="default-avatar" src={profile_photo_url || defaultAvatar} alt="avatar"/>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header