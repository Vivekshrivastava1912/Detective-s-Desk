import axios from "axios";
import SummaryApi, { baseURL } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// 1. REQUEST INTERCEPTOR: Access Token bhejne ke liye
Axios.interceptors.request.use(
    async (config) => {
        const accesstoken = localStorage.getItem('accesstoken');
        if (accesstoken) {
            config.headers.Authorization = `Bearer ${accesstoken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 2. RESPONSE INTERCEPTOR: Refresh Token logic yahan aayega
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        let originRequest = error.config;

        // Status 401 check karna (Unauthorized)
        if (error.response && error.response.status === 401 && !originRequest._retry) {
            originRequest._retry = true; // Retry flag set karna

            const refreshtoken = localStorage.getItem("refreshtoken"); // Mistake Fixed: getItem use karein

            if (refreshtoken) {
                const newAccesstoken = await refreshAccessToken(refreshtoken);
                
                if (newAccesstoken) {
                    originRequest.headers.Authorization = `Bearer ${newAccesstoken}`;
                    return Axios(originRequest); // Request dubara bhejna
                }
            }
            
            // Agar refresh token bhi fail ho jaye toh logout karwa sakte hain
            // localStorage.clear();
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

const refreshAccessToken = async (refreshtoken) => {
    try {
        // Alag axios instance ya basic axios use karein taaki interceptor loop na bane
        const response = await axios({
            ...SummaryApi.refreshtoken, 
            baseURL: baseURL,
            headers: {
                Authorization: `Bearer ${refreshtoken}`
            }
        });

        const accesstoken = response.data.data.accesstoken;
        localStorage.setItem('accesstoken', accesstoken);
        return accesstoken;
    } catch (error) {
        console.log("Refresh token expired or invalid", error);
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshtoken');
        return null;
    }
}

export default Axios;