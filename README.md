# projet_examen_vente_dhabits
Ceci est le repo du projet d'examen de troisieme année.

Techno:

- React
- C#

Légendes:

- à faire absolument
- nice to have

Concept:

- particuliers a particuliers
- les friperies pourraient s’inscrire dessus
- Chaque particulier peut créer des dressings avec un certains nombres de cintres

Contenu:

- page abonnement
- page recherche personnalisée
- interface pensée pour le smartphone, geste, etc
- système de swipe pour défiler à travers “le dressing”, affichage de cintre ça peut être marrant
- messagerie in-app

Premium:

- payer pour être mis en avant
- Différents abonnement
    - Gratuit: accès aux habits, vente de 5 produits max
    - Payant: achat unique pour un nombre défini de produits
    - Magasin/Business: abonnement par mois, produits illimités
- payement par twint

Notes:
- pour lancer l'application backend:
	- aller dans le repertoire `projet_examen_vente_dhabits/ReWear_backend/ReWear_backend`
	- lancer la commande `dotnet build`
	- lancer la commande `dotnet run`
	- acceder à swagger avec un navigateur à la suivante adresse: `https://localhost:7175/swagger/index.html`
	- User admin disponible:
		- username: space_dog
		- pswd: Sp4ceDOG.2019
		- email: space@mail.ch
	- Une fois le login éffectué, insérer le token obtenu directement dans `Authorize` de swagger (sans 'Bearer ' devant)
	- Les Users non premium ne peuvent pas avoir plus que 5 `dresses`
	- Les Users non premium peuvent acheter un PremiumPack
	- Les Users Premium peuvent avoir plus que 5 `dresses`
	- Les Users Admin peuvent gérér les premiumpacks et faire devenir d'autres Users Admin
	- enjoy 😉

