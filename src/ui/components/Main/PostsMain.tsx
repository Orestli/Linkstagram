import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import defaultAvatar from "../../../public/images/default-avatar.png"
import typescript from "../../../public/images/typescript.png"
import likeIcon from "../../../public/images/like.svg"
import unlikeIcon from "../../../public/images/unlike.svg"
import arrow from "../../../public/images/arrow.svg"
import commentsIcon from "../../../public/images/comments.svg"
import moreIcon from "../../../public/images/more.svg"
import "../../style/reset.css"
import "./postStyle.scss"
import {Link} from "react-router-dom";
import ModalPage from "../common/ModalPage";
import ModalPost from "../Modal/ModalPost";
import { getPostById, setDislike, setLike } from "../../../core/store/reducers/PostReducer/postThunks";

const PostsMain: React.FC = () => {
    const {posts, selectedPost, postComments} = useAppSelector(state => state.postReducer)
    const dispatch = useAppDispatch()

    const [active, setActive] = useState(false)

    const selectPost = (id: number) => {
        dispatch(getPostById(id))
        setActive(true)
    }

    const sharePost = (id: number) => {
        navigator.clipboard.writeText(`/post/${id}`)
    }

    return (
        <div className="post-container">
            {posts.map(post => (
                <div key={post.id} className="post">
                    <div className="post-header">
                        <div>
                            <img className="post-avatar"
                                 src={post.author.profile_photo_url || defaultAvatar} alt="avatar"/>
                        </div>
                        <div className="post-header-labels">
                            <div className="post-author">
                                <Link to={`/profile/${post.author.username}`}>
                                    <p className="post-text post-username">{post.author.username}</p>
                                </Link>
                                <p className="post-text post-datetime">{post.created_at.substring(0, 16)}</p>
                            </div>
                            <div className="post-text post-more">
                                <img src={moreIcon} alt="more-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-content">
                        <img className="post-image" src={post.photos[0].url || typescript} alt="content"
                             role="none" onClick={() => selectPost(post.id)} />
                    </div>
                    <div className="post-description-block">
                        <p className="post-text post-description">{post.description}</p>
                    </div>
                    <div className="post-active">
                        <div className="post-activity">
                            <div className="post-likes">
                                {post.is_liked ?
                                    <img className="post-likes-icon" src={likeIcon} alt="like-icon"
                                         role="none" onClick={() => dispatch(setDislike(post.id))} /> :
                                    <img className="post-likes-icon" src={unlikeIcon} alt="like-icon"
                                         role="none" onClick={() => dispatch(setLike(post.id))} />
                                }
                                <p className="post-text">{post.likes_count}</p>
                            </div>
                            <div className="post-comments">
                                <img className="post-comments-icon" src={commentsIcon} alt="comments-icon"/>
                                <p className="post-text">{post.comments_count}</p>
                            </div>
                        </div>
                        <div className="post-share" role="none"
                             onClick={() => sharePost(post.id)}>
                            <p className="post-text share-text">Share</p>
                            <img src={arrow} alt=""/>
                        </div>
                    </div>
                </div>
            ))}
            {Object.keys(selectedPost).length !== 0 &&
                <ModalPage active={active} setActive={setActive}>
                    <ModalPost selectedPost={selectedPost} postComments={postComments} setActive={setActive}/>
                </ModalPage>
            }
        </div>
    )
}

export default PostsMain