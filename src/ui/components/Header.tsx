import React from "react";
import "../style/headerStyle.scss"
import "../style/reset.css"
import {useAppSelector} from "../hooks/redux";
import defaultAvatar from "../../public/images/default-avatar.png"
import {NavLink} from "react-router-dom";

const Header: React.FC = () => {
    const {photo, isAuth} = useAppSelector(state => state.authReducer)

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
                                <img className="default-avatar" src={photo || defaultAvatar} alt="avatar"/>
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header