import { type TodoId, type Todo, type TodoList, TodoCompleted } from "../types";
import Settings from "./icons/Settings";
import { Dropdown } from "keep-react";

type TodoListProps = {
  todos: TodoList;
  deleteTodo: ({ id }: TodoId) => void;
  toggleCompleted: ({ id, isCompleted }: TodoCompleted) => void;
};

function TodoList({ todos, deleteTodo, toggleCompleted }: TodoListProps) {
  const handleDelete = ({ id }: TodoId) => {
    deleteTodo({ id });
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

  const hasTodos = todos?.length > 0;

  return (
    <>
      {hasTodos ? (
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

              <div className="flex items-center gap-x-4 ">
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
                  label={
                    <button>
                      <Settings width={20} height={20} />
                    </button>
                  }
                  size="sm"
                  type="linkGray"
                  arrowIcon={false}
                  dismissOnClick={true}
                >
                  <Dropdown.Item>Editar</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete({ id: todo.id })}>
                    Eliminar
                  </Dropdown.Item>
                </Dropdown>
                {/* <details className="dropdown">
                  <summary className="m-1 btn">open or close</summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </details> */}

                {/*   <button
                  onClick={() => handleDelete({ id: todo.id })}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Borrar
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <p className="text-center text-pretty">
            No tienes tareas. Empieza a crear una
          </p>
          <p className="animate-bounce ms-1"> ☝</p>
        </div>
      )}
    </>
  );
}

export default TodoList;
