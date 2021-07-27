# Projet n°7 OpenClassrooms

## Création d'un réseau social d'entreprise pour Groupomania

### Technologies utilisées

* Un serveur [Node.js](https://nodejs.org/en/)
* Le Framework [Express](https://expressjs.com/)
* Une base de données MySQL
    * Les opérations de base de données sont effectuées via [Sequelize ORM](https://sequelize.org/)

* Le framework frontend [Vue.js](https://vuejs.org/) with [Vuex](https://vuex.vuejs.org/)
* Le framework frontend [Bootstrap](https://getbootstrap.com/) pour gérer le coté design et responsive


* Mesures de sécurité conformes aux normes [GDPR](https://www.cnil.fr/en/gdpr-developers-guide) / [OWASP](https://owasp.org/www-project-top-ten/) : 
    * Mots de passe cryptés grâce à [bcrypt](https://www.npmjs.com/package/bcrypt)
    * Un middleware d'authentification à base de jetons personnalisé grâce à [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    * Divers en-têtes HTTP sécurisés définis grâce à [helmet](https://www.npmjs.com/package/helmet)
    * Syntaxe des emails et validation de l'unicité grâce à [sequelize](https://sequelize.org/)     
    * Variables d'environnement sensibles séparées grâce à [dotenv](https://www.npmjs.com/package/dotenv)      

Télécharger le repository et suivez les instructions ci-après pour installer ce projet en local

## prérequis

* Installer Node.js
* Installer Vue.js
* Installer MySQL

## Base de données MySQL

1. Créez la base de données MySQL 'groupomania' (encoded in utf8mb4_general_ci). Votre serveur MySQL doit fonctionner sur le port **3306**.

* Si vous souhaitez charger les données que j'ai prédéfinies : importez dans votre base de données 'groupomania' le dump data_groupomania.sql que vous trouverez dans le répertoire P7 - Groupomania du projet.

    Voici 3 comptes utilisateurs prédéfinis avec lesquels j'ai créé des posts et des commentaires:
    
      * Un **compte Admin** appelé Admin Admin dont l'email est '**GroupomaniaAdmin@groupomania.com**' et le mot de passe '**admin0000**'
      * Un utilisateur nommé Samuel Guilleminot dont l'email est '**SamuelGuilleminot@groupomania.com**' and password is '**L4uX8vj4S**'
      * Un utilisateur nommé Gabrielle Plassard dont l'email est '**GabriellePlassard@groupomania.com**' and password is '**2F5bZ3dvN**'

2. Ajoutez un fichier de configuration nommé '.env'** à la racine du **backend**. Dans ce fichier, définissez 5 variables d'environnement secrètes :
    * DB_NAME = 'groupomania'
    * DB_HOST = 'localhost'
    * DB_USER = '[db_user_name]'
    * DB_PASSWORD = '[db_user_password]'
    * TOKEN_KEY = '[random_string_to_encode_tokens]'
  

3. Installation et démarrage du Backend

* Ouvrez votre terminal
* Allez dans le dossier backend : `cd P7 - Groupomania\backend>` 
* Installez toutes les dépendances du projet : `npm install`
* Démarrez le serveur Node.js : `nodemon server`

4. Installation et démarrage du Frontend

* Ouvrez votre terminal
* Allez dans le dossier frontend : `cd P7 - Groupomania\frontend>` 
* Installez toutes les dépendances du projet : `npm install`
* Démarrez l'application : `npm run serve`

5. Testez l'application
* Ouvrez votre navigateur et allez sur : `http://localhost:8080/`
