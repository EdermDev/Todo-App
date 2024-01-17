import { type TodoList } from "../types";

export function getNextId(todos: TodoList): number {
  const idsExistente = todos.map((todo) => todo.id);

  let idMasBajo = 1;
  while (idsExistente.includes(idMasBajo)) {
    idMasBajo++;
  }

  return idMasBajo;
}
