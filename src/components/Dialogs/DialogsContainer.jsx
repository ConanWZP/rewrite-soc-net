import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {sendMessage} from "../../redux/dialogs-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
    }
}

/*const DialogsContainer = withAuthRedirect(connect(mapStateToProps, {sendMessage})(Dialogs));*/


const DialogsContainer = compose(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessage})
)(Dialogs)

export default DialogsContainer;