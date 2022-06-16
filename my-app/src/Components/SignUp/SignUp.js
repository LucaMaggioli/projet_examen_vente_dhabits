import React, { useState, useContext } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";


export function SignUp() {
    const [name, setName] = useState("rewear");
    const [email, setEmail] = useState("rewear@mail.ch");
    const [password, setPassword] = useState("ReW34r.2022");
    const [responseMessage, setResponseMessage] = useState("");

    //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
    const { accessToken, logIn, request } =
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
            <p>
                {responseMessage}
            </p>
            {/*<p>token: {token}</p>*/}
            {/*<h3> Notes: </h3>*/}
            {/*<p>*/}
            {/*    The token is a state of the SignUp component(const [token, setToken] =*/}
            {/*    useState("")),*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    {" "}*/}
            {/*    but we can access the state of ReWearApiContext -> const -accessToken,*/}
            {/*    setAccessToken- = useContext(ReWearApiContext)*/}
            {/*</p>*/}
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

        let response = await request('/auth/Register', 'POST', {name: name, email: email, password: password})

        console.log(response);
        console.log(response.data);
        setResponseMessage(response.message);

        logIn(response.token);

    }
}
