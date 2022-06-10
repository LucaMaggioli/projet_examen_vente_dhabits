import React, { useState, useContext } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";

export default function Login(props) {
  const [email, setEmail] = useState("space@mail.ch");
  const [password, setPassword] = useState("Sp4ceDOG.2019");

  //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
  const { accessToken, logIn, request} =
    useContext(ReWearApiContext);
  return (
    <>
      <h1>Hello, {props.name}</h1>
      <label>Email</label>
      <input id="email" value={email} onChange={changeMail} />
      <label>Password</label>
      <input id="password" value={password} onChange={changePassword} />
      <button onClick={login}>LogIn</button>
      <p>token: {accessToken}</p>
      <h3> Notes: </h3>
      <p>
        The token is a state of the Login component(const [accessToken, setAccessToken] =
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

  async function login() {

      //const response = await API.post('https://localhost:7175/auth/Login', {email: email, password: password});
      let response = await request('/auth/Login', 'POST', {email: email, password: password})

      logIn(response.token, response.userName);

      console.log(response)
      /*response.then(data=> {
          console.log(data);
      });*/

      // if(response){
      //     logIn(response.data.token, response.data.userName);
      // } else if (response.statusText === 'Unauthorized'){
      //     logOut();
      // }
      //
      // console.log(response);
      // console.log(response.data);

  }
}
