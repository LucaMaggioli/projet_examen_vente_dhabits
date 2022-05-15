import React, { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("space@mail.ch");
  const [password, setPassword] = useState("Sp4ceDOG.2019");
  const [token, setToken] = useState("");

  return (
    <>
      <h1>Hello, {props.name}</h1>
      <label>Email</label>
      <input id="email" value={email} onChange={changeMail} />
      <label>Password</label>
      <input id="password" value={password} onChange={changePassword} />
      <button onClick={login}>LogIn</button>
      <p>token: {token}</p>
    </>
  );

  function changeMail(event) {
    setEmail(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
  }

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
      setToken(v.token);
    });
    /*let responsejson = response.json().then((v) => {
      console.log(v);
    });*/
    //sconsole.log(responsejson);
  }
}
