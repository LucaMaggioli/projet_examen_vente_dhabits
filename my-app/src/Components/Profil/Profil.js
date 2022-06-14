import React, {useContext, useEffect, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";
import DressCard from "../DressCard/DressCard";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import {Stack} from "@mui/material";

export default function Profil() {
    const [dresses, setDresses] = useState([]);
    const [selectedDress, setSelectedDress] = useState([]);
    const { request, accessToken } =
        useContext(ReWearApiContext);

    useEffect(async () => {
        await reloadDresses();

    }, []);

    async function reloadDresses() {
        let response = await request('/User/me/dresses', 'GET', null, accessToken)
        setDresses(response)
        setSelectedDress([]);
        console.log(response);
    }
    const handleCallback = (childData) =>{
        setSelectedDress(childData);
        console.log(childData);
    }

    const deleteDress = async (event) => {
        console.log(accessToken);
        if (window.confirm('Voulez vous vraiment supprimer l\'habit ?')) {
            await request('/User/me/dress/' + event.target.id, "DELETE", null, accessToken)
            await reloadDresses();
        }
    };

    return(
        <>
            <h1>Profil</h1>
            <h2>Dressing</h2>

            {dresses.length > 0 && (
                <ul>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            {dresses.map(dress => (
                                <DressCard dress={dress} id={dress.id} name={dress.name} description={dress.description} price={dress.price} category={dress.price} imageUrl={dress.imageUrl !== "" ? dress.imageUrl: "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png"} parentCallback={handleCallback}></DressCard>
                            ))}
                        </Grid>
                        <Grid item xs={8}>
                            {selectedDress.length > 0 && (
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={8}>
                                        <h1>{JSON.parse(selectedDress).name}</h1>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <h2><i>{JSON.parse(selectedDress).price} .-</i></h2>
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            image={JSON.parse(selectedDress).imageUrl !== "" ? JSON.parse(selectedDress).imageUrl : "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png"}
                                            alt="photo"
                                        />
                                    </Grid>
                                    <Grid item xs={6} md={8}>
                                        <h3>Description: </h3>
                                        {JSON.parse(selectedDress).description}
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <h3>Catégorie: </h3>
                                        {JSON.parse(selectedDress).category}
                                    </Grid>
                                    <Grid item xs={6} md={8}>
                                        <h3>État de l'habit: </h3>
                                        {JSON.parse(selectedDress).healthState}
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <h3>Taille: </h3>
                                        {JSON.parse(selectedDress).size}
                                    </Grid>
                                    <Grid item xs={6} md={12}>
                                        <Stack direction="row" spacing={2}>
                                            <Button onClick={deleteDress} id={JSON.parse(selectedDress).id} variant="contained" endIcon={<DeleteIcon />}>
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


