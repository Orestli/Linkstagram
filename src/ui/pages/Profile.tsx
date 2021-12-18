import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import defaultAvatar from "../../public/images/default-avatar.png"
import ProfilePosts from "../components/ProfilePosts";
import ModalPage from "../components/common/ModalPage";
import ModalProfile from "../components/Modal/ModalProfile";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

import "../style/reset.css"
import "../style/Profile/profilePageStyle.scss"
import "../components/Modal/modalPage.scss"
import ModalNewPost from "../components/Modal/ModalNewPost";
import { getProfile } from "../../core/store/reducers/ProfileReducer/profileThunks";
import { getUserPosts } from "../../core/store/reducers/PostReducer/postThunks";

const Profile: React.FC = () => {
    const profile = useAppSelector(state => state.profileReducer)
    const authUsername = useAppSelector(state => state.authReducer.username)
    const urlParams = useParams()
    const dispatch = useAppDispatch()

    const [active, setActive] = useState(false)
    const [activeNewPost, setActivePost] = useState(false)

    useEffect(() => {
        if (Object.keys(urlParams).length !== 0) {
            dispatch(getProfile(String(urlParams.username)))
            dispatch(getUserPosts(String(urlParams.username)))
        } else {
            dispatch(getProfile(authUsername))
            dispatch(getUserPosts(authUsername))
        }
    }, [urlParams, profile])

    return (
        <div className="profile-page">
            <div className="profile-information">
                <div className="profile-about">
                    <div>
                        <img className="profile-avatar" src={profile.profile_photo_url || defaultAvatar} alt="avatar"/>
                    </div>
                    <div className="profile-author-info">
                        <p className="profile-username">{(profile.first_name && profile.last_name) ?
                            `${profile.first_name} ${profile.last_name}` : `@${profile.username}`
                        }
                        </p>
                        {profile.job_title &&
                            <p className="profile-job">{profile.job_title}</p>
                        }
                        {profile.description &&
                            <p className="profile-bio">{profile.description}</p>
                        }
                    </div>
                </div>
                <div className="profile-active">
                    <div className="active-container">
                        <div className="profile-followers">
                            <p className="p-follow-count">{profile.followers}</p>
                            <p className="followers">Followers</p>
                        </div>
                        <div className="profile-following">
                            <p className="p-follow-count">{profile.following}</p>
                            <p className="following">Following</p>
                        </div>
                    </div>
                    {profile.username === authUsername &&
                        <div className="buttons-container">
                            <button type="submit" className="profile-btn profile-edit" onClick={() => setActive(true)}>
                                Edit profile
                            </button>
                            <button type="button" className="profile-btn profile-post"
                                    onClick={() => setActivePost(true)}>
                                New post
                            </button>
                            <ModalPage active={active} setActive={setActive}>
                                <ModalProfile profile={profile} setActive={setActive} />
                            </ModalPage>
                            <ModalPage active={activeNewPost} setActive={setActivePost}>
                                <ModalNewPost setActivePost={setActivePost} />
                            </ModalPage>
                        </div>
                    }
                </div>
            </div>
            <ProfilePosts />
        </div>
    )
}

export default Profile