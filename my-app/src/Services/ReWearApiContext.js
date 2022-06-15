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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const cookies_token = new Cookies();
  const baseUrl = 'https://localhost:7175';

  let navigate = useNavigate();

  useEffect(async () => {

    const authToken = cookies_token.get('jwt', '/') ? cookies_token.get('jwt', '/') : null;
    if(authToken){

      logIn(authToken);

    }

  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
        [
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
          date.getFullYear(),
        ].join('/') +
        ' ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(':')
    );
  }

  function logOut() {
    console.log("calling logout");
    setAccessToken(null);
    setLoggedUser(null);
    setAccessCookie(null);
    setIsAdmin(false);
    setIsPremium(false);
    setIsAuthenticated(false);

    cookies_token.remove('jwt', { path: '/' });

    navigate("/");
  }

  function logIn(token){
    const user = JwtDecode(token);
    console.log(user);

    cookies_token.set("jwt", token, { path: '/'})

    setAccessToken(token);
    setLoggedUser(user.Username.toString());
    setAccessCookie(cookies_token.get("jwt"));
    setIsAdmin(user.IsAdmin.toString() === "True");
    setIsPremium(formatDate(new Date(user.endPremiumDate)) > formatDate(new Date()))
    setIsAuthenticated(true);

    navigate("/");
  }

  async function request(endpointUrl, method, body, token){
    //      body===null?: body: JSON.stringify(body);
    let requestOptions = {
      method: method,
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(body)
    };
    if(body === null){
      requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, "Access-Control-Allow-Origin": "*"},
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
      value={{ accessToken, setAccessToken, loggedUser, setLoggedUser, accessCookie, setAccessCookie, isAdmin, isPremium, isAuthenticated,logOut, logIn, request}}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
