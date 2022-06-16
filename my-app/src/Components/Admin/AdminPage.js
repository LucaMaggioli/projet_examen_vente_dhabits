import React, { useContext, useState, useEffect } from "react";
import { ReWearApiContext } from "../../Services/ReWearApiContext";
import Button from "@mui/material/Button";
import PremiumPack from "../PremiumPack/PremiumPack";

export default function AdminPage() {
  const [premiumPacks, setPremiumPacks] = useState([]);
  const [users, setUsers] = useState([]);
  const { accessToken, request, updateToken, loggedUser } =
    useContext(ReWearApiContext);

  useEffect(() => {
    // async function callData() {
    getPremiumPacks();
    getUsers();
    // }
    // callData();
  }, []);
  console.log("users at render");
  console.log(users);

  function getUsers() {
    request("/User/all", "GET", null, accessToken).then((getUsers) => {
      setUsers(getUsers);
    });
  }

  function getPremiumPacks() {
    request("/PremiumPack/all", "GET", null, accessToken)
      .then((premiumPacks) => {
        setPremiumPacks(premiumPacks);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function modifyPack(pack) {
    request(
      "/PremiumPack/" + pack.id,
      "PATCH",
      { name: pack.name, price: pack.price, validityDays: pack.validityDays },
      accessToken
    ).then((addedPack) => {
      window.alert("Succesfully modified premium pack");
    });
  }

  function deletePack(packId) {
    request("/PremiumPack/" + packId, "DELETE", null, accessToken).then(
      (deletedPack) => {
        premiumPacks.map((pack) => {
          if (pack.id === packId) {
            window.alert("Succesfully removed premium pack");
            let newPackList = [...premiumPacks];
            newPackList.splice(premiumPacks.indexOf(pack), 1);
            setPremiumPacks(newPackList);
          }
        });
      }
    );
  }

  function addPack(pack) {
    request(
      "/PremiumPack/add",
      "POST",
      { name: pack.name, price: pack.price, validityDays: pack.validityDays },
      accessToken
    ).then((addedPack) => {
      window.alert("Succesfully added premium pack");
      setPremiumPacks([...premiumPacks, addedPack]);
    });
  }

  function adminChange(user) {
    if (user.userName === loggedUser) {
      alert("you cant modify your own admin status!");
    } else {
      request(
        "/User/" + user.userName + "/upgradeToAdmin",
        "PATCH",
        !user.isAdmin,
        accessToken
      ).then((updatedUser) => {
        window.alert(
          "Succesfully Admin status modified " +
            updatedUser.isAdmin +
            " for user: " +
            updatedUser.userName
        );
        let prevUsers = [...users];
        let index = -1;
        prevUsers.map((u) => {
          if (u.userName === updatedUser.userName) {
            index = prevUsers.indexOf(u);
          }
        });
        prevUsers.splice(index, 1, updatedUser);
        setUsers(prevUsers);
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gridGap: "2em",
      }}
    >
      <h2>Admin Page</h2>
      <div style={{ display: "flex", flexDirection: "row", gridGap: "1em" }}>
        {users.map((user) => {
          return (
            <div
              key={user.userName}
              style={{
                display: "flex",
                flexDirection: "row",
                gridGap: "4px",
                alignItems: "center",
              }}
            >
              {user.userName}
              {user.isAdmin && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => adminChange(user)}
                >
                  un-admin
                </Button>
              )}
              {!user.isAdmin && (
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => adminChange(user)}
                >
                  up-admin
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <div>
        {premiumPacks.map((element) => {
          return (
            <PremiumPack
              key={element.id}
              pack={element}
              onPackModify={modifyPack}
              onPackDelete={deletePack}
            ></PremiumPack>
          );
        })}
      </div>
      <div>
        <PremiumPack
          pack={{ id: "", name: "", price: "", validityDays: "" }}
          addMode={true}
          onAddPack={addPack}
        ></PremiumPack>
      </div>
    </div>
  );
}
