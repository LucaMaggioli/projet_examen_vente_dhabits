import React, { useState, useContext } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";
import API from "../../Utils/AxiosInstance";



export function SignUp(props) {
    const [name, setName] = useState("rewear");
    const [email, setEmail] = useState("rewear@mail.ch");
    const [password, setPassword] = useState("ReW34r.2022");
    const [token, setToken] = useState("");

    //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
    const { accessToken, logIn, logOut } =
        useContext(ReWearApiContext);
    console.log("in signup ->", accessToken);

    return (
        <>
            <h1>SignUp</h1>
            <label>Name</label>
            <input id="name" value={name} onChange={changeName} />
            <label>Email</label>
            <input id="email" value={email} onChange={changeMail} />
            <label>Password</label>
            <input id="password" value={password} onChange={changePassword} />
            <button onClick={signUp}>SignUp</button>
            <p>token: {token}</p>
            <h3> Notes: </h3>
            <p>
                The token is a state of the SignUp component(const [token, setToken] =
                useState("")),
            </p>
            <p>
                {" "}
                but we can access the state of ReWearApiContext -> const -accessToken,
                setAccessToken- = useContext(ReWearApiContext)
            </p>
        </>
    );

    function changeName(event) {
        setName(event.target.value);
    }
    function changeMail(event) {
        setEmail(event.target.value);
    }
    function changePassword(event) {
        setPassword(event.target.value);
    }

    //ici la méthode qui éffectue l'appel à l'api avec 'fetch()' et qui va sauver dans le contexte la valeur du token et username
    async function signUp() {

        const response = await API.post('https://localhost:7175/auth/Register', { name: name, email: email, password: password });

        if(response.status === 200){
            logIn(response.data.token, name);
        } else if (response.statusText === 'Unauthorized'){
            logOut();
        }

        console.log(response);
        console.log(response.data);

    }
}
