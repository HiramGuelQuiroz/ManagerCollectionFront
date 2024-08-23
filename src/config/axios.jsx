import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default axiosClient;

//creates an Axios instance configured to interact with an API 
//on a server whose URL is specified in the VITE_BACKEND_URL environment variable