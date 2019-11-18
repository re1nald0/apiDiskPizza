'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const pedido = sequelize.define('pedido', {
        idPedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataTypes.INTEGER,
            references: {
                model: models.cliente,
                key: 'idCliente'
            }
        },
        idFuncionario: {
            type: DataTypes.INTEGER,
            references: {
                model: models.funcionario,
                key: 'idFuncionario'
            }
        },
        status: {
            type: DataTypes.INTEGER
        },
        dataCriacao: {
            type: DataTypes.DATE,
        },
        entrega: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true,
        tableName: 'pedido',
        timestamps: false
    });

    pedido.associate = (models) => {
        pedido.pizza = pedido.belongsToMany(models.pizza, {
            through: models.pedidoPizza,
            key: 'idPedido'
        });
        pedido.produto = pedido.belongsToMany(models.produto, {
            through: models.pedidoProduto,
            key: 'idPedido'
        });
        pedido.cliente = pedido.belongsTo(models.cliente);
        pedido.funcionario = pedido.belongsTo(models.funcionario);
        pedido.cupom = pedido.hasMany(models.cupom, {foreignkey: 'idCupom'});
    }

    return pedido;

}