import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import React from "react";

import {AuthData} from "../../core/store/reducers/AuthReducer/authReducer";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import phoneImg from "../../public/images/phone.png";
import phone01 from "../../public/images/phone01.png";
import phone02 from "../../public/images/phone02.png";
import phone03 from "../../public/images/phone03.png";
import {Link, useNavigate} from "react-router-dom";
import { registration } from "../../core/store/reducers/AuthReducer/authThunks";

interface MyFormValues {
    login: string
    username: string
    password: string
}

const SignUp: React.FC = () => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    if (isAuth) {
        navigate('/')
    }

    const submit = (values: AuthData) => {
        dispatch(registration({
            username: values.username,
            login: values.login,
            password: values.password
        }))
    }

    const validate = (values: MyFormValues) => {
        const errors: FormikErrors<MyFormValues> = {};

        if (!values.login) {
            errors.login = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)
        ) {
            errors.login = 'Invalid email address';
        }

        if (!values.username) {
            errors.username = 'Required'
        } else if (values.username.length < 2) {
            errors.username = 'Minimum length 2 characters'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Minimum length 6 characters'
        }

        return errors;
    }

    return (
        <div className="ls-page">
            <div className="ls-image">
                <img style={{position: "relative", zIndex: "1"}} src={phoneImg} alt="Phone"/>
                <img style={{top: "345px", left: "-82px", zIndex: "1"}}
                     className="ls-phone-item" src={phone01} alt="Phone"/>
                <img style={{top: "560px", right: "-61px", zIndex: "1"}}
                     className="ls-phone-item" src={phone02} alt="Phone"/>
                <img style={{top: "275px", right: "-21px"}} className="ls-phone-item" src={phone03} alt="Phone"/>
            </div>
            <div className="ls-block">
                <h1 className="ls-text ls-title">Sign Up</h1>
                <Formik
                    initialValues={{username: '', login: '', password: ''}}
                    validate={validate}
                    onSubmit={submit}
                    enableReinitialize
                >
                    {({errors, touched}) => (
                        <Form className="ls-form">
                            <p className="ls-text ls-label">Email
                                <ErrorMessage name="login"
                                              render={msg =>
                                                  <span className="ls-text ls-input-error"> - {msg}</span>} />
                            </p>
                            <Field className="ls-text ls-input" type="text" name="login"
                                   placeholder="example@mail.com"
                                   style={errors.login && touched.login && {border: "1px solid #FB766E"}} />
                            <p className="ls-text ls-label">User Name
                                <ErrorMessage name="username"
                                              render={msg =>
                                                  <span className="ls-text ls-input-error"> - {msg}</span>} />
                            </p>
                            <Field className="ls-text ls-input" type="text" name="username"
                                   placeholder="alexexample..."
                                   style={errors.username && touched.username && {border: "1px solid #FB766E"}} />
                            <p className="ls-text ls-label">Password
                                <ErrorMessage name="password"
                                              render={msg =>
                                                  <span className="ls-text ls-input-error"> - {msg}</span>} />
                            </p>
                            <Field className="ls-text ls-input" type="password" name="password"
                                   placeholder="Type in..."
                                   style={errors.password && touched.password && {border: "1px solid #FB766E"}} />
                            <div className="ls-submit-block">
                                <button className="ls-text ls-button" type="submit">Sign up</button>
                                <p className="ls-text ls-subtitle">Have an account?
                                    <Link to="/login" className="ls-text sl-link" >Log In</Link></p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SignUp