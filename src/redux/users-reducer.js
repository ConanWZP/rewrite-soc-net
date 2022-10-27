import {usersAPI} from "../API/api";
import {newObject, updateObjectInArray} from "../utilc/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    usersData: [
        /*{
            userId: 1,
            photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
            followed: false,
            fullName: 'Dmitry',
            status: 'I am looking for a Job right now...',
            location: {country: 'Belarus', city: 'Minsk'}
        },
        {
            userId: 2,
            photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
            followed: false,
            fullName: 'Sasha',
            status: 'Try to find it...',
            location: {country: 'Russia', city: 'Moscow'}
        },
        {
            userId: 3, photoUrl: 'https://nashregion36.ru/wp-content/uploads/2021/02/75121877379_o.jpg',
            followed: true, fullName: 'Andrew', status: 'Preparing...', location: {country: 'Ukraine', city: 'Kiev'}
        },*/

    ],
    pageSize: 20,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],


}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                /*usersData: state.usersData.map((user) => {
                    if (user.id === action.id) {
                        return {
                            ...user,
                            followed: true
                        }
                    }
                    return user
                })*/
                usersData: updateObjectInArray(state.usersData, action.id, 'id', {followed: true})
            }

        case UNFOLLOW:

            return {
                ...state,
                /*usersData: state.usersData.map((user) => {
                    if (user.id === action.id) {
                        return {
                            ...user,
                            followed: false
                        }
                    }
                    return user
                })*/
                usersData: updateObjectInArray(state.usersData, action.id, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                usersData: action.usersData
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUserCount: action.totalUsers,
            }
        case SET_CURRENT_PAGE:

            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }


        default:
            return state
    }

}

/*export const addPost = (postText) => {
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
}*/

export const followSuccess = (id) => {
    return {
        type: FOLLOW,
        id
    }
}

export const unfollowSuccess = (id) => {
    return {
        type: UNFOLLOW,
        id
    }
}

export const setUsers = (usersData) => {
    return {
        type: SET_USERS,
        usersData
    }
}

export const setTotalUsersCount = (totalUsers) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsers
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}


export const toggleIsFollowingProgress = (isFetching, id) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        id
    }
}


export const getUserTh = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize)

        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const followInGeneral = async (dispatch, id, methodAPI, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, id))
    let data = await methodAPI(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgress(false, id))
}



export const follow = (id) => {
    return async (dispatch) => {
        /*dispatch(toggleIsFollowingProgress(true, id))
        let data = await usersAPI.followAPI(id)
        if (data.resultCode === 0) {
            dispatch(followSuccess(id))
        }
        dispatch(toggleIsFollowingProgress(false, id))*/
        dispatch(followInGeneral(dispatch, id, usersAPI.followAPI.bind(usersAPI), followSuccess))
    }
}


export const unfollow = (id) => {
    return async (dispatch) => {
        /*dispatch(toggleIsFollowingProgress(true, id))
        let data = await usersAPI.unfollowAPI(id)
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(id))
        }
        dispatch(toggleIsFollowingProgress(false, id))*/
        dispatch(followInGeneral(dispatch, id, usersAPI.unfollowAPI.bind(usersAPI), unfollowSuccess))
    }
}



/*
export const getUser = (currentPage, pageSize) => {
    return async (dispatch) => {


        let data = await usersAPI.getUsers(currentPage, pageSize)
    }
}*/


export default usersReducer;