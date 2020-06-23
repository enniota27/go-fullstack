const express = require('express'); //Importation d'Express
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

router.post('/', stuffCtrl.createThing); // Aujouter
router.put('/:id', stuffCtrl.modifyThing); // Modifier un objet
router.delete('/:id', stuffCtrl.deleteThing); //Supprimer un objet
router.get('/:id', stuffCtrl.getOneThing); // Récupérer un Thing spécifique
router.get('/', stuffCtrl.getAllThings); // Récupérer la liste des Things

module.exports = router; //Exporte