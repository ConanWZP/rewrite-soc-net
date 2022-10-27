import React from "react";
import styles from './Users.module.css'
import User from "./User";
import Paginator from "../../Common/Paginator/Paginator";

const Users = ({users, ...props}) => {

    return (
        <div className={styles.wrapper}>
            <Paginator totalUserCount={props.totalUserCount} onPageChanged={props.onPageChanged}
                       currentPage={props.currentPage} pageSize={props.pageSize}/>
            {users.map((user) =>
                <User user={user} {...props}
                      unfollow={props.unfollow}
                      follow={props.follow}/>
                )}

        </div>
    )
}

export default Users;