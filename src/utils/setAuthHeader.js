// sets the JWT to the authorization header for every API call
import axios from 'axios';

const setAuthHeader = (JWT) => {
  if (JWT) {
    axios.defaults.headers.common['Authorization'] = JWT;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthHeader;