import React, { Component } from "react";
import "./Nav.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  let navigate = useNavigate();

  //render() {
  return (
    <div id={"nav"}>
      <div id={"nav_gauche"}>
        <div id={"title"} onClick={() => navigate("/")}>
          ReWear.
        </div>
        <div id={"search"}>
          <img
            id={"loupe"}
            src={require("../../assets/iconLoupeBlanc1.png")}
            alt="loupe"
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
              navigate("/singin");
            }}
          >
            S'inscrire
          </Button>
        </div>

        <div id={"login"}>
          <Button
            variant={"text"}
            color={"background"}
            onClick={() => navigate("/login")}
          >
            Connexion
          </Button>
        </div>
      </div>
    </div>
  );
}
//}
