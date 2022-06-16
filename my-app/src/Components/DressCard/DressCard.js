import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function DressCard(props) {
  const onTrigger = (event) => {
    props.parentCallback(JSON.stringify(props.dress));
    event.preventDefault();
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.imageUrl} />
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
            {!props.previewMode && (
              <Grid item>
                <Button variant="outlined" href="" onClick={onTrigger}>
                  Voir plus
                </Button>
              </Grid>
            )}
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
