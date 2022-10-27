import React from "react";
import styles from "./Profile.module.css";
import {Field, reduxForm} from "redux-form";
import stylesFromFormControl from './../../Common/FormsControls/FormsControls.module.css'
import {Element} from "../../Common/FormsControls/FormsControls";


const Input = Element('input');
const Textarea = Element('textarea');

const ProfileDataForm = (props) => {
    return (
        <form className={styles.description} onSubmit={props.handleSubmit}>
            <div>{props.isOwner ? <button>Save</button> : ''}</div>
            {props.error && <div className={stylesFromFormControl.formConclusionError}>{props.error}</div>}
            <span className={styles.nameOfUser}><Field placeholder={'Full Name'} name={'fullName'} component={Input}/></span>
            <span className={styles.aboutMe}>Обо мне:<Field placeholder={'About Me'} name={'aboutMe'} component={Textarea}/></span>
            <span><b>Мои социальные сети:</b></span>
            <ul className={styles.contacts}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <div>{key}<Field name={'contacts.' + key} placeholder={key} component={Input} /></div>
                })}
            </ul>

            <span><b>Looking for a job:</b><Field name={'lookingForAJob'} type={'checkbox'} component={Input}/></span>
            <span><b>My professional skills:</b><Field name={'lookingForAJobDescription'} component={Textarea}/></span>

        </form>
    )
}

export const ProfileDataReduxForm = reduxForm({

    form: 'edit-profile',
    enableReinitialize : true,
    destroyOnUnmount: false
})(ProfileDataForm)


export default ProfileDataReduxForm