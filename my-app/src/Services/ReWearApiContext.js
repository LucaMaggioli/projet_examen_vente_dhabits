import { createContext, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

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

  let navigate = useNavigate();

  function logOut() {
    console.log("calling logout");
    setLoggedUser(null);
    setAccessToken(null);
    setAccessCookie(null);
    cookies_token.remove('jwt', { path: '/' });
  }

  function logIn(token, username){

    cookies_token.set("jwt", token, { path: '/'})

    setAccessToken(token);
    setLoggedUser(username);
    setAccessCookie(cookies_token.get("jwt"));

    navigate("/");
  }

  return (
    <ReWearApiContext.Provider
      value={{ accessToken, setAccessToken, loggedUser, setLoggedUser, accessCookie, setAccessCookie, logOut, logIn}}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
