import React from 'react';
import styles from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from "../../Common/Preloader/Preloader";
import UserPhoto from '../../assets/images/userok.jpg';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {

    if (!props.profile) {
        return (
            <Preloader/>
        )
    }

    return (

        <div>
            <ProfileInfo {...props} />
            <MyPostsContainer/>
        </div>
    )
}


export default Profile;