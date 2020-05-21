import axios from 'axios';
// axios.defaults.withCredentials = true;
const endpoint = "http://127.0.0.1:8000/"

const PottyIndex = () => {
    return axios.get(endpoint+'potty')
}

export default {
    PottyIndex,
}