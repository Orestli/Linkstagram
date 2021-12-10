import React, {useState} from "react";
import {useAppSelector} from "../../hooks/redux";

import defaultAvatar from "../../../public/images/default-avatar.png"
import "../../style/reset.css"
import "../../style/Main/profileStyle.scss"
import ModalPage from "../common/ModalPage";
import ModalProfile from "../Modal/ModalProfile";
import ModalNewPost from "../Modal/ModalNewPost";

const ProfileMain: React.FC = () => {
    const profile = useAppSelector(state => state.profileReducer)

    const [active, setActive] = useState(false)
    const [activeNewPost, setActivePost] = useState(false)

    return (
        <div className="main-profile">
            <div className="main-title">
                <div className="main-followers">
                    <p className="main-text">{profile.followers}</p>
                    <p className="followers">Followers</p>
                </div>
                <div>
                    <img className="main-avatar" src={profile.profile_photo_url || defaultAvatar} alt=""/>
                </div>
                <div className="main-following">
                    <p className="main-text">{profile.following}</p>
                    <p className="following">Following</p>
                </div>
            </div>
            <div className="main-about">
                <div className="main-name-job">
                    <p className="main-text">{(profile.first_name && profile.last_name) ?
                        `${profile.first_name} ${profile.last_name} ` : `@${profile.username}`}
                    {profile.job_title && `- ${profile.job_title}`}</p>
                </div>
                    <div className="main-bio">
                        <p className="main-text main-bio-text">{profile.description}</p>
                    </div>
            </div>
            <div className="main-action">
                <button type="button" className="modal-btn main-edit-btn" onClick={() => setActive(true)}>
                    <p className="main-text">Edit profile</p>
                </button>
                <button type="button" className="modal-btn main-post-btn" onClick={() => setActivePost(true)}>
                    <p className="main-text" style={{color: "white"}}>New post</p>
                </button>
            </div>
            <div className="main-footer">
                <p className="main-text footer-text">
                    About Help Privacy Terms Locations Language
                    ©2021 Linkstagram
                </p>
            </div>
            <ModalPage active={active} setActive={setActive} _padding="48px">
                <ModalProfile profile={profile} setActive={setActive} />
            </ModalPage>
            <ModalPage active={activeNewPost} setActive={setActivePost}>
                <ModalNewPost setActivePost={setActivePost} />
            </ModalPage>
        </div>
    )
}

export default ProfileMain