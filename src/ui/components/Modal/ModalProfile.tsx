import React from "react";
import "../../style/modal/modalProfile.scss"
import AuthorType from "../../../core/utils/models/AuthorType";
import defaultAvatar from "../../../public/images/default-avatar.png"
import {Field, Form, Formik} from "formik";
import {useAppDispatch} from "../../hooks/redux";
import {logout} from "../../../core/store/reducers/authReducer";
import {FileInput} from "@uppy/react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import {PhotoAttr} from "../../../core/services/api/profileAPI";
import {editAccount} from "../../../core/store/reducers/profileReducer";

interface ModalProfileI {
    profile: AuthorType
    setActive: (state: boolean) => void
}

const uppy = new Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
})

uppy.use(AwsS3, {
    companionUrl: 'https://linkstagram-api.ga/',
    limit: 1
})

let urlParams = {
    id: '',
    storage: 'cache',
    metadata: {
        filename: '',
        size: 0,
        mime_type: ''
    }}

uppy.on('complete', result => {
    const file = result.successful[0]

    urlParams = {
        id: file.meta.key as string,
        storage: 'cache',
        metadata: {
            filename: file.meta.name,
            size: file.size,
            mime_type: file.meta.type as string
        }
    }
})

const ModalProfile: React.FC<ModalProfileI> = ({profile, setActive}) => {
    const dispatch = useAppDispatch()

    const initialValues = {
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        job_title: profile.job_title || '',
        description: profile.description || '',
        profile_photo: {} as PhotoAttr
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {setSubmitting}) => {
                    // eslint-disable-next-line no-param-reassign
                    values.profile_photo = urlParams

                    dispatch(editAccount({account: values}))
                    setSubmitting(false);
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className="modal-p-title">
                            <p className="modal-profile">Profile information</p>
                            <p className="modal-logout-btn" role="none" onClick={() => dispatch(logout())}>Log out</p>
                        </div>
                        <div className="modal-p-general">
                            <div style={{position: "relative"}}>
                                <img className="modal-p-avatar" src={profile.profile_photo_url || defaultAvatar}
                                     alt="avatar"/>
                                {/* eslint-disable-next-line max-len */}
                                {/* <input className="modal-choice-avatar" type="file" ref={fileRef} name="profile_photo" /> */}
                                <FileInput
                                    // assuming `this.uppy` contains an Uppy instance:
                                    uppy={uppy}
                                    pretty
                                    inputName="files[]"
                                />
                            </div>
                            <div style={{width: "100%"}}>
                                <div style={{marginBottom: "24px"}}>
                                    <p className="modal-text">First Name</p>
                                    <Field className="modal-value-text modal-input" type="text"
                                           name="first_name" placeholder={profile.first_name || ""} />
                                </div>
                                <div>
                                    <p className="modal-text">Last Name</p>
                                    <Field className="modal-value-text modal-input" type="text"
                                           name="last_name" placeholder={profile.last_name || ""} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{marginBottom: "32px"}}>
                                <p className="modal-text">Job Title</p>
                                <Field className="modal-value-text modal-input" type="text"
                                       name="job_title" placeholder={profile.job_title || ""} />
                            </div>
                            <div>
                                <p className="modal-text">Description</p>
                                <Field className="modal-value-text modal-input" type="text"
                                       name="description" placeholder={profile.description || ""} />
                            </div>
                        </div>
                        <div className="modal-p-submit">
                            <button type="button" className="modal-value-text modal-btn modal-cancel"
                                    onClick={() => setActive(false)}>Cancel</button>
                            <button type="submit" className="modal-value-text modal-btn modal-submit"
                                    disabled={isSubmitting}>Save</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ModalProfile