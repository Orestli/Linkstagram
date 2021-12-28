import React from "react";
import {PostCommentsResponse, PostResponse} from "../../../core/services/api/postsAPI";

import "./modalPost.scss"
import defaultAvatar from "../../../public/images/default-avatar.png"
import closeIcon from "../../../public/images/close.svg"
import {Link} from "react-router-dom";
import likeIcon from "../../../public/images/like.svg";
import unlikeIcon from "../../../public/images/unlike.svg";
import {useAppDispatch} from "../../hooks/redux";
import {Field, Form, Formik } from "formik";
import {leaveComment, setDislike, setLike } from "../../../core/store/reducers/PostReducer/postThunks";

interface ModalPostI {
    selectedPost: PostResponse
    postComments: PostCommentsResponse[]
    setActive: (state: boolean) => void
}

const PostComments: React.FC<{postComments: PostCommentsResponse[]}> = ({postComments}) => {
    return (
        <div className="m-post-comments">
            {Object.keys(postComments).length !== 0 &&
            postComments.map(comment => {
                return (
                    <div key={comment.id} className="modal-comment">
                        <Link to={`/profile/${comment.commenter.username}`}>
                            <img className="m-post-author-img"
                                 src={comment.commenter.profile_photo_url || defaultAvatar}
                                 alt="avatar"/>
                        </Link>
                        <div className="m-comment-content">
                            <p className="comment-message">{comment.message}</p>
                            <p className="comment-data">{comment.created_at.substring(0, 16)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ModalPost: React.FC<ModalPostI> = ({selectedPost, postComments, setActive}) => {
    const dispatch = useAppDispatch()
    const {author} = selectedPost

    return (
        <div className="m-post">
            <div className="m-post-img">
                <img className="m-img-content" src={selectedPost.photos[0].url} alt="" />
            </div>
            <div className="m-info">
                <div className="m-post-author">
                    <Link to={`/profile/${selectedPost.author.username}`}>
                        <img className="m-post-author-img" src={selectedPost.author.profile_photo_url || defaultAvatar}
                             alt="avatar"/>
                    </Link>
                    <div className="m-author-close">
                        <p className="modal-value-text">{(author.first_name && author.last_name) ?
                            `${author.first_name} - ${author.last_name}` : `@${author.username}`}</p>
                        <img className="m-close-icon" src={closeIcon} alt="close-icon"
                             role="none" onClick={() => setActive(false)} />
                    </div>
                </div>
                <hr className="modal-hr"/>
                <PostComments postComments={postComments} />
                <hr className="modal-hr"/>
                <div className="m-post-like">
                    {selectedPost.is_liked ?
                        <img className="post-likes-icon" src={likeIcon} alt="like-icon"
                             role="none" onClick={() => dispatch(setDislike(selectedPost.id))} /> :
                        <img className="post-likes-icon" src={unlikeIcon} alt="like-icon"
                             role="none" onClick={() => dispatch(setLike(selectedPost.id))} />
                    }
                    <p className="m-post-likes">{selectedPost.likes_count}</p>
                </div>
                <hr className="modal-hr"/>
                <div>
                    <Formik
                        initialValues={{value: ''}}
                        onSubmit={(values) => {
                            dispatch(leaveComment({
                                id: selectedPost.id,
                                message: values.value
                            }))
                            // eslint-disable-next-line no-param-reassign
                            values.value = ''
                        }}
                    >
                        <Form className="m-post-form">
                            <Field className="m-post-input" type="text" name="value" placeholder="Add a comment..." />
                            <button className="m-post-submit" type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ModalPost