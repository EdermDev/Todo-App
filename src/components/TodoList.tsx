import { useState } from "react";
import {
  type TodoId,
  type Todo,
  type TodoList,
  type TodoCompleted,
  type FilterProps,
} from "../types";
import EditModal from "./EditModal";
import Settings from "./icons/Settings";
import { Button, Dropdown } from "keep-react";
import Edit from "./icons/Edit";
import Delete from "./icons/Delete";
import { toast } from "sonner";
import DeleteModal from "./DeleteModal";

type TodoListProps = {
  todos: TodoList;
  deleteTodo: ({ id }: TodoId) => void;
  toggleCompleted: ({ id, isCompleted }: TodoCompleted) => void;
  editTodo: ({ text, id }: { text: string; id: number }) => void;
  activeTab: FilterProps;
  deleteAllTodos: () => void;
  toggleAllCompleted: (isCompleted: boolean) => void;
};
const INIT_TODO = {
  id: 1,
  text: "",
  isCompleted: false,
  date: "",
};
function TodoList({
  todos,
  deleteTodo,
  toggleCompleted,
  editTodo,
  activeTab,
  deleteAllTodos,
  toggleAllCompleted,
}: TodoListProps) {
  const isAllChecked = () => {
    return todos.every((todo: Todo) => todo.isCompleted) ?? false;
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(INIT_TODO);
  const [selectAllChecked, setSelectAllChecked] = useState(isAllChecked);

  const handleDelete = ({ id }: TodoId) => {
    deleteTodo({ id });
    toast.success("La tarea se ha eliminado");
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);

    setShowEditModal(true);
  };

  const handleChangeCheck = (
    id: TodoId["id"],
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    toggleCompleted({
      id,
      isCompleted: event.target.checked,
    });
  };

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAllChecked(event.target.checked);
    toggleAllCompleted(event.target.checked);
  };

  const hasTodos = todos?.length > 0;

  return (
    <>
      {hasTodos && (
        <>
          <ul className="max-h-[30rem] overflow-y-auto ">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className="flex flex-col sm:flex-row justify-between items-end sm:items-center px-0.5 border-b  py-3"
              >
                <label className="w-full">
                  <div className="flex items-center gap-x-4 ">
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(event) => handleChangeCheck(todo.id, event)}
                      className="accent-blue-600 h-3.5 w-3.5"
                    />
                    <span
                      className="w-11/12 sm:max-w-[22rem] md:max-w-[30rem] text-ellipsis"
                      style={{ wordWrap: "break-word" }}
                    >
                      {todo.text}
                    </span>
                  </div>
                </label>

                <div className="flex items-center sm:justify-normal justify-between gap-x-4 w-80">
                  <time className="text-xs text-gray-600">{todo.date}</time>
                  <div
                    role="status"
                    className={`rounded px-2 py-0.5 text-xs ${
                      todo.isCompleted ? "bg-red-200" : "bg-green-200"
                    }`}
                  >
                    {todo.isCompleted ? "Completado" : "Pendiente"}
                  </div>

                  <Dropdown
                    label={<Settings width={20} height={20} />}
                    size="xs"
                    type="linkGray"
                    arrowIcon={false}
                    dismissOnClick={true}
                  >
                    <Dropdown.Item onClick={() => handleEdit(todo)}>
                      <Edit width={12} height={12} />
                      <span className="ms-2">Editar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDelete({ id: todo.id })}
                    >
                      <Delete width={12} height={12} />
                      <span className="ms-2">Eliminar</span>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6 px-0.5">
            <div className="">
              <label className="w-full">
                <div className="flex items-center gap-x-4 ">
                  <input
                    type="checkbox"
                    className="accent-blue-600 h-3.5 w-3.5"
                    checked={selectAllChecked}
                    onChange={handleSelectAllChange}
                  />
                  <span
                    className="w-11/12 sm:max-w-[22rem] md:max-w-[30rem] text-ellipsis"
                    style={{ wordWrap: "break-word" }}
                  >
                    Seleccionar todas
                  </span>
                </div>
              </label>
            </div>

            <Button
              size="xs"
              type="linkGray"
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              <span className="me-2">Borrar todas</span>
              <Delete width={15} height={15} />
            </Button>
          </div>
        </>
      )}
      {activeTab === "all" && !hasTodos && (
        <div className="flex items-center justify-center mt-12">
          <p className="text-center text-pretty">
            No tienes tareas. Empieza a crear una
          </p>
          <p className="animate-bounce ms-1"> ☝</p>
        </div>
      )}
      {activeTab === "active" && !hasTodos && (
        <div className="flex items-center justify-center mt-12">
          <p className="text-center text-pretty">
            No tienes ninguna tarea pendiente.
          </p>
        </div>
      )}
      {activeTab === "completed" && !hasTodos && (
        <div className="flex items-center justify-center mt-12">
          <p className="text-center text-pretty">
            No tienes ninguna tarea completada.
          </p>
        </div>
      )}
      <EditModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        todo={selectedTodo}
        editTodo={editTodo}
      />

      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        deleteAllTodos={deleteAllTodos}
      />
    </>
  );
}

export default TodoList;
