const express = require('express'); //Import express

const app = express(); //Permet de créer une application express

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});
  
app.use((req, res, next) => {
    res.status(201); //Modifie le code HTTP
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès !');
});

module.exports = app; //Exporter la constante app pour y avoir accèder depuis les autres fichiers