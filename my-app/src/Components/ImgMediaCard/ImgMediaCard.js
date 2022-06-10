import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard(props) {
    ImgMediaCard.defaultProps = {
        image: 'https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png'
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt=""
                height="140"
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    {props.price}.-
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Voir plus</Button>
            </CardActions>
        </Card>
    );
}
