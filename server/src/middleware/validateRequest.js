import { validationResult } from "express-validator";

export function validateRequest(request, response, next) {
  const result = validationResult(request);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map(({ msg, path }) => ({
    field: path,
    message: msg,
  }));

  return response.status(400).json({
    message: "Revisa los datos enviados",
    errors,
  });
}
