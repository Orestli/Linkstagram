import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import defaultAvatar from "../../../public/images/default-avatar.png"
import {NavLink, useNavigate} from "react-router-dom";
import {getProfile} from "../../../core/store/reducers/ProfileReducer/profileThunks";

import style from "./headerStyle.module.scss"
import '../../style/reset.css'

const Header: React.FC = () => {
    // eslint-disable-next-line camelcase
    const {profile_photo_url, username, isAuth} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        dispatch(getProfile(username))
    }, [username])

    return (
        <header className={style.header}>
            <div className={style.header_container}>
                <div className={style.logo_title}>
                    Linkstagram
                </div>
                <div className={style.nav}>
                    {isAuth &&
                    <NavLink className={`${style.nav_item} ${style.home_text}`} to="/">
                        <div className={style.home}>
                            Home
                        </div>
                    </NavLink>
                    }
                    <div className={`${style.nav_item} ${style.language} ${style.language_text}`}>
                        EN
                    </div>
                    {isAuth &&
                        <div className={`${style.navItem} profile`}>
                            <NavLink to="/profile" >
                                {/* eslint-disable-next-line camelcase */}
                                <img className={style.default_avatar} src={profile_photo_url || defaultAvatar}
                                     alt="avatar"/>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header