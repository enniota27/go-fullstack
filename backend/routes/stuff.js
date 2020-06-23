const express = require('express'); //Importation d'Express
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing); // Aujouter
router.put('/:id', auth, multer, stuffCtrl.modifyThing); // Modifier un objet
router.delete('/:id', auth, stuffCtrl.deleteThing); //Supprimer un objet
router.get('/:id', auth, stuffCtrl.getOneThing); // Récupérer un Thing spécifique
router.get('/', auth, stuffCtrl.getAllThings); // Récupérer la liste des Things

module.exports = router; //Exporte