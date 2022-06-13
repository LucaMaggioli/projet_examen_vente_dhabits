import React, {useContext, useEffect, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";
import DressCard from "../DressCard/DressCard";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import {Stack} from "@mui/material";

export default function Profil() {
    const [dresses, setDresses] = useState([]);
    const [selectedDress, setSelectedDress] = useState([]);
    const { request, accessToken } =
        useContext(ReWearApiContext);

    useEffect(async () => {
        let response = await request('/User/me/dresses', 'GET', null, accessToken)
        setDresses(response)
        console.log(response);

    }, []);

    const handleCallback = (childData) =>{
        setSelectedDress(childData);
        console.log(childData);
    }

    return(
        <>
            <h1>Profil</h1>
            <h2>Dressing</h2>

            {dresses.length > 0 && (
                <ul>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            {dresses.map(dress => (
                                <DressCard dress={dress} id={dress.id} name={dress.name} description={dress.description} price={dress.price} parentCallback={handleCallback}></DressCard>
                            ))}
                        </Grid>
                        <Grid item xs={8}>
                            {selectedDress.length > 0 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={8}>
                                        <h1>{JSON.parse(selectedDress).name}</h1>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <h1>{JSON.parse(selectedDress).price} .-</h1>
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={JSON.parse(selectedDress).image}
                                            alt="photo"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                        <h3>{JSON.parse(selectedDress).description}</h3>
                                    </Grid>
                                    <Grid item xs={6} md={8}>
                                        <h2>{JSON.parse(selectedDress).healthState}</h2>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <h2>{JSON.parse(selectedDress).size}</h2>
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" endIcon={<ModeIcon />}>
                                                Modifier
                                            </Button>
                                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                                Supprimer
                                            </Button>
                                        </Stack>
                                    </Grid>

                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                </ul>
            )}
        </>
    )

}


