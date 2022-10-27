import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {Element} from "../../Common/FormsControls/FormsControls";
import {required} from "../../utilc/validators/validator";
import styles from '../../Common/FormsControls/FormsControls.module.css'

const Input = Element('input')

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={'password'} component={Input} validate={[required]} />
            </div>
            <div>
                <Field name={'checkbox'} component={'input'} type={'checkbox'} /> remember me
            </div>
            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && <Field component={Input} name={'captcha'} validate={[required]} />}
            {props.error && <div className={styles.formConclusionError}>{props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}


const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)


const LoginPage = (props) => {

    const submitLogin = (formData) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

   if (props.isAuth) {
       return <Navigate to='/profile' />
   }

    return (
        <div>
            <h2>LOGIN</h2>
            <LoginReduxForm onSubmit={submitLogin} captchaUrl={props.captchaUrl} />
        </div>

    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, {login})(LoginPage)
