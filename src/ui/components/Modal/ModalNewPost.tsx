import React, {useEffect, useState} from "react";

import './modalNewPost.scss'
import photoFrame from '../../../public/images/photo-frame.png'
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import {Field, Form, Formik, FormikErrors} from "formik";
import {useAppDispatch} from "../../hooks/redux";
import {DragDrop, useUppy} from "@uppy/react";
import {createPost} from "../../../core/store/reducers/PostReducer/postThunks";

interface ModalNewPostI {
    setActivePost: (state: boolean) => void
}

interface MyFormValues {
    description: string
}

const ModalNewPost: React.FC<ModalNewPostI> = ({setActivePost}) => {
    const dispatch = useAppDispatch()
    const [image, setImage] = useState<string>('')
    const [urlParams, setUrlParams] = useState({
        image: {
            id: '',
            storage: 'cache',
            metadata: {
                filename: '',
                size: 0,
                mime_type: ''
            }
        }
    })

    const uppy = useUppy(() => {
        return new Uppy({
            meta: { type: 'avatar' },
            restrictions: { maxNumberOfFiles: 1 },
            autoProceed: true,
        })
            .use(AwsS3, {
                companionUrl: 'https://linkstagram-api.ga/',
                limit: 1
            })
    })

    useEffect(() => {
        uppy.on('complete', result => {
            const file = result.successful[0]

            setUrlParams({
                image: {
                    id: typeof file.meta.key === 'string' ? file.meta.key.substring(6) : '',
                    storage: 'cache',
                    metadata: {
                        filename: file.meta.name,
                        size: file.size,
                        mime_type: file.meta.type as string
                    }
                }
            })

            const reader = new FileReader()

            reader.onloadend = () => setImage(reader.result as string)

            if (file.data) {
                reader.readAsDataURL(file.data)
            }
        })
    }, [])

    const initialValues = {
        description: '',
        photos_attributes: [] as typeof urlParams[]
    }

    // eslint-disable-next-line camelcase
    const validate = () => {
        // eslint-disable-next-line camelcase
        const errors: FormikErrors<MyFormValues & {photos_attributes: typeof urlParams[]}> = {};

        if (urlParams.image.id === '') {
            errors.photos_attributes = 'Error'
        }

        return errors
    }

    return (
        <div className="np-container">
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={(values) => {
                    // eslint-disable-next-line no-param-reassign
                    values.photos_attributes.push(urlParams)

                    dispatch(createPost({post: values}))
                    setActivePost(false)
                }}
                enableReinitialize
            >
                {({errors}) => (
                    <Form>
                        {errors.photos_attributes && <p className="np-text-error">No image selected</p>}
                        <div className="np-select-file" style={{backgroundImage: `url(${image})`}}>
                            {/* {image && <img src={image} alt="preview"/>} */}
                            <DragDrop uppy={uppy} className="np-dragdrop"/>
                            <img className="np-select-img" src={photoFrame} alt="frame"/>
                            <p className="modal-text np-select-subtitle">Choose any photo from your library</p>
                        </div>
                        <div className="np-description">
                            <p className="modal-text">Description</p>
                            <Field className="modal-text np-textarea" placeholder="Description..."
                                   name="description" as="textarea" />
                        </div>
                        <div className="modal-p-submit">
                            <button type="button" className="modal-value-text modal-btn modal-cancel"
                                    onClick={() => {
                                        setActivePost(false)
                                        setImage('')
                                    }}>Cancel</button>
                            <button type="submit" className="modal-value-text modal-btn modal-submit">Post</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ModalNewPost