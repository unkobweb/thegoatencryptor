# The Goat Encryptor

Le but de ce site est de mettre à disposition une plateforme de pentest qui pourra instancier des conteneurs Docker qui auront chacun un flag récupérable d'une manière différente dans le but de tester vos compétences en pentest

## Prérequis

```
NodeJS version v14.15.1 ou ultérieur
NPM v6.14.8 ou ultérieur
```

## Installation

Créez un fichier .env grâve à l'exemple du .env.example et entrez vos identifiants de base de donnée
Pour ensuite générer la base de données vous devez lancer :

```
npm install
node ace migration:run
node ace migration:rollback
```
