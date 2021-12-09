import React, {useEffect} from "react";
import {useAppDispatch} from "../hooks/redux";
import {getPosts} from "../../core/store/reducers/postReducer";
import "../style/Main/postStyle.scss";
import PostsMain from "../components/Main/PostsMain";

import "../style/reset.css"
import "../style/Main/mainStyle.scss"
import ProfileMain from "../components/Main/ProfileMain";
import Stories from "../components/Main/Stories";

const Main: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    return (
        <main className="main">
            <div>
                <Stories />
                <PostsMain />
            </div>
            <ProfileMain />
        </main>
    )
}

export default Main