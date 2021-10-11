const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize('sqlite::memory:');

path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

const Partie = sequelize.define('Game_test', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

(async () => {
    await sequelize.sync({ force: true });
    pseudo = "Nicolas"

    game = await Partie.create({
        pseudo: pseudo
    })
    console.log(game.pseudo);
    games = await Partie.findAll({})
    console.log(games);
})();