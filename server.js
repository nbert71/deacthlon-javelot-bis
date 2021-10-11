const path = require('path')

const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db')
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(cookieParser())

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.use(express.json())


// Création de partie
app.post('/new', (req, res) => {
    console.log(req.body);
    res.cookie("pseudo", req.body.pseudo);
    db.models.Partie.create({
        pseudo: req.body.pseudo,
        score: 0,
        de1: 0,
        de2: 0,
        de3: 0,
        de4: 0,
        de5: 0,
        de6: 0,
        de1_active: true,
        de2_active: true,
        de3_active: true,
        de4_active: true,
        de5_active: true,
        de6_active: true,
        compteur: 0
    }).then((message) => {
        res.json(message)
    }).catch((err) => {
        res.end("error")
        console.log(err)
    })
})



//Gestion des 404
app.use(function (req, res) {
    console.log("Erreur 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>404</title></head><body><h1>Et c'est le 404.</h1><p> ressource non trouvée</p></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);