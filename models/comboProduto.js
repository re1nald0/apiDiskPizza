'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const comboProduto = sequelize.define('comboProduto', {
        idCombo: {
            type: DataTypes.INTEGER,
            references: {
                model: models.combo,
                key: 'idCombo'
            }
        },
        idProduto: {
            type: DataTypes.INTEGER,
            references: {
                model: models.produto,
                key: 'idProduto'
            }
        },
        idComboProduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: {
            type: DataTypes.STRING(45),
        }
    }, {
        freezeTableName: true,
        tableName: 'comboProduto',
        timestamps: false
    });

    return comboProduto;

}