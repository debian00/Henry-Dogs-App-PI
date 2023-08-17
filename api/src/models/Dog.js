//Importamos DataTypes de sequelize
const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamosel modelo y luego le pasamos la conexion a sequelize.
module.exports = (sequelize) => {
  //Definimos el modelo Dog con el método define() con sus propiedades mediante sequelize
  sequelize.define(
    "Dog",
    {
      id: {
        type: DataTypes.UUID,//UUID?
        defaultValue:UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      heightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeSpanMin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifeSpanMax: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
