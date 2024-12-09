import axios, {AxiosResponse} from "axios";

const baseURL = "https://shanyraqnew-production.up.railway.app/api";
// const baseURL = "https://45dc765d1a323efcb16c1010b990f3ca.serveo.net/api";
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Optional timeout for requests
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization header if token exists
        const token = localStorage.getItem('token');
        console.log('token:', token);
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error here
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // Handle the response data here (if needed)
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response) {
            // Handle different status codes
            if (error.response.status === 401) {
                // Example: Redirect to login page or refresh the token
                console.warn('Unauthorized, redirecting to login...');
                // Handle logout or redirection logic here
            }
            // Add other status code handling as needed
        } else if (error.request) {
            // Handle no response from server (network error)
            console.error('No response from server:', error.request);
        } else {
            // Something else happened
            console.error('Response error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

