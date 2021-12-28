import React, {useState} from "react";
import { getPostById } from "../../core/store/reducers/PostReducer/postThunks";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

import "../style/Profile/profilePostStyle.scss"
import ModalPage from "./common/ModalPage";
import ModalPost from "./Modal/ModalPost";

const ProfilePosts: React.FC = () => {
    const {posts, selectedPost, postComments} = useAppSelector(state => state.postReducer)
    const [active, setActive] = useState(false)
    const dispatch = useAppDispatch()

    const selectPost = (id: number) => {
        dispatch(getPostById(id))
        setActive(true)
    }

    return (
        <div className="profile-posts">
            {Object.keys(posts).length !== 0 && posts.map(post => {
                return (
                    <div key={post.id} className="p-post-block">
                        <img className="p-post-image" src={post.photos[0].url} alt=""
                             role="none" onClick={() => selectPost(post.id)} />
                    </div>
                )
            })}
            {selectedPost && Object.keys(selectedPost).length !== 0 &&
                <ModalPage active={active} setActive={setActive}>
                    <ModalPost selectedPost={selectedPost} postComments={postComments} setActive={setActive}/>
                </ModalPage>
            }
        </div>
    )
}

export default ProfilePosts