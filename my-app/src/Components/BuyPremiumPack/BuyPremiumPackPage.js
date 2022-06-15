import React, { useState, useContext, UseEffect } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";

import Cookies from "universal-cookie";

export default function BuyPremiumPackage(props) {
  const [email, setEmail] = useState("space@mail.ch");

  //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
  const { accessToken, logIn, logOut, request } = useContext(ReWearApiContext);
  console.log("in login ->", accessToken);
  UseEffect();

  return (
    <>
      <h1>Hello, {props.name}</h1>
    </>
  );
}
