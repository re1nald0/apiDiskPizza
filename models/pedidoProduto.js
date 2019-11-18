'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const pedidoProduto = sequelize.define('pedidoProduto', {
        idPedidoProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.INTEGER
        },
        idProduto: {
            type: DataTypes.INTEGER,
            references: {
                model: models.produto,
                key: 'idProduto'
            }
        },
        idPedido: {
            type: DataTypes.INTEGER,
            references: {
                model: models.pedido,
                key: 'idPedido'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'pedidoProduto',
        timestamps: false
    });

    return pedidoProduto;

}