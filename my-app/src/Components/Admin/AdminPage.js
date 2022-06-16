import React, { useContext, useState, useEffect } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { ReWearApiContext } from "../../Services/ReWearApiContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import PremiumPack from "../PremiumPack/PremiumPack";

export default function AdminPage() {
  const [premiumPacks, setPremiumPacks] = useState([]);
  const { accessToken, request, updateToken } = useContext(ReWearApiContext);

  useEffect(async () => {
    // async function callData() {
    await getPremiumPacks();
    // }
    // callData();
  }, []);

  async function getPremiumPacks() {
    await request("/PremiumPack/all", "GET", null, accessToken)
      .then((premiumPacks) => {
        console.log("after request");
        console.log(premiumPacks);
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
      console.log(addedPack);
    });
  }

  function deletePack(packId) {
    request("/PremiumPack/" + packId, "DELETE", null, accessToken).then(
      (deletedPack) => {
        console.log(deletedPack);
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
    console.log(pack);
    request(
      "/PremiumPack/add",
      "POST",
      { name: pack.name, price: pack.price, validityDays: pack.validityDays },
      accessToken
    ).then((addedPack) => {
      window.alert("Succesfully added premium pack");
      setPremiumPacks([...premiumPacks, addedPack]);
      console.log(premiumPacks);
    });
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
