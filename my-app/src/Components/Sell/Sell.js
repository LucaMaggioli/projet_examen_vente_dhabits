import React, { useContext, useState } from "react";
import { MenuItem, Select, TextField, Alert } from "@mui/material";
import { ReWearApiContext } from "../../Services/ReWearApiContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Sell() {
  const [sizeIsVisible, setSizeIsVisible] = useState(false);
  const [standardSizeIsVisible, setStandardSizeIsVisible] = useState(false);
  const [sizeTypeList, setSizeTypeList] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const [formValue, setFormValue] = useState({
    name: "",
    imageUrl: "",
    price: "",
    description: "",
    healthState: "",
    category: "",
    size: "",
  });
  const { accessToken, request, updateToken } = useContext(ReWearApiContext);

  let navigate = useNavigate();

  const { name, imageUrl, price, description, healthState, category, size } =
    formValue;

  const handleSubmit = async (event) => {
    event.preventDefault();
    formValue.price = parseFloat(formValue.price);
    console.log(formValue);

    // let response = await request(
    await request("/User/me/dress", "POST", formValue, accessToken).then(
      (sellResponse) => {
        updateToken(sellResponse.token);
        setShowAlert({
          show: true,
          message: "Dress succesfully added!",
          severity: "success",
        });

        setTimeout(() => {
          setShowAlert({ show: false, message: "", severity: "" });
        }, 5000);
      },
      (error) => {
        console.log("error occured failed: ");
        console.log(error);
        setShowAlert({ show: true, message: error.message, severity: "error" });

        setTimeout(() => {
          setShowAlert({
            show: false,
            message: "",
            severity: "",
          });
        }, 5000);
      }
    );
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const categoryChange = async (event) => {
    const { value } = event.target;
    let sizeTypeList = [];

    if (value != null) {
      setSizeIsVisible(true);
    }

    if (value === "T-Shirt" || value === "Pull" || value === "Veste") {
      standardSize.forEach((data) => {
        sizeTypeList.push(
          <MenuItem key={data} value={data}>
            {data}
          </MenuItem>
        );
      });
      setSizeTypeList(sizeTypeList);

      setStandardSizeIsVisible(true);
    } else {
      setStandardSizeIsVisible(false);
      setSizeTypeList(sizeTypeList);
    }
  };

  let standardSize = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "0 2em 0 2em",
        }}
      >
        <form onSubmit={handleSubmit}>
          <h3>Titre</h3>
          <TextField
            required
            id="outlined-basic"
            label="Titre"
            variant="filled"
            name="name"
            value={name}
            onChange={handleChange}
          />

          <h3>Image (URL)</h3>
          <TextField
            id="outlined-basic"
            label="Image (URL)"
            variant="filled"
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange}
          />

          <h3>Prix</h3>
          <TextField
            required
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              maxLength: 5,
            }}
            label="Prix"
            variant="filled"
            name="price"
            value={price}
            onChange={handleChange}
          />

          <h3>Description</h3>
          <TextField
            label="Description"
            multiline
            rows={4}
            variant="filled"
            name="description"
            value={description}
            onChange={handleChange}
          />

          <h3>État de l'habit</h3>
          <Select
            required
            label="État de l'habit"
            name="healthState"
            value={healthState}
            onChange={handleChange}
          >
            <MenuItem value={"Usé"}>Usé</MenuItem>
            <MenuItem value={"Bon"}>Bon</MenuItem>
            <MenuItem value={"Comme neuf"}>Comme neuf</MenuItem>
          </Select>

          <h3>Catégorie d'habit</h3>
          <Select
            required
            label="Catégorie d'habit"
            name="category"
            value={category}
            onChange={async (event) => {
              await handleChange(event);
              await categoryChange(event);
            }}
          >
            <MenuItem value={"T-Shirt"}>T-Shirt</MenuItem>
            <MenuItem value={"Pull"}>Pull</MenuItem>
            <MenuItem value={"Veste"}>Veste</MenuItem>
            <MenuItem value={"Pantalon"}>Pantalon</MenuItem>
            <MenuItem value={"Short"}>Short</MenuItem>
            <MenuItem value={"Chaussures"}>Chaussures</MenuItem>
          </Select>

          {sizeIsVisible === true && (
            <>
              <h3>Taille</h3>
              {standardSizeIsVisible !== true && (
                <TextField
                  required
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 5,
                  }}
                  label="Taille"
                  name="size"
                  value={size}
                  onChange={handleChange}
                />
              )}

              {standardSizeIsVisible === true && (
                <Select
                  required
                  label="Taille"
                  name="size"
                  value={size}
                  onChange={handleChange}
                >
                  {sizeTypeList}
                </Select>
              )}

              <br />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </>
          )}
        </form>
        {showAlert.show && (
          <Alert severity={showAlert.severity}>{showAlert.message}</Alert>
        )}
      </div>
    </>
  );
}
