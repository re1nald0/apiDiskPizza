'use strict';

const models = require('.');

module.exports = (sequelize, DataTypes) => {

    const usuario = sequelize.define('usuario', {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(45)
        },
        senha: {
            type: DataTypes.STRING
        },
        funcionarioIdFuncionario: {
            type: DataTypes.INTEGER,
            references: {
                model: models.funcionario,
                key: 'idFuncionario'
            }
        },
        clienteIdCliente: {
            type: DataTypes.INTEGER,
            references: {
                model: models.cliente,
                key: 'idCliente'
            }
        },
        tipo: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps: false
    });

    usuario.associate = (models) => {
        usuario.funcionario = usuario.belongsTo(models.funcionario);
        usuario.cliente = usuario.belongsTo(models.cliente);
    }

    return usuario;

}