import axios from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
    const baseURL = nuxtApp.$config.public.apiBase;
    axios.defaults.baseURL = baseURL;
    // Initialize Axios instance with baseURL
    const instance = axios.create({
        baseURL: baseURL,
    });

    // Add request interceptor to set headers
    instance.interceptors.request.use((config) => {
        const accessToken = getCookie("token"); // Replace with your actual access token or logic to get the token dynamically
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    });
    console.log("NuxtApp => ", nuxtApp);

    return {
        provide: {
            axios: axios,
        },
    };
});
