/*
Configuration du serveur
*/

const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db');
const partie = require('./models/partie');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(cookieParser())
app.use("/static", express.static(path.join(__dirname, '/static')))
app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})
app.use(express.json())

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);




/*
Routes
*/

// Route qui génère les cookies
app.get("/cookie/", (req, res) => {
    console.log(req.query)
    for (const property in req.query) {
        // console.log(`${property}: ${req.query[property]}`);

        res.cookie(property, req.query[property])
        res.end("cookie updated")
    }
})

// Route qui crée une nouvelle partie
app.use('/new', (req, res) => {
    pseudo = req.query.pseudo;
    console.log(pseudo);
    (async () => {
        await db.models.Partie.create({
                pseudo: pseudo,
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
            })
            .then(partie => {
                console.log("partie_id", partie.id);
                res.cookie("id_partie", partie.id);
                res.cookie("pseudo", partie.pseudo);
                res.cookie("compteur", partie.compteur);
                res.end("");
            })
    })()
});

// Route qui permet le lancer des dés
app.use("/roll_dices", (req, res) => {
    req_data = req.body;
    console.log(req_data);
    (async (data) => {
        game = await db.models.Partie.findByPk(data.cookie);
        if (!data.de1_ticked && game.de1_active) {
            game.de1 = lancerDe()
        } else {
            game.de1_active = false
        }
        if (!data.de2_ticked && game.de2_active) {
            game.de2 = lancerDe()
        } else {
            game.de2_active = false
        }
        if (!data.de3_ticked && game.de3_active) {
            game.de3 = lancerDe()
        } else {
            game.de3_active = false
        }
        if (!data.de4_ticked && game.de4_active) {
            game.de4 = lancerDe()
        } else {
            game.de4_active = false
        }
        if (!data.de5_ticked && game.de5_active) {
            game.de5 = lancerDe()
        } else {
            game.de5_active = false
        }
        if (!data.de6_ticked && game.de6_active) {
            game.de6 = lancerDe()
        } else {
            game.de6_active = false
        };
        game.compteur += 1;

        var values = {
            'de1': {
                'value': game.de1,
                'ticked': data.de1_ticked
            },
            'de2': {
                'value': game.de2,
                'ticked': data.de2_ticked
            },
            'de3': {
                'value': game.de3,
                'ticked': data.de3_ticked
            },
            'de4': {
                'value': game.de4,
                'ticked': data.de4_ticked
            },
            'de5': {
                'value': game.de5,
                'ticked': data.de5_ticked
            },
            'de6': {
                'value': game.de6,
                'ticked': data.de6_ticked
            },
        };
        console.log("values", values);
        
        var somme = 0;
        for (const element in values) {
            if (values[element]["value"] % 2 !== 0) {
                somme += values[element]["value"] * values[element]["ticked"]
            }
        }
        console.log("somme", somme);
    
        game.score = somme;
        game.save()
        res.json(game)
    })(req_data)

})


// Route tableau des scores
 app.use("/get_scores", (req, res) => {
    //console.log("coucou");
    (async () => {
        game = await db.models.Partie.findAll({
            attributes: ['pseudo', 'score'],
            order: [['score', 'DESC']],
            limit: 3
        })
        .then(data => {
            //console.log("best-games : ", data);
            var scores = []
            for (let i = 0; i < 3; i++) {
                liste = [
                    data[i]['dataValues']['pseudo'],
                    data[i]['dataValues']['score']
                ]
                scores.push(liste);
            }

            console.log("scores : ", scores);
            res.json(scores);
        })
    })()
})


// Route qui gère les erreurs 404
app.use(function (req, res) {
    console.log("Erreur 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end("<html><head><title>404</title></head><body><h1>Et c'est le 404.</h1><p>La ressource n'a pas été trouvée.</p></body></html>");
})



/* 
Fonctions
*/

// Fonction qui génère un nombre aléatoire entre 1 et 6
function lancerDe() {
    return Math.floor(6 * Math.random() + 1);
}



