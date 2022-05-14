import React, { Component } from "react";
import Login from "../Login/Login";
import { Nav } from "../Nav/Nav";

export class Accueil extends Component {
  render() {
    return (
      <body>
        <Nav></Nav>
        <h2>en développement</h2>
        <Login name="Luca"></Login>
      </body>
    );
  }
}
