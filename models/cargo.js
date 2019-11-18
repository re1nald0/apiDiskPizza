'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const cargo = sequelize.define('cargo', {
        idCargo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(45),
        }
    }, {
        freezeTableName: true,
        tableName: 'cargo',
        timestamps: false
    });

    cargo.associate = (models) => {
        cargo.funcionario = cargo.hasMany(models.funcionario);
    }

    return cargo;

}