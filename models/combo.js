'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const combo = sequelize.define('combo', {
        idCombo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        desconto: {
            type: DataTypes.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'combo',
        timestamps: false
    });

    combo.associate = (models) => {
        combo.pizza = combo.belongsToMany(models.pizza, {
            through: models.comboPizza,
            key: 'idCombo'
        });
        combo.produto = combo.belongsToMany(models.produto, {
            through: models.comboProduto,
            key: 'idCombo'
        });
    }

    return combo;

}