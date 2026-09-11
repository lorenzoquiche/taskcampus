import http from "./http.js";

export const taskService = {
  async list(filters = {}) {
    const { data } = await http.get("/tasks", { params: filters });
    return data.tasks;
  },
  async get(id) {
    const { data } = await http.get(`/tasks/${id}`);
    return data.task;
  },
  async create(task) {
    const { data } = await http.post("/tasks", task);
    return data;
  },
  async update(id, task) {
    const { data } = await http.put(`/tasks/${id}`, task);
    return data;
  },
  async remove(id) {
    const { data } = await http.delete(`/tasks/${id}`);
    return data;
  },
};
