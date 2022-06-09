import React, {useContext, useEffect, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";
import ImgMediaCard from "../ImgMediaCard/ImgMediaCard";

export default function Profil() {
    const [dresses, setDresses] = useState([]);
    const { request, accessToken } =
        useContext(ReWearApiContext);

    useEffect(async () => {
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
                        <ImgMediaCard name={dress.name} description={dress.description} price={dress.price}></ImgMediaCard>
                        //<li key={dress.id}>{dress.name}</li>
                    ))}
                </ul>
            )}
        </>
    )

}


