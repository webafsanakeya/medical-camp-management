import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://medicamp-server-app.vercel.app/`,
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;