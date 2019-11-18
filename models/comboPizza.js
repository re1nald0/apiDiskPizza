'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const comboPizza = sequelize.define('comboPizza', {
        idCombo: {
            type: DataTypes.INTEGER,
            references: {
                model: models.combo,
                key: 'idCombo'
            }
        },
        idPizza: {
            type: DataTypes.INTEGER,
            references: {
                model: models.pizza,
                key: 'idPizza'
            }
        },
        idComboPizza: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.STRING(45),
        }
    }, {
        freezeTableName: true,
        tableName: 'comboPizza',
        timestamps: false
    });

    return comboPizza;

}