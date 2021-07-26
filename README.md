# Projet n°7 OpenClassrooms

## Création d'un réseau social d'entreprise pour Groupomania

### Technologies utilisées

* Un serveur [Node.js](https://nodejs.org/en/)
* Le Framework [Express](https://expressjs.com/)
* Une base de données MySQL
    * Les opérations de base de données sont effectuées via [Sequelize ORM](https://sequelize.org/)
* Une API REST
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

* Ouvrez votre terminal
* Connectez-vous à MySQL : `mysql -h localhost -u root -p`
* Tapez votre mot de passe 
* Créez la base de données : `CREATE DATABASE groupomania_database CHARACTER SET 'utf8';`
* Utilisez la base de données créée : `USE groupomania_database`
* Importez le fichier groupomania_database.sql : `SOURCE groupomania_database.sql;`
* Dans le dossier backend, allez dans le fichier connectdb.js et renseignez votre mot de passe dans password:'xxxxxx'

## Installation et démarrage du Backend

* Ouvrez votre terminal
* Allez dans le dossier backend : `cd groupomania-master/backend` 
* Installez toutes les dépendances du projet : `npm install`
* Démarrez le serveur Node.js : `nodemon server`

## Installation et démarrage du Frontend

* Ouvrez votre terminal
* Allez dans le dossier frontend : `cd groupomania-master/frontend` 
* Installez toutes les dépendances du projet : `npm install`
* Démarrez l'application : `npm run serve`

## Testez l'application
* Ouvrez votre navigateur et allez sur : `http://localhost:8080/`


