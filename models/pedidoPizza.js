'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const pedidoPizza = sequelize.define('pedidoPizza', {
        idPizza: {
            type: DataTypes.INTEGER,
            references: {
                model: models.pizza,
                key: 'idPizza'
            }
        },
        idPedido: {
            type: DataTypes.INTEGER,
            references: {
                model: models.Pedido,
                key: 'idPedido'
            }
        },
        idPedidoPizza: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.INTEGER,
        }
    }, {
        freezeTableName: true,
        tableName: 'pedidoPizza',
        timestamps: false
    });

    return pedidoPizza;

}