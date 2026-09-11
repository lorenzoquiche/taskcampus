import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../database/database.js";
import { HttpError } from "../middleware/errorMiddleware.js";

const findUserByEmail = database.prepare(
  "SELECT id, name, email, password_hash FROM users WHERE email = ?",
);
const createUser = database.prepare(
  "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
);

function createToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado");
  }

  return jwt.sign({}, process.env.JWT_SECRET, {
    subject: String(userId),
    expiresIn: "8h",
  });
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}

export async function register(request, response, next) {
  const { name, email, password } = request.body;

  try {
    if (findUserByEmail.get(email)) {
      throw new HttpError(409, "Ya existe una cuenta con ese correo");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = createUser.run(name, email, passwordHash);
    const user = { id: Number(result.lastInsertRowid), name, email };

    return response.status(201).json({
      message: "Cuenta creada correctamente",
      token: createToken(user.id),
      user,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return next(new HttpError(409, "Ya existe una cuenta con ese correo"));
    }

    return next(error);
  }
}

export async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    const user = findUserByEmail.get(email);
    const passwordIsValid = user
      ? await bcrypt.compare(password, user.password_hash)
      : false;

    if (!user || !passwordIsValid) {
      throw new HttpError(401, "Correo o contraseña incorrectos");
    }

    return response.json({
      message: "Sesión iniciada correctamente",
      token: createToken(user.id),
      user: publicUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

export function me(request, response) {
  response.json({ user: request.user });
}
