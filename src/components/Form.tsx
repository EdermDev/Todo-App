import { type TodoText, type TodoInput } from "../types";

type FormProps = {
  addTodo: ({ text }: TodoText) => void;
};
function Form({ addTodo }: FormProps) {
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { todoInput } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as TodoInput;

    if (todoInput === "") return;
    addTodo({ text: todoInput });

    (e.target as HTMLFormElement).todoInput.value = "";
  };

  return (
    <form className="relative w-full" onSubmit={handleSumbit}>
      <input
        type="text"
        name="todoInput"
        className="block border border-gray-300 text-gray-900 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent w-full focus:shadow-sm"
        placeholder="Agrega una tarea..."
      />

      <button className="text-gray-500 absolute right-2 top-1/2 -translate-y-1/2  rounded-full border-gray-200 hover:text-gray-400 active:text-gray-600 transition ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </form>
  );
}

export default Form;
