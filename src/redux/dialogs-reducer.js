const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogsData: [
        { userId: 1, userName: 'Бодик'},
        { userId: 2, userName: 'Коля'},
        { userId: 3, userName: 'Оля'},
    ],

    messagesData: [
        { userId: 1, message: 'Hi'},
        { userId: 2, message: 'How are you?'},
        { userId: 3, message: 'I am fine'},
    ],
}

const dialogsReducer = (state=initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                userId: 4,
                message: action.textOfMessage
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        default: return state
    }
}

export const sendMessage = (textOfMessage) => {
    return {
        type: SEND_MESSAGE,
        textOfMessage
    }
}


export default dialogsReducer;