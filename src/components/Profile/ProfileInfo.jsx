import React, {useState} from 'react';
import styles from './Profile.module.css';
import UserPhoto from '../../assets/images/userok.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    const onMainPhotoSelected = (e) => {
        if (e.target.value.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    let [editMode, setEditMode] = useState(false);

    let submitProfileInfo = (formData) => {

        props.saveProfile(formData)
            .then(()=> {
                setEditMode(false)
            })
    }

    return (
        <div>
            <div className={styles.back}>
                <img
                    src="https://avatars.mds.yandex.net/i?id=76321bb169d320288bb9eefeb54566a7-5876563-images-thumbs&n=13"
                    alt=""/>
            </div>
            <div className={styles.descriptionBlock}>
                <div className={styles.avatar}>
                    <img src={props.profile.photos.large || UserPhoto}/>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                </div>
                {editMode
                    ? <ProfileDataReduxForm initialValues={props.profile} onSubmit={submitProfileInfo} profile={props.profile} isOwner={props.isOwner} />
                    : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={() => {setEditMode(true)} }/>
                }
            </div>
        </div>
    )
}


const ProfileData = (props) => {
    return (
        <div className={styles.description}>
            <div>{props.isOwner ? <button onClick={props.goToEditMode}>Edit</button> : ''}</div>
            <span className={styles.nameOfUser}>{props.profile.fullName}</span>
            <span className={styles.aboutMe}>Обо мне: {props.profile.aboutMe}</span>
            <span><b>Мои социальные сети:</b></span>
            <ul className={styles.contacts}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}
            </ul>

            <span><b>Looking for a job:</b> {props.profile.lookingForAJob ? 'Ищу работу' : 'Не ищу работу'}</span>
            <span><b>My professional skills:</b> {props.profile.lookingForAJob ? props.profile.lookingForAJobDescription : 'Не ищу'}</span>

        </div>
    )
}


const Contact = ({contactTitle, contactValue}) => {
    return (
        <div>
            <b>{contactTitle}</b>: {contactValue ? contactValue : 'Отсутствует'}
        </div>
    )
}

export default ProfileInfo;