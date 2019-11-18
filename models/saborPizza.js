'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const saborPizza = sequelize.define('saborPizza', {
        idSaborPizza: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPizza: {
            type: DataTypes.INTEGER,
            references: {
                model: models.pizza,
                key: 'idPizza'
            }
        },
        idSabor: {
            type: DataTypes.INTEGER,
            references: {
                model: models.sabor,
                key: 'idSabor'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'saborPizza',
        timestamps: false
    });

    return saborPizza;

}