export const baseURL = "http://localhost:8000"


const SummaryApi = {

     register: {
        url: '/api/user/register',
        method: "post"
    },
    login: {
        url: '/api/user/login',
        method: "post"
    },

    ForgotPassword: {
        url: '/api/user/forget-password',
        method: "put"
    },

    refreshtoken: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "get"
    },
     uploadeImage: {
        url: '/api/file/upload',
        method: "post"
    },

}
export default SummaryApi