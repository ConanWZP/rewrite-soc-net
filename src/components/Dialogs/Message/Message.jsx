import React from "react";
import styles from "./../Dialogs.module.css"



const Message = (props) => {
    return (
        <div className={styles.message}>
            <div className={styles.messageTaken}>{props.message}</div>
            <div className={styles.messageSent}>{props.message}</div>
        </div>
    )
}



export default Message;


