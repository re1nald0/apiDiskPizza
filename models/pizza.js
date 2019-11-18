'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const pizza = sequelize.define('pizza', {
        idPizza: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tamanho: {
            type: DataTypes.STRING(45)
        },
        idBorda: {
            type: DataTypes.INTEGER,
            references: {
                model: models.borda,
                key: 'idBorda'
            }
        },
        descricao: {
            type: DataTypes.STRING(150),
        }
    }, {
        freezeTableName: true,
        tableName: 'pizza',
        timestamps: false
    });

    pizza.associate = (models) => {
        pizza.sabor = pizza.belongsToMany(models.sabor, {
            through: models.saborPizza,
            key: 'idPizza'
        });
        pizza.comboPizza = pizza.belongsToMany(models.comboPizza, {
            through: models.comboPizza,
            key: 'idPizza'
        });
        pizza.pedido = pizza.belongsToMany(models.pedido, {
            through: models.pedidoPizza,
            key: 'idPizza'
        });
        pizza.borda = pizza.belongsTo(models.borda);
    }

    return pizza;

}