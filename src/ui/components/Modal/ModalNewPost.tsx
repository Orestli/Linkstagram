import React from "react";

import '../../style/modal/modalNewPost.scss'
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import {Field, Form, Formik } from "formik";
import {useAppDispatch} from "../../hooks/redux";
import { DragDrop } from "@uppy/react";
import {createPost} from "../../../core/store/reducers/postReducer";

interface ModalNewPostI {
    setActivePost: (state: boolean) => void
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
    image: {
        id: '',
        storage: 'cache',
        metadata: {
            filename: '',
            size: 0,
            mime_type: ''
        }
    }
}


uppy.on('complete', result => {
    const file = result.successful[0]

    urlParams = {
        image: {
            id: file.meta.key as string,
            storage: 'cache',
            metadata: {
                filename: file.meta.name,
                size: file.size,
                mime_type: file.meta.type as string
            }
        }
    }
})

const ModalNewPost: React.FC<ModalNewPostI> = ({setActivePost}) => {
    const dispatch = useAppDispatch()

    const initialValues = {
        description: '',
        photos_attributes: [] as typeof urlParams[]
    }

    return (
        <div className="np-container">
            <Formik
                initialValues={initialValues}
                onSubmit={(values, {setSubmitting}) => {
                    // eslint-disable-next-line no-param-reassign
                    values.photos_attributes.push(urlParams)

                    dispatch(createPost({post: values}))
                    setSubmitting(false);
                }}
                enableReinitialize
            >
                <Form>
                    <div className="np-select-file">
                        <DragDrop
                            width="100%"
                            height="100%"
                            uppy={uppy}
                        />
                        {/* <img className="np-select-img" src={photoFrame} alt="frame"/> */}
                        <p className="modal-text np-select-subtitle">Choose any photo from your library</p>
                    </div>
                    <div className="np-description">
                        <p className="modal-text">Description</p>
                        <Field className="modal-text np-textarea" placeholder="Description..."
                               name="description" as="textarea" />
                    </div>
                    <div className="modal-p-submit">
                        <button type="button" className="modal-btn modal-cancel"
                                onClick={() => setActivePost(false)}>Cancel</button>
                        <button type="submit" className="modal-btn modal-submit"
                                onClick={() => setActivePost(false)}>Post</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ModalNewPost