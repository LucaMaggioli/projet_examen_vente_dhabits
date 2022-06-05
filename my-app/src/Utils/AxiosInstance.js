import axios from 'axios'
import Cookies from "universal-cookie";

const cookies_token = new Cookies();

const authToken = cookies_token.get('jwt', '/') ? cookies_token.get('jwt', '/') : null;

export default axios.create(
    {
        baseUrl:'https://localhost:7175',
        headers:{Authorization: 'Bearer ' + authToken}
    }
);






