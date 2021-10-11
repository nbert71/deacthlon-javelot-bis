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


// Création de partie
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
            console.log(partie.id);
            res.cookie("id_partie", partie.id);
            res.end("prout")
            //console.log(res.cookie);
        })
    })()
});


function lancerDe() {
    // random --> [0,1[
    return Math.floor(6 * Math.random() + 1);
}

//Lancer les dés
app.use("/roll_dices", (req, res) => {
    req_data = req.body;
    console.log(req_data);
    (async (data) => {
        game = await db.models.Partie.findByPk(3);          // a changer 
        //console.log(data.de1_ticked);
        if (!data.de1_ticked && data.de1_active) {
            game.de1 = lancerDe()
        } else {
            game.de1_active = false
        }
        if (!data.de2_ticked && data.de2_active) {
            game.de2 = lancerDe()
        } else {
            game.de2_active = false
        }
        if (!data.de3_ticked && data.de3_active) {
            game.de3 = lancerDe()
        } else {
            game.de3_active = false
        }
        if (!data.de4_ticked && data.de4_active) {
            game.de4 = lancerDe()
        } else {
            game.de4_active = false
        }
        if (!data.de5_ticked && data.de5_active) {
            game.de5 = lancerDe()
        } else {
            game.de5_active = false
        }
        if (!data.de6_ticked && data.de6_active) {
            game.de6 = lancerDe()
        } else {
            game.de6_active = false
        };
        game.compteur += 1;
        
        values = {
            'de1' : {
                'value': game.de1,
                'ticked': game.de1_ticked
            },
            'de2' : {
                'value': game.de2,
                'ticked': game.de2_ticked
            },
            'de3' : {
                'value': game.de3,
                'ticked': game.de3_ticked
            },
            'de4' : {
                'value': game.de4,
                'ticked': game.de4_ticked
            },
            'de5' : {
                'value': game.de5,
                'ticked': game.de5_ticked
            },
            'de6' : {
                'value': game.de6,
                'ticked': game.de6_ticked
            },
        };
        for (let element in values.keys) {
            if (values.element.value % 2 !== 0 && values.element.ticked == true) {
                console.log(values.element.value);
            }
        }           
        // var somme = 0;
        // for (const element in values.keys) {
        //     if (values.element.value % 2 !== 0 && values.element.ticked == true) {
        //         console.log(values.element.value);
        //         somme += values.element.value
        //     }
        // }

        // game.score = somme;
        game.save()
        res.json(game)
    })(req_data)

})


//Récupération des dés
app.post("/get_dices", (req, res) => {

    db.models.Partie.findAll({
        "where": {
            "pseudo": req.query.pseudo
        }
    }).then((message) => {
        res.json(message)
    }).catch((err) => {
        res.end("error")
        console.log(err);
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