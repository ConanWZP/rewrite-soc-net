import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import profile from "../components/Profile/Profile";

const ADD_POST = 'ADD-POST';
const CHANGE_TEXT_OF_POST = 'CHANGE-TEXT-OF-POST';
const SET_PROFILE = 'SET-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';
const DELETE_POST = 'DELETE-POST'

let initialState = {
    postsData: [
        {userId: 1, message: 'test', like: 15},
        {userId: 2, message: 'First-post', like: 22},
        {userId: 3, message: 'textik', like: 12},
        {userId: 4, message: 'What', like: 10},
    ],
    constText: '',
    profile: null,
    status: '',
}

const profileReducer = (state=initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            /*debugger;*/
            let newPost = {
                userId: 6,
                message: action.postText,

            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                constText: '',
            }
        case CHANGE_TEXT_OF_POST:
            return {
                ...state,
                constText: action.newPostText,
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_USER_STATUS:

            return {
                ...state,
                status: action.status,
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile,
                    photos: action.image}
            }
        case DELETE_POST:

            return {
                ...state,

                postsData: state.postsData.filter(post => post.userId !== action.id)
            }


        default: return state
    }


}

export const addPost = (postText) => {
    return {
        type: ADD_POST,
        postText
    }
}

export const changeTextOfPost = (newPostText) => {
    return {
        type: CHANGE_TEXT_OF_POST,
        newPostText
    }
}

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}


export const getUserProfile = (userId) => {
    return async (dispatch) => {

        let data = await profileAPI.getProfile(userId)
        dispatch(setProfile(data))
    }
}


export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status
    }
}


export const getStatus = (userId) => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {

        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }


    }
}

export const savePhotoSuccess = (image) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        image
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode ===0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}

export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        let data = await profileAPI.saveProfile(profile)
        let userId = getState().auth.id;
        if (data.resultCode === 0) {
            dispatch(getUserProfile(userId))
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
            return  Promise.reject(data.messages[0]);
        }
    }
}


export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }

}

export default profileReducer;