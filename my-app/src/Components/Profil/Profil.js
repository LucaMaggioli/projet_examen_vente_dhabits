import React, {useContext, useEffect, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";

export default function Profil() {
    const [dresses, setDresses] = useState([]);
    const { request, accessToken } =
        useContext(ReWearApiContext);

    useEffect(async () => {
        console.log('get user dresses')

        let response = await request('/User/me/dresses', 'GET', null, accessToken)
        setDresses(response)
        console.log(response)
    }, []);

    return(
        <>
            <h1>Profil</h1>
            <h2>Dressing</h2>
            {dresses.length > 0 && (
                <ul>
                    {dresses.map(dress => (
                        <li key={dress.id}>{dress.name}</li>
                    ))}
                </ul>
            )}
        </>
    )

}


