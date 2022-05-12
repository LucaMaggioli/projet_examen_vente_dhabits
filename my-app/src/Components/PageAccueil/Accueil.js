import React, {Component} from "react";
import {Button} from "@mui/material";
import './Accueil.css';
import {Nav} from "../Nav/Nav";

export class Accueil extends Component {
    render() {
        return (
            <div>
                <body>
                <div id={'header'}>
                    <Nav></Nav>
                </div>
                </body>
            </div>
        );
    }
}
