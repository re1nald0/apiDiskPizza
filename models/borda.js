'use strict';

module.exports = (sequelize, DataTypes) => {

    const borda = sequelize.define('borda', {
        idBorda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(45)
        },
        preco: {
            type: DataTypes.DOUBLE
        }
    }, {
        freezeTableName: true,
        tableName: 'borda',
        timestamps: false
    });

    return borda;

}