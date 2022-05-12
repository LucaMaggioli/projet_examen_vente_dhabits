import React, {Component} from "react";
import {Button} from "@mui/material";
import './Nav.css';

export class Nav extends Component {
    render() {
        return (
            <div id={'nav'}>

                <div id={'title'}>
                    ReWear.
                </div>
                <div id={'search'}>
                    <img id={'loupe'} src={require('../../assets/iconLoupeBlanc1.png')}/>
                    Recherche
                </div>
                <div id={'sell'}>
                    Vendre
                </div>

                <div id={'nav_droite'}>
                    <div id={'register'}>
                        <Button variant="contained" color={"secondary"}>S'inscrire</Button>
                    </div>
                    <div id={'login'}>
                        <Button variant="contained" color={"secondary"}>Outlined</Button>
                    </div>
                </div>
            </div>
        );
    }
}
