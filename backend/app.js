const express = require('express'); //Import express
const bodyParser = require('body-parser'); //Import body-parser pour extraire des objets JSON en JS
const mongoose = require('mongoose'); // Import mongosse pour la base de donnée

const Thing = require('./models/Thing'); // Import le modèle Thing

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
    delete req.body._id; // Supprime l'identifiant renvoyer par le frontend
    const thing = new Thing({ // Créer une nouvelle instance = créer un objet
        ...req.body //Copie les champs de la body de la request
    });
    thing.save() // Enregistre l'objet dans la base (promesse)
        .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

// Récupérer un Thing spécifique
app.get('/api/stuff/:id', (req, res, next) => { // ':' rendre accessible en tant que paramètre
    Thing.findOne({ _id: req.params.id }) // Récupérère que l'objet dont l'id est la même que l'url de la route
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
});

// Récupérer la liste des Things
app.use('/api/stuff', (req, res, next) => { // '/api/stuff' = url visé par l'appli
    Thing.find()
        .then(things => res.status(200).json(things)) // Récupére le tableau de tous les Things de la base
        .catch(error => res.status(400).json({ error }));
});

module.exports = app; //Exporter la constante app pour y avoir accèder depuis les autres fichiers