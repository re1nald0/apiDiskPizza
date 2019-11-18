'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const cupom = sequelize.define('cupom', {
        idCupom: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desconto: {
            type: DataTypes.DOUBLE
        },
        descricao: {
            type: DataTypes.STRING(100),
        },
        // idPedido: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: models.pedido,
        //         key: 'idPedido'
        //     }
        // },
        // idCliente: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: models.cliente,
        //         key: 'idCliente'
        //     }
        // }
    }, {
        freezeTableName: true,
        tableName: 'cupom',
        timestamps: false
    });

    cupom.associate = (models) => {
        cupom.cliente = cupom.belongsTo(models.cliente);
        cupom.pedido = cupom.belongsTo(models.pedido);
    }

    return cupom;

}