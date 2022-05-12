import logo from './logo.svg';
import './App.css';

import {Button, createTheme, ThemeOptions, ThemeProvider} from "@mui/material";
import {Accueil} from "./Components/PageAccueil/Accueil";
import React from "react";

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
          <div className={'container'}>
              <Accueil />
          </div>  
      </ThemeProvider>
  );
}
