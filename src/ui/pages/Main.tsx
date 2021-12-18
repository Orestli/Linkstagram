import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import "../components/Main/postStyle.scss";
import PostsMain from "../components/Main/PostsMain";

import "../style/reset.css"
import "../components/Main/mainStyle.scss"
import ProfileMain from "../components/Main/ProfileMain";
import Stories from "../components/Main/Stories";
import {getPosts} from "../../core/store/reducers/PostReducer/postThunks";
import {getProfile} from "../../core/store/reducers/ProfileReducer/profileThunks";
import {getMe} from "../../core/store/reducers/AuthReducer/authThunks";

const Main: React.FC = () => {
    const {username} = useAppSelector(state => state.authReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())

        if (username) {
            dispatch(getProfile(username))
        }

        dispatch(getPosts(1))
    }, [])

    return (
        <main className="main">
            <div className="main-container">
                <Stories />
                <PostsMain />
            </div>
            <ProfileMain />
        </main>
    )
}

export default Main