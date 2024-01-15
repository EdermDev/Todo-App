import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";
import Menu from "./components/Menu";
import TodoList from "./components/TodoList";
import useTodo from "./hooks/useTodo";
import { Toaster } from "sonner";

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodoCompleted,
    filterCompletedTodos,
    activeTab,
    editTodo,
    sortTodos,
  } = useTodo();

  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      <div className="min-h-screen flex flex-col items-center container mx-auto max-w-screen-md px-6 sm:px-4 gap-y-20">
        <Header />
        <Form addTodo={addTodo} />
        <main className="w-full flex-grow">
          <Menu
            onFilterChange={filterCompletedTodos}
            activeTab={activeTab.current}
            sortTodos={sortTodos}
          />
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleCompleted={toggleTodoCompleted}
            editTodo={editTodo}
            activeTab={activeTab.current}
          />
          <Toaster position="bottom-right" />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
