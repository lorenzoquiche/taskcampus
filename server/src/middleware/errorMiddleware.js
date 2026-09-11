export class HttpError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function apiNotFound(_request, _response, next) {
  next(new HttpError(404, "Ruta de API no encontrada"));
}

export function errorHandler(error, _request, response, _next) {
  const status = error.status || 500;

  if (status >= 500) {
    console.error(error);
  }

  response.status(status).json({
    message: status >= 500 ? "Ocurrió un error interno" : error.message,
    errors: error.errors || [],
  });
}
