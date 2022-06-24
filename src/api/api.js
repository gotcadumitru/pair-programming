import axios from "axios";
import { REQUEST_STATUS } from "../defaults/requestStatus.defaults";

const MESSAGES = {
    [REQUEST_STATUS.SUCCESS]: "au fost primite cu succes",
    [REQUEST_STATUS.FAIL]: "au nu fost primite",
    [REQUEST_STATUS.IN_PROGRESS]: " sunt in progres de procesare"
}

const api = axios.create({
    baseURL: 'https://team-backend-c.herokuapp.com/',
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmE5NmYwZGMwNDhhODIxMWNmZjcxMDUiLCJpYXQiOjE2NTUyNzgyMjl9.C2RLvNsMpiQaZrWe9D09DE-8BKbypAUt8dnl0tTpvMs"
    }
})

api.interceptors.request.use((config) => {
    const { setRequestStatus, requestFor } = config
    setRequestStatus({ status: REQUEST_STATUS.IN_PROGRESS, message: `${requestFor} ${MESSAGES.IN_PROGRESS}` })
    return config;

}, (error) => {
    const { setRequestStatus, requestFor } = error?.config
    setRequestStatus({ status: REQUEST_STATUS.FAIL, message: `${requestFor} ${MESSAGES.FAIL}` })
    // Do something with request error
    return Promise.reject(error);
});


api.interceptors.response.use(function (response) {
    const { setRequestStatus, requestFor } = response.config
    setRequestStatus({ status: REQUEST_STATUS.SUCCESS, message: `${requestFor} ${MESSAGES.SUCCESS}` })
    return response;
}, (error) => {
    console.log(error)
    const { setRequestStatus, requestFor } = error.response.config
    setRequestStatus({ status: REQUEST_STATUS.FAIL, message: `${requestFor} ${MESSAGES.FAIL}` })
    return Promise.reject(error);
});

export default api;