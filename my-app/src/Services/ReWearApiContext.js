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
  const [dressCount, setDressCount] = useState(0);
  const [endPremiumDate, setEndPremiumDate] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profils, setProfils] = useState([]);

  const cookies_token = new Cookies();
  const baseUrl = "https://localhost:7175";

  let navigate = useNavigate();

  useEffect(() => {
    const authToken = cookies_token.get("jwt", "/")
      ? cookies_token.get("jwt", "/")
      : null;
    if (authToken) {
      logIn(authToken);
    }
  }, []);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function formatDate(date) {
    return (
      [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
      ].join("/") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
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
    setDressCount(0);
    setEndPremiumDate(null);

    setProfils([])

    cookies_token.remove("jwt", { path: "/" });

    navigate("/");
  }

  function logIn(token) {
    const user = JwtDecode(token);
    console.log(user);

    cookies_token.set("jwt", token, { path: "/" });

    setAccessToken(token);
    setLoggedUser(user.Username.toString());
    setAccessCookie(cookies_token.get("jwt"));
    setIsAdmin(user.IsAdmin.toString() === "True");

    setIsPremium(
      formatDate(new Date(user.endPremiumDate)) > formatDate(new Date())
    );

    setIsAuthenticated(true);
    setDressCount(user.dressesCount);
    setEndPremiumDate(user.endPremiumDate);

    setProfils(await request("/User/all", "GET", null, token));

    navigate("/");
  }
  async function updateToken(token) {
    const user = JwtDecode(token);

    cookies_token.set("jwt", token, {path: "/"});
    setAccessToken(token);
    setAccessCookie(cookies_token.get("jwt"));
    setIsAdmin(user.IsAdmin.toString() === "True");
    setIsPremium(formatDate(new Date(user.endPremiumDate)) > formatDate(new Date()))
    setIsAuthenticated(true);
    setDressCount(user.dressesCount);
    setEndPremiumDate(user.endPremiumDate);

    setProfils(await request("/User/all", "GET", null, token));
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
        navigate('/login');
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
        isAdmin,
        isPremium,
        isAuthenticated,
        dressCount,
        endPremiumDate,
      }}
    >
      {children}
    </ReWearApiContext.Provider>
  );
};

export { ReWearApiContext, ReWearApiContextProvider };
