import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
export const getAllUsers = async (req, res) => {
  try {
    const blogs = await UserModel.findAll();
    res.json(blogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const newUser = async (req, res) => {
  try {
    await UserModel.create(req.body);
    res.json({
      status: 200,
      message: "Usuario insertado correctamente",
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        status: 400,
        message: "El email o el username ya existe",
      });
    }

    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo electrónico o contraseña incorrectos." });
    }

    if (user.validPassword(password)) {
      const token = jwt.sign({ userId: user.id }, "luvikah", {
        expiresIn: "8h",
      });
      res.status(200).json({ status: 200, token: token, user: user });
    } else {
      res
        .status(401)
        .json({ message: "Correo electrónico o contraseña incorrectos." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getProfile = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ status: 200, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
export const updateProfile = async (req, res) => {
  const { username, nombre, apellido, descripcion } = req.body;

  try {
    const user = await UserModel.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    user.nombre = nombre;
    user.apellido = apellido;
    user.descripcion = descripcion;

    await user.save();

    res
      .status(200)
      .json({ status: 200, message: "Perfil actualizado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
