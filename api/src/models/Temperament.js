//Importamos DataTypes de sequelize
const { DataTypes } = require("sequelize");
// Exportamosel modelo y luego le pasamos la conexion a sequelize.

module.exports = (sequelize) => {
    //Definimos el modelo Temperament con el método define() con sus propiedades mediante sequelize

  sequelize.define(
    "Temperament",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
