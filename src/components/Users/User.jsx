import React from "react";
import styles from './Users.module.css'
import {NavLink} from "react-router-dom";
import UserPhoto from '../../assets/images/userok.jpg';
import {usersAPI} from "../../API/api";
import {follow, toggleIsFollowingProgress} from "../../redux/users-reducer";

const User = ({user, ...props}) => {
    return (
        <div className={styles.block}>
            <div className={styles.leftSide}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small ? user.photos.small : UserPhoto}
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button className={styles.btn} disabled={props.followingInProgress.some(id => id === user.id)}
                                onClick={()=>{
                            /*props.toggleIsFollowingProgress(true, user.id)
                            usersAPI.unfollowAPI(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.unfollowSuccess(user.id)
                                    }
                                    props.toggleIsFollowingProgress(false, user.id)
                                    })*/
                                    props.unfollow(user.id)

                        }}>Unfollow</button>

                        : <button className={styles.btn} disabled={props.followingInProgress.some(id => id === user.id)}
                                  onClick={()=>{
                            /*props.toggleIsFollowingProgress(true, user.id)
                            usersAPI.followAPI(user.id)
                                .then(data => {
                                    if (data.resultCode === 0) {
                                        props.followSuccess(user.id)
                                    }
                                    props.toggleIsFollowingProgress(false, user.id)
                                })*/
                                      props.follow(user.id)
                        }}>Follow</button>}
                </div>
            </div>
            <div className={styles.blockInfo}>
                <div className={styles.about}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div className={styles.place}>
                    <div>{'user.location.country'}</div>
                    <div>{'user.location.city'}</div>
                </div>
            </div>
        </div>
    )
}

export default User;