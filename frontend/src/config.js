import axios from 'axios';;

export const axiosInstance = axios.create({
    baseURL: "https://vov-workout-app.herokuapp.com/api"
});