import React from "react";
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {sendMessage} from "../../redux/dialogs-reducer";
import {maxLengthControl, required} from "../../utilc/validators/validator";
import {Element} from "../../Common/FormsControls/FormsControls";

const Textarea = Element('textarea');

const Dialogs = (props) => {

    const dialogsItems = props.dialogs.map(e => {
        return (
            <DialogItem userName={e.userName} id={e.userId} key={e.userId} />
        )
    });

    const messagesItems = props.messages.map(e => {
        return (
            <Message message={e.message} key={e.userId} />
        )
    })

    const submitMessage = (formData) => {

        props.sendMessage(formData.message);
        formData.message = '';
    }

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogItems}>
                {dialogsItems}

            </div>

            <div className={styles.messages}>
                {messagesItems}

            </div>
            <MessageReduxForm onSubmit={submitMessage} />
        </div>
    )
}

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'message'} component={Textarea} placeholder={'send'} validate={[required, maxLengthControl(20)]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const MessageReduxForm = reduxForm({

    form: 'newForm'
})(MessageForm)

export default Dialogs