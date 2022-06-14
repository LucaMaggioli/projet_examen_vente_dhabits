import {createContext, useEffect, useState} from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import JwtDecode from "jwt-decode";

// creation du contexte avec createContext qui est importé de React
const ReWearApiContext = createContext({});

//Creation du context provider, qui est appelé dans le HTML de App.js
//Donc tous les states de ReWearApiContextProvider vont étres
//accessibles à chaque composant qui se trouve dedans le tagHTML <ReWearApiContextProvider>
const ReWearApiContextProvider = ({ children }) => {
  // ici dessous les 2 states qui sont accessibles par les composants qui utilisent le Context
  const [accessToken, setAccessToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [accessCookie, setAccessCookie] = useState(null);

  const cookies_token = new Cookies();
  const baseUrl = 'https://localhost:7175';

  let navigate = useNavigate();

  useEffect(async () => {
    const authToken = cookies_token.get('jwt', '/') ? cookies_token.get('jwt', '/') : null;
    if(authToken){
      const user = JwtDecode(authToken);
      console.log(user);

      logIn(authToken,user.Username.toString());
    }
  }, []);

  function logOut() {
    console.log("calling logout");
    setLoggedUser(null);
    setAccessToken(null);
    setAccessCookie(null);
    cookies_token.remove('jwt', { path: '/' });

    navigate("/");
  }

  function logIn(token, username){
    cookies_token.set("jwt", token, { path: '/'})

    setAccessToken(token);
    setLoggedUser(username);
    setAccessCookie(cookies_token.get("jwt"));

    navigate("/");
  }

  async function request(endpointUrl, method, body, token){
    //      body===null?: body: JSON.stringify(body);
    let requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(body)
    };
    if(body === null){
      requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
      }
    }
    return fetch(baseUrl + endpointUrl, requestOptions)
        .then(response => {

          return response.json()
        })
        .catch(error => {
          console.log(error);
          return error
        });
  }

  return (
    <ReWearApiContext.Provider
      value={{ accessToken, setAccessToken, loggedUser, setLoggedUser, accessCookie, setAccessCookie, logOut, logIn, request}}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
