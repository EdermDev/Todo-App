import { useEffect, useRef, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../services/todos";
import {
  type TodoText,
  type Todo,
  type TodoId,
  type TodoList,
  type TodoCompleted,
  TODO_FILTERS,
  type FilterProps,
} from "../types.d";
import { getNowTime } from "../utils/utils";
import { getNextId } from "../helpers/helpers";
function useTodo() {
  const restoredData = () => {
    return getLocalStorage("todo") ?? [];
  };
  const [originalTodos, setOriginalTodos] = useState<TodoList>(restoredData);
  const [filteredTodos, setFilteredTodos] = useState<TodoList>(originalTodos);
  const activeTab = useRef(TODO_FILTERS.ALL);
  const isNewTodo = useRef(false);

  const addTodo = ({ text }: TodoText) => {
    const newTodo = {
      id: getNextId(originalTodos),
      text: text,
      isCompleted: false,
      date: getNowTime(),
    };
    setOriginalTodos((prevTodos) => [newTodo, ...prevTodos]);

    setFilteredTodos([newTodo, ...filteredTodos]);
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

  const deleteAllTodos = () => {
    setOriginalTodos([]);
    setFilteredTodos([]);
  };

  const editTodo = ({ text, id }: { text: string; id: number }) => {
    const editedOriginalTodos = originalTodos.map((todo: Todo) =>
      id === todo.id ? { ...todo, text, date: getNowTime() } : todo
    );
    const recentOriginalTodos = editedOriginalTodos.sort((a: Todo, b: Todo) =>
      b.date.localeCompare(a.date)
    );
    setOriginalTodos(recentOriginalTodos);

    const editedFilteredTodos = filteredTodos.map((todo: Todo) =>
      id === todo.id ? { ...todo, text, date: getNowTime() } : todo
    );
    const recentFilteredTodos = editedFilteredTodos.sort((a: Todo, b: Todo) =>
      b.date.localeCompare(a.date)
    );
    setFilteredTodos(recentFilteredTodos);
  };

  const toggleTodoCompleted = ({ id, isCompleted }: TodoCompleted) => {
    const completedTodos = originalTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, isCompleted } : todo
    );
    setOriginalTodos(completedTodos);

    const completedFilteredTodos = filteredTodos?.map((todo: Todo) =>
      todo.id === id ? { ...todo, isCompleted } : todo
    );
    setFilteredTodos(completedFilteredTodos);
  };

  const toggleTodoAllCompleted = (isCompleted: boolean) => {
    const completedTodos = originalTodos.map((todo: Todo) => ({
      ...todo,
      isCompleted,
    }));

    setOriginalTodos(completedTodos);

    const completedFilteredTodos = filteredTodos?.map((todo: Todo) => ({
      ...todo,
      isCompleted,
    }));

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

  const sortTodos = (sortBy: string) => {
    if (sortBy === "alfabetic") {
      const sortedTodos = [...filteredTodos].sort((a: Todo, b: Todo) =>
        a.text.localeCompare(b.text)
      );
      setFilteredTodos(sortedTodos);
    }
    if (sortBy === "recent") {
      const sortedTodos = [...filteredTodos].sort((a: Todo, b: Todo) =>
        b.date.localeCompare(a.date)
      );
      setFilteredTodos(sortedTodos);
    }
    if (sortBy === "older") {
      const sortedTodos = [...filteredTodos].sort((a: Todo, b: Todo) =>
        a.date.localeCompare(b.date)
      );
      setFilteredTodos(sortedTodos);
    }
  };

  //Cuando hay un cambio en los TODOS se guarda en el local storage
  useEffect(() => {
    setLocalStorage("todo", originalTodos);
  }, [originalTodos]);

  //Cuando creas un nuevo TODO va a la pestaña de all
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
    editTodo,
    sortTodos,
    deleteAllTodos,
    toggleTodoAllCompleted,
  };
}

export default useTodo;
