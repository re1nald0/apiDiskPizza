'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const cliente = sequelize.define('cliente', {
        idCliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(45)
        },
        telefone: {
            type: DataTypes.STRING(45)
        },
        endereco: {
            type: DataTypes.STRING(45),
        },
        pontos: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'cliente',
        timestamps: false
    });

    cliente.associate = (models) => {
        cliente.pedido = cliente.hasMany(models.pedido);
        cliente.convenio = cliente.belongsToMany(models.convenio, {
            through: models.idConvenioCliente,
            key: 'idCliente'
        });
        cliente.cupom = cliente.hasMany(models.cupom, {foreignKey: 'idCupom'});
        cliente.avaliacao = cliente.hasMany(models.avaliacao);
    }

    return cliente;

}