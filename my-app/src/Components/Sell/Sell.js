import React, {useState} from "react";
import {formGroupClasses} from "@mui/material";

const initialValues = {
    id: null,
    name: null,
    price: 0,
    description: null,
    categories: null,
    healthState: null,
    size: null,
    imageFile: null,
    imageSrc: null,
}

export default function Sell() {
    const [dresses, setDresses] = useState(initialValues)

    // //grace à cette ligne je vais pouvoir utiliser les 'states' de mon contexte 'ReWearApiContext'
    // const { accessToken, setAccessToken, setLoggedUser } =
    //     useContext(ReWearApiContext);

    const showPreview = e => {
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0]
            const reader = new FileReader();
            reader.onload = x => {
                setDresses({
                    ...dresses,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
    }

    return (
        <>
            <h1>Vendre</h1>

            <form>
                <div className={'card'}>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>

                    <div className={'form-group'}>
                        <img src={dresses.imageSrc}/>
                        <input type={'file'} accept={'image/*'} className={'form-control-file'} onChange={showPreview}/>
                    </div>
                </div>

            </form>



            <label>Nom de l'article</label>
            <input id="name"/>

        </>
    );
}
