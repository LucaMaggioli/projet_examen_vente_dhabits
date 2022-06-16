import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function PremiumPack(props) {
  const [premiumPack, setPremiumPack] = useState(props.pack);
  console.log(premiumPack);
  const [packName, setPackName] = useState(premiumPack.name);
  const [packPrice, setPackPrice] = useState(premiumPack.price);
  const [packValidDays, setPackValidDays] = useState(premiumPack.validityDays);

  const [priceValid, setPriceValid] = useState(checkIfFloat(premiumPack.price));
  const [validityValid, setValidityValid] = useState(
    checkIfInt(premiumPack.validityDays)
  );

  function changeName(event) {
    setPackName(event.target.value);
  }
  function changePrice(event) {
    setPriceValid(checkIfFloat(event.target.value));
    setPackPrice(event.target.value);
  }
  function changeValidityDays(event) {
    setValidityValid(checkIfInt(event.target.value));
    setPackValidDays(event.target.value);
  }

  function checkIfInt(value) {
    if (value.toString().match(/^[0-9]*$/)) {
      return true;
    }
    return false;
  }
  function checkIfFloat(value) {
    if (value.toString().match(/^[0-9]+\.[0-9]+$/)) {
      return true;
    } else {
      return checkIfInt(value);
    }
  }

  function modifyPack() {
    console.log("Modify AHAHHA premiumPack");
    console.log(premiumPack);
    if (!priceValid) {
      window.alert("Price must be a float number");
    }
    if (!validityValid) {
      window.alert("Validity Days must be an integer number");
    }
    if (priceValid && validityValid) {
      props.onPackModify({
        id: premiumPack.id,
        name: packName,
        price: packPrice,
        validityDays: packValidDays,
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Id"
        variant="outlined"
        value={premiumPack.id}
        disabled={true}
      />
      <TextField
        id="outlined-basic"
        label="name"
        variant="outlined"
        value={packName}
        onChange={changeName}
      />
      <TextField
        id="outlined-basic"
        label="price"
        variant="outlined"
        value={packPrice}
        onChange={changePrice}
        error={!priceValid}
      />
      <TextField
        id="outlined-basic"
        label="Validity Days"
        variant="outlined"
        value={packValidDays}
        onChange={changeValidityDays}
        error={!validityValid}
      />
      <Button
        variant="outlined"
        color="warning"
        type="submit"
        onClick={modifyPack}
      >
        Modify
      </Button>
      <Button variant="outlined" color="error">
        Delete
      </Button>
    </div>
  );
}
