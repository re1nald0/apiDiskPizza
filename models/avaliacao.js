'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const avaliacao = sequelize.define('avaliacao', {
        idAvaliacao: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nota: {
            type: DataTypes.INTEGER
        },
        descricao: {
            type: DataTypes.STRING(45),
        },
        idFuncionario: {
            type: DataTypes.INTEGER,
            references: {
                model: models.funcionario,
                key: 'idFuncionario'
            }
        },
        idCliente: {
            type: DataTypes.INTEGER,
            references: {
                model: models.cliente,
                key: 'idCliente'
            }
        },
        tipo: {
            type: DataTypes.INTEGER,
        },
        dataCriacao: {
            type: DataTypes.DATE,
        },
        lida: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true,
        tableName: 'avaliacao',
        timestamps: false
    });

    avaliacao.associate = (models) => {
        avaliacao.funcionario = avaliacao.belongsTo(models.funcionario);
        avaliacao.cliente = avaliacao.belongsTo(models.cliente);
    }

    return avaliacao;

}