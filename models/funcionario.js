'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const funcionario = sequelize.define('funcionario', {
        idFuncionario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(45)
        },
        telefone: {
            type: DataTypes.STRING(45),
        },
        idCargo: {
            type: DataTypes.INTEGER,
            references: {
                model: models.cargo,
                key: 'idCargo'
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'funcionario',
        timestamps: false
    });

    funcionario.associate = (models) => {
        funcionario.cargo = funcionario.belongsTo(models.cargo);
    }

    return funcionario;

}