import { useEffect, useRef, useState } from "react";
import { getLocalStorage, getNextId, setLocalStorage } from "../services/todos";
import {
  type TodoText,
  type Todo,
  type TodoId,
  type TodoList,
  type TodoCompleted,
  TODO_FILTERS,
  type FilterProps,
} from "../types.d";

function useTodo() {
  const restoredData = () => {
    return getLocalStorage("todo") ?? [];
  };
  const [originalTodos, setOriginalTodos] = useState<TodoList>(restoredData);
  const [filteredTodos, setFilteredTodos] = useState<TodoList>(originalTodos);
  const activeTab = useRef(TODO_FILTERS.ALL);
  const isNewTodo = useRef(false);

  const addTodo = ({ text }: TodoText) => {
    const formattedDate =
      new Date().toLocaleDateString() +
      " " +
      new Date().toLocaleTimeString().slice(0, 5);

    const newTodo = {
      id: getNextId(originalTodos),
      text: text,
      isCompleted: false,
      date: formattedDate,
    };
    console.log(newTodo.date);

    setOriginalTodos((prevTodos) => [...prevTodos, newTodo]);

    // Only add to filteredTodos if the current filter is "All"

    setFilteredTodos([...filteredTodos, newTodo]);
    isNewTodo.current = !isNewTodo.current;
  };

  const deleteTodo = ({ id }: TodoId) => {
    const deletedOriginalTodos = originalTodos.filter(
      (todo: Todo) => todo.id !== id
    );
    setOriginalTodos(deletedOriginalTodos);

    const deletedFilteredTodos = filteredTodos.filter(
      (todo: Todo) => todo.id !== id
    );
    setFilteredTodos(deletedFilteredTodos);
  };

  const toggleTodoCompleted = ({ id, isCompleted }: TodoCompleted) => {
    const completedTodos = originalTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, isCompleted } : todo
    );

    setOriginalTodos(completedTodos);

    // Update filteredTodos based on the current filter
    const completedFilteredTodos = filteredTodos?.map((todo: Todo) =>
      todo.id === id ? { ...todo, isCompleted } : todo
    );

    setFilteredTodos(completedFilteredTodos);
  };

  const filterCompletedTodos = (filter: FilterProps) => {
    if (filter === TODO_FILTERS.ALL) {
      activeTab.current = TODO_FILTERS.ALL;
      setFilteredTodos(originalTodos);
    } else if (filter === TODO_FILTERS.ACTIVE) {
      const filtered = originalTodos.filter((todo: Todo) => !todo.isCompleted);
      setFilteredTodos(filtered);
      activeTab.current = TODO_FILTERS.ACTIVE;
    } else if (filter === TODO_FILTERS.COMPLETED) {
      const filtered = originalTodos.filter((todo: Todo) => todo.isCompleted);
      setFilteredTodos(filtered);
      activeTab.current = TODO_FILTERS.COMPLETED;
    }
  };

  useEffect(() => {
    setLocalStorage("todo", originalTodos);
  }, [originalTodos]);

  useEffect(() => {
    filterCompletedTodos(TODO_FILTERS.ALL);
  }, [isNewTodo.current]);

  return {
    todos: filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodoCompleted,
    filterCompletedTodos,
    activeTab,
  };
}

export default useTodo;
