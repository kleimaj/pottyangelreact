import axios from 'axios';
// axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const endpoint = "http://127.0.0.1:8000/"

const PottyIndex = () => {
    // axios.defaults.withCredentials = false;
    return axios.get(endpoint+'potty')
}
const PottyCreate = (body) => {
    // axios.defaults.withCredentials = true;
    return axios.post(endpoint+'potty', body)
}

export default {
    PottyIndex,
    PottyCreate
}