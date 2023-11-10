import { DataTypes } from "sequelize";
import db from "../db/db.js";

const LikeModel = db.define(
  "likeModel",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idGaleria: { type: DataTypes.INTEGER, allowNull: false },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    voto: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "votacion",
  }
);

export default LikeModel;
