import { Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";

export default function Accueil() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDresses, setSelectedUserDresses] = useState([]);

  const { request, accessToken, isAuthenticated, isAdmin, isPremium } =
    useContext(ReWearApiContext);
  useEffect(() => {
    getUsers();
    getSelectedUserDresses();
  }, []);
  useEffect(() => {
    console.log("selected user changed, gettin his dresses");
    getSelectedUserDresses();
  }, [selectedUser]);

  async function reloadProfil() {
    let response = await request("/User/all", "GET", null, accessToken);
    console.log(response);
  }

  const handleCallback = (childData) => {
    console.log(childData);
  };
  function getUsers() {
    request("/User/All", "GET", null, accessToken).then(
      (result) => {
        setUsers(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  function getSelectedUserDresses() {
    if (selectedUser !== null) {
      request(
        "/User/" + selectedUser.userName + "/dresses",
        "GET",
        null,
        accessToken
      ).then(
        (result) => {
          console.log("DRESSES AFTER GET");
          console.log(result);
          setSelectedUserDresses(result);
        },
        (error) => {
          console.log("error in get user Dresses");
          console.log(error);
        }
      );
    }
  }

  function selectUser(user) {
    console.log("selected user state: ");
    console.log(selectedUser);
    console.log("user clicked: ");
    console.log(user);
    if (selectedUser === user) {
      setSelectedUser(null);
      setSelectedUserDresses([]);
    } else {
      setSelectedUser(user);
      getSelectedUserDresses();
    }
    console.log("new user selected state: ");
    console.log(selectedUser);
  }

  return (
    <>
      <h1>Accueil</h1>
      <h3>Bienvenue sur ReWear, un service de revente d'habits</h3>

      <p>
        Sur cette version de l'application, il est possible de mettre en vente 5
        habits en même temps. (après s'être crée un compte)
        <br />
        Pour visionner les habits déjà mis en vente, il suffit de cliquer sur
        son profil
      </p>

      <p>
        Pour mettre en vente un nombre infini d'habits, il est possible
        d'acheter des packs premium. Disponible sur le profil utilisateur
      </p>
      <p>
        <a href={"https://localhost:7175/swagger/index.html"}>Swagger</a>
      </p>
      <button
        onClick={async () => {
          console.log("isAdmin: " + isAdmin);
          console.log("isPremium: " + isPremium);
          console.log("isAuthenticated: " + isAuthenticated);
        }}
      >
        Test State
      </button>
      <div>
        {users.map((user) => {
          return (
            <Button
              key={user.userName}
              color="success"
              variant={
                selectedUser !== null && selectedUser.userName === user.userName
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                selectUser(user);
              }}
            >
              {user.userName}
            </Button>
          );
        })}
      </div>
      <div>
        {selectedUserDresses.map((dress) => {
          return (
            <div>
              <span>{dress.name} </span>
              <span>{dress.description} </span>
              <span>{dress.price}</span>;
            </div>
          );
        })}
      </div>
    </>
  );
}
