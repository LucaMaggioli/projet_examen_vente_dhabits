import React from "react";
import API from "../../Utils/AxiosInstance";


export default function Accueil() {

    return (
    <>
        <h1>Accueil</h1>
        <h3>En développement</h3>
        <a href={"https://localhost:7175/swagger/index.html"}>Swagger</a><br />

        <p>
            <button onClick={async () => {
                const response = await API.get('https://localhost:7175/User/all');
                if (response.status === 200) {
                    console.log(response.data)
                } else if (response.statusText === 401) {
                    console.log("Il faut vous connecter pour voir les utilisateurs")
                }

            }}
            >
                Test d'accès à user (regarder les log)
            </button>
        </p>

    </>
  );

}
