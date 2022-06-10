import React, {useContext, useEffect, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";
import DressCard from "../DressCard/DressCard";
import Grid from "@mui/material/Grid";


export default function Profil() {
    const [dresses, setDresses] = useState([]);
    const { request, accessToken } =
        useContext(ReWearApiContext);

    useEffect(async () => {
        let response = await request('/User/me/dresses', 'GET', null, accessToken)
        setDresses(response)
    }, []);

    return(
        <>
            <h1>Profil</h1>
            <h2>Dressing</h2>

            {dresses.length > 0 && (
                <ul>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            {dresses.map(dress => (
                                <DressCard name={dress.name} description={dress.description} price={dress.price}></DressCard>
                            ))}
                        </Grid>
                        <Grid item xs={8}>
                            Salut
                        </Grid>
                    </Grid>

                </ul>
            )}
        </>
    )

}


