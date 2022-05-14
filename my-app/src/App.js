import './App.css';

import {createTheme, ThemeProvider} from "@mui/material";
import React from "react";
import {Accueil} from "./Components/PageAccueil/Accueil";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const theme = createTheme({
    palette: {
        primary: {
            main: '#00A878',
        },
        secondary: {
            main: '#F37748',
        },
        error: {
            main: '#D72638',
        },
        warning: {
            main: '#F3A712',
        },
        success: {
            main: '#83BCFF',
        },
        background: {
            main: '#F5FBEF',
        },
    },
});


export default function App() {
  return (
      <ThemeProvider theme={theme}>
          <Router>
              <Routes>
                  <Route exact path="/" element={<Accueil/>} />
              </Routes>
          </Router>
      </ThemeProvider>

  );
}
