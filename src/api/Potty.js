import axios from 'axios';
// axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const endpoint = "http://127.0.0.1:8000/"

const PottyIndex = (pos) => {
    // axios.defaults.withCredentials = false;
    return axios.get(endpoint+'potty/'+pos.lat+'/'+pos.lng);
}
const PottyCreate = (body) => {
    // axios.defaults.withCredentials = true;
    return axios.post(endpoint+'potty', body);
}
const PottyGet = (id) => {
    return axios.get(endpoint+`potty/${id}`);
}
const PottyUpdate = (id, body) => {
    return axios.put(endpoint+`potty/${id}/update`, body)
}  

export default {
    PottyIndex,
    PottyCreate,
    PottyGet,
    PottyUpdate
}