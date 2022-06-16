import React, { useState, useContext } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";

export default function Login(props) {
  const [email, setEmail] = useState("space@mail.ch");
  const [password, setPassword] = useState("Sp4ceDOG.2019");
  const [responseMessage, setResponseMessage] = useState();

    //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
  const { accessToken, logIn, request } =
    useContext(ReWearApiContext);
  
  return (
    <>
      <h1>Hello {props.name}</h1>
      <label>Email</label>
      <input id="email" value={email} onChange={changeMail} />
      <label>Password</label>
      <input id="password" value={password} onChange={changePassword} />
      <button onClick={login}>LogIn</button>

        <p>
            {responseMessage}
        </p>
     
    </>
  );

  function changeMail(event) {
    setEmail(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
  }

  async function login() {
    //const response = await API.post('https://localhost:7175/auth/Login', {email: email, password: password});
    let response = await request("/auth/Login", "POST", {
      email: email,
      password: password,
    });


      //const response = await API.post('https://localhost:7175/auth/Login', {email: email, password: password});
      let response = await request('/auth/Login', 'POST', {email: email, password: password})
      console.log(response);
      setResponseMessage(response.message);

      logIn(response.token);

  }
}
