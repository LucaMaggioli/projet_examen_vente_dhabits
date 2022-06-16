import React, { useContext } from "react";

import "./Nav.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ReWearApiContext } from "../../Services/ReWearApiContext";

export default function Nav() {
  let navigate = useNavigate();
  const { loggedUser, logOut, isAdmin } = useContext(ReWearApiContext);

  //render() {
  return (
    <div id={"nav"}>
      <div id={"nav_gauche"}>
        <div id={"title"} onClick={() => navigate("/")}>
          ReWear.
        </div>

        {/*<div id={"search"}>*/}
        {/*  <img*/}
        {/*    id={"loupe"}*/}
        {/*    src={require("../../assets/iconLoupeBlanc1.png")}*/}
        {/*    alt="loupe"*/}
        {/*  />*/}
        {/*  Recherche*/}
        {/*</div>*/}

        {loggedUser !== null && (
          <div id={"sell"} onClick={() => navigate("/sell")}>
            Vendre
          </div>
        )}
        {isAdmin && (
          <div id={"admin"} onClick={() => navigate("/admin")}>
            Admin
          </div>
        )}
      </div>

      <div id={"nav_droite"}>
        <div id={"userName"}>
          {loggedUser != null && (
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => {
                navigate("/profil");
              }}
            >
              {loggedUser}
            </Button>
          )}
        </div>

        {loggedUser === null && (
          <div id={"signup"}>
            <Button
              variant={"contained"}
              color={"secondary"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              S'inscrire
            </Button>
          </div>
        )}

        <div id={"login"}>
          <Button
            variant={"text"}
            color={"background"}
            onClick={
              loggedUser === null ? () => navigate("/login") : () => logOut()
            }
          >
            {loggedUser === null ? "login" : "logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
//}
