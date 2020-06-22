const http = require('http'); //Importer la package HTTP de Node (require=import)

const server = http.createServer((req, res) => { //A chaque fois que l'on va envoyer une requête à ce serveur, cette fonction là sera appelé
    res.end('Voilà la réponse du serveur !');
});

server.listen(process.env.PORT || 3000); //Ecoute les requêtes envoyés avec numéro du port 3000 par défaut ou le serveur de l'environement