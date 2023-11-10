import { DataTypes } from "sequelize";
import db from "../db/db.js";
import bcrypt from "bcrypt";

const UserModel = db.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(256), allowNull: false },
    apellido: { type: DataTypes.STRING(256), allowNull: false },
    email: { type: DataTypes.STRING(256), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(256), allowNull: false },
    descripcion: { type: DataTypes.STRING(256), allowNull: false },
    url_img: { type: DataTypes.STRING(256) },
    JWT: { type: DataTypes.STRING(256) },
    username: { type: DataTypes.STRING(256), allowNull: false, unique: true },
    activo: { type: DataTypes.BOOLEAN },
  },
  {
    timestamps: false,
  }
);

UserModel.beforeCreate((user, options) => {
  if (user.password) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  }
});

UserModel.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default UserModel;
