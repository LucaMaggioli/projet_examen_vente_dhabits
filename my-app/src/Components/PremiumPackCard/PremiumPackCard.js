import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";

export default function PremiumPackCard(props) {

    const onTrigger = (event) => {
        props.parentCallback(props.pack);
        event.preventDefault();
    }

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >


            <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <h3>
                               {props.name}
                            </h3>
                            <Typography variant="body2" gutterBottom>
                                {props.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Valable {props.validityDays} jour(s)
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                href=""
                                disabled={props.isPremium === true}
                                onClick={onTrigger}>

                                {props.isPremium !== true ? "Acheter" : "Déjà Premium"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {props.price}.-
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

        </Paper>

    );
}
