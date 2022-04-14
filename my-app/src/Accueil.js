import React from "react"
import iconLoupeBlanc1 from "./assets/iconLoupeBlanc1.png"

const Accueil = (props) => {
    return (
        <div className="div-1">
            <div className="div-2">
                <div className="div-3">
                    <span className="span-1">ReWear.</span>
                    <div className="div-4">
                        <img className="img-1" src={iconLoupeBlanc1} />
                        <span className="span-2">Recherche</span>
                    </div>
                    <span className="span-3">Vendre</span>
                </div>
                <div className="div-5">
                    <div className="div-6">
                        <span className="span-4">Register</span>
                    </div>
                    <div className="div-7">
                        <span className="span-5">Login</span>
                    </div>
                </div>
            </div>
            <div className="div-8">
                <div className="div-9">
                    <span className="span-6">Homme</span>
                    <span className="span-7">Femme</span>
                    <span className="span-8">Enfant</span>
                </div>
                <span className="span-9">A VENIR....</span>
            </div>
        </div>
    )
}
export default Accueil
