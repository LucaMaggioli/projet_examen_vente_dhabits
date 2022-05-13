import React, {Component} from "react";
import {Button} from "@mui/material";
import './Nav.css';

export class Nav extends Component {
    render() {
        return (
            <div id={'nav'}>
                <div id={'nav_gauche'}>
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
                </div>

                <div id={'nav_droite'}>
                    <div id={'register'}>
                        <Button variant="contained" color={"secondary"}>S'inscrire</Button>
                    </div>
                    <div id={'login'}>
                        <Button variant="text" color={"background"}>Connexion</Button>
                    </div>
                </div>
            </div>
            // <div id={'nav'}>
            //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //         <div className="container-fluid">
            //             <a className="navbar-brand" href="#">ReWear</a>
            //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            //                     data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
            //                     aria-expanded="false" aria-label="Toggle navigation">
            //                 <span className="navbar-toggler-icon"></span>
            //             </button>
            //             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            //                 <div className="navbar-nav">
            //                     <a className="nav-link active" aria-current="page" href="#">Accueil</a>
            //                     <a className="nav-link" href="#">Recherche</a>
            //                     <a className="nav-link" href="#">Vendre</a>
            //                 </div>
            //             </div>
            //         </div>
            //
            //         <button type="button" className="btn btn-primary">Inscription</button>
            //         <button type="button" className="btn btn-link">Connection</button>
            //     </nav>
            //
            //     <nav className="nav">
            //         <a className="nav-link active" aria-current="page" href="#">Homme</a>
            //         <a className="nav-link active" aria-current="page" href="#">Femme</a>
            //         <a className="nav-link active" aria-current="page" href="#">Enfant</a>
            //     </nav>
            //
            // </div>
        );
    }
}
