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
      console.log(addedPack);
    });
  }

  return (
    <>
      <h2>Admin Page</h2>
      <div>
        {premiumPacks.map((element) => {
          return (
            <PremiumPack
              key={element.id}
              pack={element}
              onPackModify={modifyPack}
            ></PremiumPack>
          );
        })}
        ;
      </div>
    </>
  );
}
