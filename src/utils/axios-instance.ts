import { AC_KEY } from "@/utils/constants.ts";
import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const devModeEnabled =
  import.meta.env.VITE_REACT_APP_DEV_MODE === "true" ? true : false;

// let refreshTokenCount = 0;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(AC_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (devModeEnabled) {
      console.log("🚀 ~ devModeEnabled:", devModeEnabled);
      const fakeToken = import.meta.env.VITE_REACT_APP_DEV_TOKEN;
      config.headers.Authorization = `Bearer ${fakeToken}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// // Function to refresh the JWT token
// export const refreshAccessToken = async () => {
//   refreshTokenCount++;
//   try {
//     const response = await axiosInstance.put(
//       `https://bot-7u3bw.ondigitalocean.app/users/refresh_token`
//     );
//     if (response?.data) {
//       const newAccessToken = response.data;

//       // Store the new access token in your preferred storage (e.g., localStorage)
//       localStorage.setItem(AC_KEY, newAccessToken.access_token);

//       refreshTokenCount = 0;
//       // Update the axios instance with the new access token
//       axiosInstance.defaults.headers.common.Authorization = `${newAccessToken.access_token}`;
//     }
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     localStorage.removeItem("accessToken");
//   }
// };

// // Add a response interceptor to handle token expiration
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       refreshTokenCount < 3
//     ) {
//       // Token expired or unauthorized, attempt to refresh the token
//       await refreshAccessToken();
//       // Retry the original request
//       return axiosInstance(error.config);
//     }

//     // If the refresh token fails or another error occurs, handle it here
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
