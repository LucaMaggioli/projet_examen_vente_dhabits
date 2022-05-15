import React, { Component } from "react";
import "./Nav.css";
import { Button } from "@mui/material";

export class Nav extends Component {
  render() {
    return (
      <div id={"nav"}>
        <div id={"nav_gauche"}>
          <div id={"title"}>ReWear.</div>
          <div id={"search"}>
            <img
              id={"loupe"}
              src={require("../../assets/iconLoupeBlanc1.png")}
            />
            Recherche
          </div>
          <div id={"sell"}>Vendre</div>
        </div>

        <div id={"nav_droite"}>
          <div id={"register"}>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => {
                console.log("should go into /signing route");
              }}
            >
              S'inscrire
            </Button>
          </div>

          <div id={"login"}>
            <Button variant={"text"} color={"background"}>
              Connexion
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
