import axios from "axios";

const axioInstance  = axios.create({
    baseURL: import.meta.env.VITE_API_URL

})

export default axioInstance;