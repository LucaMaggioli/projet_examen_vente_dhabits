import React, {useContext, useState} from "react";
import {ReWearApiContext} from "../../Services/ReWearApiContext";


export default function Accueil() {
    const [users, setUsers] = useState([]);
    const { request, accessToken, isAdmin, isPremium} =
        useContext(ReWearApiContext);

    return (
    <>
        <h1>Accueil</h1>
        <h3>En développement</h3>
        <a href={"https://localhost:7175/swagger/index.html"}>Swagger</a><br />

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
