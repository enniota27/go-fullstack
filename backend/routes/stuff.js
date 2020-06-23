const express = require('express'); //Importation d'Express
const router = express.Router();

const Thing = require('../models/Thing'); // Import le modèle Thing

router.post('/', (req, res, next) => { // POST
    delete req.body._id; // Supprime l'identifiant renvoyer par le frontend
    const thing = new Thing({ // Créer une nouvelle instance = créer un objet
        ...req.body //Copie les champs de la body de la request
    });
    thing.save() // Enregistre l'objet dans la base (promesse)
        .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

// Modifier un objet
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // { objet de comparaison },{ ancien objet : nouveau objet }
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
});

//Supprimer un objet
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
});  

// Récupérer un Thing spécifique
router.get('/:id', (req, res, next) => { // ':' rendre accessible en tant que paramètre
    Thing.findOne({ _id: req.params.id }) // Récupérère que l'objet dont l'id est la même que l'url de la route
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
});

// Récupérer la liste des Things
router.get('/', (req, res, next) => { // '/api/stuff' = url visé par l'appli
    Thing.find()
        .then(things => res.status(200).json(things)) // Récupére le tableau de tous les Things de la base
        .catch(error => res.status(400).json({ error }));
});

module.exports = router; //Exporte