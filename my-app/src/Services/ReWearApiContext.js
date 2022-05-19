import { createContext, useState } from "react";

// creation du contexte avec createContext qui est importé de React
const ReWearApiContext = createContext({});

//Creation du context provider, qui est appelé dans le HTML de App.js
//Donc tous les states de ReWearApiContextProvider vont étres
//accessibles à chaque composant qui se trouve dedans le tagHTML <ReWearApiContextProvider>
const ReWearApiContextProvider = ({ children }) => {
  // ici dessous les 2 states qui sont accessibles par les composants qui utilisent le Context
  const [accessToken, setAccessToken] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);

  function logOut() {
    console.log("calling logout");
    setLoggedUser(null);
    setAccessToken(null);
  }

  return (
    <ReWearApiContext.Provider
      value={{ accessToken, setAccessToken, loggedUser, setLoggedUser, logOut }}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
