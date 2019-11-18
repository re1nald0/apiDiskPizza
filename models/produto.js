'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const produto = sequelize.define('produto', {
        idProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(45)
        },
        preco: {
            type: DataTypes.DOUBLE
        },
        custo: {
            type: DataTypes.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'produto',
        timestamps: false
    });

    produto.associate = (models) => {
        produto.pedido = produto.belongsToMany(models.pedido, {
            through: models.pedidoProduto,
            key: 'idProduto'
        });
        produto.combo = produto.belongsToMany(models.combo, {
            through: models.comboProduto,
            key: 'idProduto'
        });
    }

    return produto;

}