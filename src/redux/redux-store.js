import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import { reducer as formReducer } from "redux-form";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from 'redux-thunk';
import appReducer from "./app-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    form: formReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});



const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store