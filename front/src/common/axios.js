import axios from 'axios'

var fetch = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? 'http://localhost:3100/' : '/',
    // withCredentials : false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    timeout : 20000,
})

fetch.interceptors.response.use(function (res) {
    if(res.data && res.data.code == 0){
        return Promise.resolve(res.data);
    }else{
        if(res.data && res.data.code && res.data.code == 20003){
        }        
        return Promise.reject('Response Error！(*^▽^*)');
    };
}, function (error) {
    console.log(error);
    return Promise.reject({
        message : error.message
    });
});


export default fetch;
