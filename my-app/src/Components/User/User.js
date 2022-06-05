import API from '../../Utils/AxiosInstance';
import {render} from "react-dom";


export default async function User() {
    const response = await API.get('https://localhost:7175/User/all');

    render()
    {

        if (response.status === 200) {
            return <h3>test</h3>;
        } else if (response.statusText === 'Unauthorized') {
            return <h3>Il faut vous connecter pour avoir accès aux utilisateurs</h3>
        }
    }

}
