import Axios from 'axios';

const onErrorResponse = (error) => {
    console.log(error);
    // error.response.status == 500 ? router.push('/error') : false
    return Promise.reject(error.response);
};
const onResponse = (response) => {
    return response;
};

const urlServices = function () {
    const axiosInstance = Axios.create({
        baseURL: 'https://api.api-ninjas.com/v1/randomword',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': 'L1Y+oV0C5EyPnYBtMetOag==M8Zga67TfZEfGM3C'
        }
    });
    axiosInstance.interceptors.response.use(onResponse, onErrorResponse);
    axiosInstance.interceptors.request.use(
        (onRequest) => {
            // onRequest.headers.Authorization = `Bearer ${storageService.getToken()}`
            return onRequest;
        },
        (error) => Promise.reject(error.response)
    );
    return axiosInstance;
};

const urlServicesBack = urlServices();
export { urlServicesBack };
