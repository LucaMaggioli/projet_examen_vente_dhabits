import { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
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
  const baseUrl = "https://localhost:7175";

  let navigate = useNavigate();

  useEffect(async () => {
    const authToken = cookies_token.get("jwt", "/")
      ? cookies_token.get("jwt", "/")
      : null;
    if (authToken) {
      const user = JwtDecode(authToken);
      console.log(user);

      logIn(authToken, user.Username.toString());
    }
  }, []);

  function logOut() {
    console.log("calling logout");
    setLoggedUser(null);
    setAccessToken(null);
    setAccessCookie(null);
    cookies_token.remove("jwt", { path: "/" });

    navigate("/");
  }

  function logIn(token, username) {
    cookies_token.set("jwt", token, { path: "/" });

    setAccessToken(token);
    setLoggedUser(username);
    setAccessCookie(cookies_token.get("jwt"));

    navigate("/");
  }
  function updateToken(token) {
    setAccessToken(token);
    cookies_token.set("jwt", token, { path: "/" });
    setAccessCookie(cookies_token.get("jwt"));
  }

  async function request(endpointUrl, method, body, token) {
    //      body===null?: body: JSON.stringify(body);
    let requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };
    if (body === null) {
      requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
        },
      };
    }
    return fetch(baseUrl + endpointUrl, requestOptions).then((response) => {
      console.log("response in request method");
      console.log(response);
      if (response.status === 403) {
        return Promise.reject({
          message: "You don't have the right to perform this action",
          status: response.status,
        });
      } else if (response.status === 401) {
        console.log("unathorized in request");
        return Promise.reject({
          message: "Please log in to access the api",
          status: response.status,
        });
      } else {
        return response.json();
      }
    });
  }

  return (
    <ReWearApiContext.Provider
      value={{
        accessToken,
        setAccessToken,
        loggedUser,
        setLoggedUser,
        accessCookie,
        setAccessCookie,
        logOut,
        logIn,
        request,
        updateToken,
      }}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
