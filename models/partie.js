const {
    DataTypes
} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Partie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        game_started: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de1: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de2: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de3: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de4: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de5: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de6: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        de1_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        de2_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        de3_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        de4_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        de5_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        de6_active: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        compteur: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Code here
    });
}