import { DataTypes } from "sequelize";
import db from "../db/db.js";

const GaleriaModel = db.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idUsuario: { type: DataTypes.INTEGER, allowNull: false },
    urlImagen: { type: DataTypes.STRING(256), allowNull: false },
    fechaCreacion: { type: DataTypes.DATE, allowNull: false },
    comentario: { type: DataTypes.STRING(256), allowNull: true },
  },
  {
    timestamps: false,
    tableName: "galeria",
  }
);

export default GaleriaModel;
