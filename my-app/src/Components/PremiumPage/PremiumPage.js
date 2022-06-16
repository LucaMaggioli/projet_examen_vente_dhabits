import React, {useContext, useEffect, useState} from "react";


import { ReWearApiContext } from "../../Services/ReWearApiContext";
import PremiumPackCard from "../PremiumPackCard/PremiumPackCard";

export default function PremiumPage() {
    const [premiumPacks, setPremiumPacks] = useState([]);
    const { request, accessToken, updateToken, isPremium, endPremiumDate, loggedUser }
        = useContext(ReWearApiContext);

    useEffect(async () => {
        await reloadPremiumPack();
    }, []);

    async function reloadPremiumPack() {
        let response = await request("/PremiumPack/all", "GET", null, accessToken);
        setPremiumPacks(response);
        console.log(response);
    }

    const handleCallback = async (childData) => {
        console.log(childData);
        let response = await request('/PremiumPack/buy/' + childData.id, 'GET', null, accessToken)
        console.log(response);

        updateToken(response.token);
    };

    return(
        <>
            <h1>Page Premium de {loggedUser}</h1>
            <ul>
                { isPremium === true &&(
                    <li>Compte premium jusqu'au: {endPremiumDate}</li>
                )}

                { isPremium !== true &&(
                    <li>Un pack premium permet de publier un nombre infini d'habits</li>
                )}
            </ul>

            <h2>Achat de pack premium</h2>
            {premiumPacks.map((pack) => (
                <PremiumPackCard
                    pack={pack}
                    id={pack.id}
                    name={pack.name}
                    price={pack.price}
                    validityDays={pack.validityDays}
                    isPremium={isPremium}

                    parentCallback={handleCallback}
                ></PremiumPackCard>
            ))}
        </>
    )
}
