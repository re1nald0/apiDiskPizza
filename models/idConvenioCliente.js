'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const idConvenioCliente = sequelize.define('idConvenioCliente', {
        idConvenio: {
            type: DataTypes.INTEGER,
            references: {
                model: models.convenio,
                key: 'idConvenio'
            }
        },
        idCliente: {
            type: DataTypes.INTEGER,
            references: {
                model: models.cliente,
                key: 'idCliente'
            }
        },
        idConvenioCliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        freezeTableName: true,
        tableName: 'idConvenioCliente',
        timestamps: false
    });

    return idConvenioCliente;

}