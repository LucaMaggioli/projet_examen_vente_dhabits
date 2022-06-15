import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { useContext } from "react";
import Accueil from "./Components/PageAccueil/Accueil";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Nav from "./Components/Nav/Nav";
import {
  ReWearApiContext,
  ReWearApiContextProvider,
} from "./Services/ReWearApiContext";
import {SignUp} from "./Components/SignUp/SignUp";
import Sell from "./Components/Sell/Sell";
import Profil from "./Components/Profil/Profil";
import Protected from "./Services/Protected";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A878",
    },
    secondary: {
      main: "#F37748",
    },
    error: {
      main: "#D72638",
    },
    warning: {
      main: "#F3A712",
    },
    success: {
      main: "#83BCFF",
    },
    background: {
      main: "#F5FBEF",
    },
  },
});

export default function App() {
  //cette ligne pour acceder à un state que je trouve dans ReWearContext
  const { accesToken} =
      useContext(ReWearApiContext);
  console.log("in App function-> ", accesToken);
  //je logue l'accessToken, quand le state change dans le context, les composants qui l'utilisent ils se re-render avec la nouvelle valeur


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ReWearApiContextProvider>
          <Nav></Nav>
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/sell"
                element={
                  <Protected type={'user'}>
                    <Sell />
                  </Protected>
                }
            />
            <Route
                path="/profil"
                element={
                  <Protected type={'user'}>
                    <Profil />
                  </Protected>
                }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </ReWearApiContextProvider>
      </Router>
    </ThemeProvider>
  );
}
