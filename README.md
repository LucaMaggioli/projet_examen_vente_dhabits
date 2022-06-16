# projet_examen_vente_dhabits
Ceci est le repo du projet d'examen de troisieme année.
Le but de ce projet était de réaliser une application de revente d'habits

Techno:

- React
- C#

Concept:

- particuliers a particuliers
- App de revent d'habits

Premium:

- payer pour être mis en avant
- Différents abonnement
    - Gratuit: accès aux habits, vente de 5 produits max
    - Payant: achat pour un nombre infini d'habits

POUR LANCER L'APPLICATION:
- Pour lancer l'application React:
  - aller dans le repertoire 'projet_examen_vente_dhabits/my-app'
  - lancer la commande 'npm install'
  - puis 'npm run start'

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
    - Les Users peuvent acheter un PremiumPack
    - Les Users non premium ne peuvent pas avoir plus que 5 `dresses`
    - Les Users Premium peuvent avoir plus que 5 `dresses`
    - Les Users Admin peuvent gérér les premiumpacks et faire devenir d'autres Users Admin
    - enjoy 😉
s
