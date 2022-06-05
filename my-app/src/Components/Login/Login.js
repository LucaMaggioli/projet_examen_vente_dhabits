import React, { useState, useContext } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";
import {Button, Form} from "react-bootstrap";

export default function Login(props) {
  const [email, setEmail] = useState("space@mail.ch");
  const [password, setPassword] = useState("Sp4ceDOG.2019");
  const [token, setToken] = useState("");

  //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
  const { accessToken, setAccessToken, setLoggedUser } =
    useContext(ReWearApiContext);
  console.log("in login ->", accessToken);

  return (
    <>
      <h1>Hello, {props.name}</h1>
      <label>Email</label>
      <input id="email" value={email} onChange={changeMail} />
      <label>Password</label>
      <input id="password" value={password} onChange={changePassword} />
      <button onClick={login}>LogIn</button>
      <p>token: {token}</p>
      <h3> Notes: </h3>
      <p>
        The token is a state of the Login component(const [token, setToken] =
        useState("")),
      </p>
      <p>
        {" "}
        but we can access the state of ReWearApiContext -> const -accessToken,
        setAccessToken- = useContext(ReWearApiContext)
      </p>
    </>
  );

  function changeMail(event) {
    setEmail(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
  }

  //ici la méthode qui éffectue l'appel à l'api avec 'fetch()' et qui va sauver dans le contexte la valeur du token et username
  async function login() {
    console.log(email, " : ", password);
    const response = await fetch("https://localhost:7175/auth/Login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    /*
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Error ->", err);
      });
    */
    //console.log(response.json());
    response.json().then((v) => {
      console.log(v.token);
      // ceci est un state interne au composant, et en futur il sera jarté, il est la pour que tu comprenne la difference
      setToken(v.token);
      //j'ai accés au 'states' du context grace à la ligne 9 ou j'utilise ces states à partir du contexte
      setAccessToken(v.token);
      setLoggedUser(v.userName);
    });
    /*let responsejson = response.json().then((v) => {
      console.log(v);
    });*/
    //sconsole.log(responsejson);
  }
}
