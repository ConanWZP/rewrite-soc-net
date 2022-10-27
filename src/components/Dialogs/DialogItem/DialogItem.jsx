import React from "react";
import styles from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


const activeClass = ({isActive}) => {
    return (
        isActive ? styles.activeLink : ''
    )
}




const DialogItem = (props) => {


    return (
        <div className={styles.dialog + " " + styles.active}>
            <NavLink to={'/dialogs/' + props.id} className={activeClass}>{props.userName}</NavLink>
        </div>
    )
}

export default DialogItem
