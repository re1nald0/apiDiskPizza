'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const convenio = sequelize.define('convenio', {
        idConvenio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(45),
        },
        desconto: {
            type: DataTypes.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'convenio',
        timestamps: false
    });

    convenio.associate = (models) => {
        convenio.cliente = convenio.belongsToMany(models.cliente, {
            through: models.idConvenioCliente,
            key: 'idConvenio'
        })
    }

    return convenio;

}