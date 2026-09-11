import database from "../database/database.js";
import { HttpError } from "../middleware/errorMiddleware.js";

const fields = "id, user_id, title, course, description, due_date, priority, status, created_at, updated_at";
const findOwned = database.prepare(`SELECT ${fields} FROM tasks WHERE id = ? AND user_id = ?`);
const insert = database.prepare("INSERT INTO tasks (user_id, title, course, description, due_date, priority, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
const update = database.prepare("UPDATE tasks SET title = ?, course = ?, description = ?, due_date = ?, priority = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?");
const remove = database.prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");

function ownedTask(id, userId) {
  const task = findOwned.get(id, userId);
  if (!task) throw new HttpError(404, "Tarea no encontrada");
  return task;
}

export function listTasks(request, response) {
  const { search, status, priority } = request.query;
  const conditions = ["user_id = ?"];
  const values = [request.user.id];
  if (search) {
    conditions.push("(title LIKE ? COLLATE NOCASE OR course LIKE ? COLLATE NOCASE OR description LIKE ? COLLATE NOCASE)");
    const term = `%${search}%`;
    values.push(term, term, term);
  }
  if (status) { conditions.push("status = ?"); values.push(status); }
  if (priority) { conditions.push("priority = ?"); values.push(priority); }
  const tasks = database.prepare(`SELECT ${fields} FROM tasks WHERE ${conditions.join(" AND ")} ORDER BY due_date ASC, created_at DESC`).all(...values);
  response.json({ tasks });
}

export function getTask(request, response, next) {
  try { response.json({ task: ownedTask(request.params.id, request.user.id) }); }
  catch (error) { next(error); }
}

export function createTask(request, response) {
  const { title, course, description = "", due_date, priority, status } = request.body;
  const result = insert.run(request.user.id, title, course, description || "", due_date, priority, status);
  response.status(201).json({ message: "Tarea creada correctamente", task: findOwned.get(Number(result.lastInsertRowid), request.user.id) });
}

export function updateTaskById(request, response, next) {
  try {
    ownedTask(request.params.id, request.user.id);
    const { title, course, description = "", due_date, priority, status } = request.body;
    update.run(title, course, description || "", due_date, priority, status, request.params.id, request.user.id);
    response.json({ message: "Tarea actualizada correctamente", task: findOwned.get(request.params.id, request.user.id) });
  } catch (error) { next(error); }
}

export function deleteTaskById(request, response, next) {
  try {
    ownedTask(request.params.id, request.user.id);
    remove.run(request.params.id, request.user.id);
    response.json({ message: "Tarea eliminada correctamente" });
  } catch (error) { next(error); }
}
