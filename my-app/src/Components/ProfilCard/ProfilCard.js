import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


export default function ProfilCard(props) {

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

            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <h3>
                          {props.name}
                       </h3>

                    </Grid>
                </Grid>
            </Grid>
        </Paper>

    );
}
