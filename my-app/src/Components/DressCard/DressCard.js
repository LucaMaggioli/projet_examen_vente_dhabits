import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, IconButton} from "@mui/material";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function DressCard(props) {
    DressCard.defaultProps = {
        image: 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png'
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
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={props.image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {props.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" href="#">
                                Voir plus
                            </Button>
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
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
