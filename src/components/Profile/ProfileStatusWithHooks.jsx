import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let onChangeStatus = (btn) => {
        setStatus(btn.currentTarget.value)
    }

    let activateMode = () => {
        setEditMode(true)
    }

    let deActivateMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    return (
        <div>
            {!editMode  && <span onClick={activateMode}>{props.status ? props.status : 'Статуса нет'}</span>}
            {editMode && <input onChange={onChangeStatus} autoFocus={true} onBlur={deActivateMode} value={status}/>}
        </div>
    )
}

/*class ProfileStatusWithHooks extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateMode = () => {
        this.setState( {
            editMode: true
        });
    }


}*/


export default ProfileStatusWithHooks