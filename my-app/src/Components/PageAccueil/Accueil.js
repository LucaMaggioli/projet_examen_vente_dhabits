import React, {useContext, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";


export default function Accueil() {
    const [users, setUsers] = useState([]);
    const { request, accessToken, isAuthenticated,isAdmin, isPremium} =
        useContext(ReWearApiContext);

    async function reloadProfil() {
        let response = await request("/User/all", "GET", null, accessToken);
        console.log(response);
    }

    const handleCallback = (childData) => {
        console.log(childData);
    };

    return (
    <>
        <h1>Accueil</h1>
        <h3>
            Bienvenue sur ReWear, un service de revente d'habits
        </h3>

        <p>
            Sur cette version de l'application, il est possible de mettre en vente 5 habits en même temps. (après s'être crée un compte)<br/>
            Pour visionner les habits déjà mis en vente, il suffit de cliquer sur son profil
        </p>

        <p>
            Pour mettre en vente un nombre infini d'habits, il est possible d'acheter des packs premium. Disponible sur le profil utilisateur
        </p>

        {/*{isAuthenticated === true &&(*/}
        {/*    <>*/}
        {/*        <h2>Profil des utilisateurs</h2>*/}

        {/*        {profils.map((profil) => (*/}
        {/*            <DressCard*/}
        {/*                profil={profil}*/}
        {/*                id={profil.id}*/}
        {/*                name={profil.name}*/}
        {/*                parentCallback={handleCallback}*/}
        {/*            ></DressCard>*/}
        {/*        ))}*/}

        {/*    </>*/}
        {/*    )}*/}
        <p>
            <a href={"https://localhost:7175/swagger/index.html"}>Swagger</a>
        </p>

        <p>
            <button onClick={async () => {
                let response = await request('/User/All', 'GET', null ,accessToken)
                setUsers(response)
                console.log(response)
            }}
            >
                Test d'accès à user (regarder les log)
            </button>

            <button onClick={async () => {
                console.log("isAdmin: " + isAdmin)
                console.log("isPremium: " + isPremium)
                console.log("isAuthenticated: " + isAuthenticated)
            }}
            >
                Test State
            </button>
        </p>

        <div>
            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.userName}>{user.userName}</li>
                    ))}
                </ul>
            )}
        </div>

    </>
  );
}
