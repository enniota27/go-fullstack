const express = require('express'); //Importation d'Express
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.post('/', auth, stuffCtrl.createThing); // Aujouter
router.put('/:id', auth, stuffCtrl.modifyThing); // Modifier un objet
router.delete('/:id', auth, stuffCtrl.deleteThing); //Supprimer un objet
router.get('/:id', auth, stuffCtrl.getOneThing); // Récupérer un Thing spécifique
router.get('/', auth, stuffCtrl.getAllThings); // Récupérer la liste des Things

module.exports = router; //Exporte