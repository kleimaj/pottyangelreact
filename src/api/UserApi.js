import axios from 'axios';
// axios.defaults.withCredentials = true;
// const endpoint = "http://127.0.0.1:8000/"
const endpoint = "http://potty-angel-api.eba-pi3mp22f.us-west-2.elasticbeanstalk.com/"


const register = (user) => {
    return axios.post(`${endpoint}user/create`, user)
    //   .then(res => res);
}
  
const login = (user) => {
    return axios.post(`${endpoint}obtain_token`, user)
// user => {
	// "username":"testUser3",
	// "password":"1234"
// }
    // .then(res => res);
}

const verify = () => {
    return axios.get(`${endpoint}user/update`)
    // .then(res => res);
}

export default {
    register,
    login,
    verify
}