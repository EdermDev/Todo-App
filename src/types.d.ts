//Todo
export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  date: string;
}
export type TodoInput = {
  todoInput: string;
};

export type TodoText = Pick<Todo, "text">;
export type TodoId = Pick<Todo, "id">;
export type TodoCompleted = Pick<Todo, "id" | "isCompleted">;

export type TodoList = Todo[];

//Filter
export type FilterProps = "all" | "active" | "completed";

export enum TODO_FILTERS {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}
//Icons props
export interface IconsProps {
  width: number;
  height: number;
}

export interface MenuProps extends IconsProps {
  activeTab: FilterProps;
}
