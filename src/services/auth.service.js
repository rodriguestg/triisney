import db from "../config/firebase.js";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";


class AuthService {
  async registerUser({ name, email, password }) {
    const usersDB = db.collection("users").doc(email);
    const userDoc = await usersDB.get();

    if (userDoc.exists) {
      throw new Error("Usuario já existe");
    }

    const hashPassword = await bycript.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashPassword,
      createdAt: new Date(),
    };

    await usersDB.set(newUser);

    return { message: "Usuário registrado com sucesso" };

  }

  async loginUser(email, password) {
    const usersDB = db.collection("users").doc(email);
    const userDoc = await usersDB.get();

    if (!userDoc.exists) {
      throw new Error("Email ou senha inválida");
    }

    const userData = userDoc.data();

    const isPasswordValid = await bycript.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error("Email ou senha inválida");
    }

    const token = jwt.sign(
      { email: userData.email, name: userData.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default new AuthService();