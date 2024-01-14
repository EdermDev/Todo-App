import { type TodoList } from "../types";

export const setLocalStorage = (key: string, todos: TodoList) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(todos));
  }
};
export const getLocalStorage = (key: string) => {
  if (typeof localStorage !== "undefined") {
    const savedTodos = localStorage.getItem(key);
    if (savedTodos !== null) {
      return JSON.parse(savedTodos);
    }
  }
};

export function getNextId(todos: TodoList): number {
  const idsExistente = todos.map((todo) => todo.id);

  let idMasBajo = 1;
  while (idsExistente.includes(idMasBajo)) {
    idMasBajo++;
  }

  return idMasBajo;
}
