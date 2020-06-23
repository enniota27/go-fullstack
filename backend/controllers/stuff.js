const Thing = require('../models/Thing');
const fs = require('fs'); // Avoir accès à des opérations liés aux systèmes de fichiers

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id; // Supprime l'identifiant renvoyer par le frontend
    const thing = new Thing({ // Créer une nouvelle instance = créer un objet
        ...thingObject, //Copie
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //http://localhost3000/images/nomdufichier
    });
    thing.save() // Enregistre l'objet dans la base (promesse)
        .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? // Modifier l'url de l'image
    {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }) // { objet de comparaison },{ ancien objet : nouveau objet }
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1]; // Nom du fichier
        fs.unlink(`images/${filename}`, () => { // Supprimer un fichier
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) // Récupérère que l'objet dont l'id est la même que l'url de la route
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things)) // Récupére le tableau de tous les Things de la base
        .catch(error => res.status(400).json({ error }));
};