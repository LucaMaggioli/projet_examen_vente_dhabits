import React, { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h1>Hello, {props.name}</h1>
      <label>Email</label>
      <input id="email" value={email} onChange={changeMail} />
      <label>Password</label>
      <input id="password" value={password} onChange={changePassword} />
      <button onClick={login}>LogIn</button>
    </>
  );

  function changeMail(event) {
    setEmail(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
  }

  function login() {
    console.log(email, " : ", password);
    const response = await fetch("localhost:");
  }
}
