import jwt from "jsonwebtoken";
import database from "../database/database.js";
import { HttpError } from "./errorMiddleware.js";

const findUserById = database.prepare(
  "SELECT id, name, email FROM users WHERE id = ?",
);

export function requireAuth(request, _response, next) {
  const authorization = request.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return next(new HttpError(401, "Autenticación requerida"));
  }

  const token = authorization.slice(7).trim();

  if (!token || !process.env.JWT_SECRET) {
    return next(new HttpError(401, "Token inválido o expirado"));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = Number(payload.sub);

    if (!Number.isInteger(userId)) {
      throw new Error("Invalid token subject");
    }

    const user = findUserById.get(userId);

    if (!user) {
      return next(new HttpError(401, "Token inválido o expirado"));
    }

    request.user = user;
    return next();
  } catch {
    return next(new HttpError(401, "Token inválido o expirado"));
  }
}
