import axios from "axios";

axios.defaults.baseURL = "http://localhost";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
