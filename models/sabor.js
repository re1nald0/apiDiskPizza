'use strict';

module.exports = (sequelize, DataTypes) => {

    const sabor = sequelize.define('sabor', {
        idSabor: {
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
        ingredientes: {
            type: DataTypes.STRING(150),
        },
        categoria: {
            type: DataTypes.INTEGER,
        },
        custo: {
            type: DataTypes.DOUBLE,
        }
    }, {
        freezeTableName: true,
        tableName: 'sabor',
        timestamps: false
    });

    sabor.associate = (models) => {
        sabor.pizza = sabor.belongsToMany(models.pizza, {
            through: models.saborPizza,
            foreignKey: 'idSabor'
        });
    }

    return sabor;

}