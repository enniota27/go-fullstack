const express = require('express'); //Import express
const bodyParser = require('body-parser'); //Import body-parser pour extraire des objets JSON en JS
const mongoose = require('mongoose'); // Import mongosse pour la base de donnée

const app = express(); //Permet de créer une application express

mongoose.connect('mongodb+srv://Antoine27:mdp27@cluster0.5arjs.mongodb.net/<dbname>?retryWrites=true&w=majority', // Connection à la base de donnée
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => { //Ajoute CORS dans l'entête de toutes les requêtes
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à notre API depuis n'importe quelle origine = '*'
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //Verbe que l'on autorise
    next();
});

app.use(bodyParser.json()); // Tranforme le corps de la requête en objet JS pour toutes les routes

app.post('/api/stuff', (req, res, next) => { // POST
    console.log(req.body); //Corps de la requête
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

app.use('/api/stuff', (req, res, next) => { // '/api/stuff' = url visé par l'appli
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff); // Attribue un code 200 à la réponse
  });

module.exports = app; //Exporter la constante app pour y avoir accèder depuis les autres fichiers