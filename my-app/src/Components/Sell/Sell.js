import React, {useState} from "react";
import {MenuItem, Select, TextField} from "@mui/material";

export default function Sell() {
    const [sizeIsVisible, setSizeIsVisible] = useState(false);
    const [standardSizeIsVisible, setStandardSizeIsVisible] = useState(false);
    const [sizeTypeList, setSizeTypeList] = useState([]);


    const [formValue, setFormValue] = useState({
        title: "",
        price: "",
        description: "",
        healthState: "",
        category: "",
        size: "",
    });

    const { title, imageUrl, price, description, healthState, category, size } = formValue;

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
        const { name, value } = event.target;
        let sizeTypeList = [];

        if (value != null){
            setSizeIsVisible(true);
        }

        if(value === 'T-Shirt' || value === 'Pull' || value === 'Veste'){

            standardSize.forEach((data) => {
                sizeTypeList.push(<MenuItem key={data} value={data}>{data}</MenuItem>)
            })
            setSizeTypeList(sizeTypeList)

            setStandardSizeIsVisible(true);
        } else {
            setStandardSizeIsVisible(false);
            setSizeTypeList(sizeTypeList)
        }
    };

    let standardSize = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    return (
        <>
            <h3>En développement</h3>

            <h3>Titre</h3>
            <TextField
                id="outlined-basic"
                label="Titre"
                variant="filled"
                name='title'
                value={title}
                onChange={handleChange}
            />

            <h3>Image (URL)</h3>
            <TextField
                id="outlined-basic"
                label="Image (URL)"
                variant="filled"
                name='imageUrl'
                value={imageUrl}
                onChange={handleChange}
            />

            <h3>Prix</h3>
            <TextField
                type="number"
                label="Prix"
                variant="filled"
                name='price'
                value={price}
                onChange={handleChange}
            />


            <h3>Description</h3>
            <TextField
                label="Description"
                multiline
                rows={4}
                variant="filled"
                name='description'
                value={description}
                onChange={handleChange}
            />


            <h3>État de l'habit</h3>
            <Select
                label="État de l'habit"
                name='healthState'
                value={healthState}
                onChange={handleChange}
            >
                <MenuItem value={"Usé"}>Usé</MenuItem>
                <MenuItem value={"Bon"}>Bon</MenuItem>
                <MenuItem value={"Comme neuf"}>Comme neuf</MenuItem>
            </Select>

            <h3>Catégorie d'habit</h3>
            <Select
                label="Catégorie d'habit"
                name='category'
                value={category}
                onChange={async event => {
                    await handleChange(event);
                    await categoryChange(event)
                }}
            >
                <MenuItem value={"T-Shirt"}>T-Shirt</MenuItem>
                <MenuItem value={"Pull"}>Pull</MenuItem>
                <MenuItem value={"Veste"}>Veste</MenuItem>
                <MenuItem value={"Pantalon"}>Pantalon</MenuItem>
                <MenuItem value={"Short"}>Short</MenuItem>
                <MenuItem value={"Chaussures"}>Chaussures</MenuItem>
            </Select>

            {sizeIsVisible === true &&
                <>
                    <h3>Taille</h3>
                    {standardSizeIsVisible !== true &&
                        <TextField
                            type="number"
                            label="Taille"
                            name='size'
                            value={size}
                            onChange={handleChange}
                        />
                    }

                    {standardSizeIsVisible === true &&
                        <Select
                            label="Taille"
                            name='size'
                            value={size}
                            onChange={handleChange}
                        >
                            {sizeTypeList}
                        </Select>
                    }
                </>
            }
        </>
    );
}
