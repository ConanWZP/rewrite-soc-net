import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    data: '1000',
    headers: {
        "API-KEY": '683aa7c1-ffe3-45e5-bd9a-f2c1d86ca661'
    }
});

export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    followAPI (id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },

    unfollowAPI (id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            })
    },
}


export const profileAPI = {
    getProfile (userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
            .then(response => {
                return response.data
            })
    },
    updateStatus (status) {
        return instance.put(`profile/status`, {status: status})
            .then(response => {
                return response.data
            })
    },
    savePhoto (file) {
        const formData = new FormData();
        formData.append('image', file)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile) {
        return instance.put(`profile`, profile)
            .then(response => {
                return response.data
            })
    }
}


export const authAPI = {
    getAuthData () {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
    },

    login (email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => {
                return response.data
            })
    },
    logout () {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
    }
}

export const securityAPI = {

    getCaptchaUrl () {
        return instance.get(`security/get-captcha-url`)
            .then(response => {
                return response.data
            })
    }
}