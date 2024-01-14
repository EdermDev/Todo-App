import { type FilterProps, TODO_FILTERS } from "../types.d";
import AllTodos from "./icons/AllTodos";
import Completed from "./icons/Completed";
import Active from "./icons/Active";

interface Props {
  onFilterChange: (filter: FilterProps) => void;
  activeTab: FilterProps;
}
function Menu({ onFilterChange, activeTab }: Props) {
  /*  const activeTab = useRef(TODO_FILTERS.ALL); */
  return (
    <div className="border-b border-gray-200 ">
      <ul className="flex flex-col sm:flex-row -mb-px text-sm font-medium text-center text-gray-500">
        <li className="me-2">
          <button
            className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg group ${
              activeTab === TODO_FILTERS.ALL
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 hover:border-gray-300 border-transparent"
            } `}
            onClick={() => {
              onFilterChange(TODO_FILTERS.ALL);
            }}
          >
            <AllTodos width={20} height={20} activeTab={activeTab} />
            Todas
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg group ${
              activeTab === TODO_FILTERS.ACTIVE
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 hover:border-gray-300 border-transparent"
            } `}
            onClick={() => {
              onFilterChange(TODO_FILTERS.ACTIVE);
            }}
          >
            <Active width={20} height={20} activeTab={activeTab} />
            Pendientes
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg group ${
              activeTab === TODO_FILTERS.COMPLETED
                ? "text-blue-600 border-blue-600"
                : "hover:text-gray-600 hover:border-gray-300 border-transparent"
            } `}
            onClick={() => {
              onFilterChange(TODO_FILTERS.COMPLETED);
            }}
          >
            <Completed width={20} height={20} activeTab={activeTab} />
            Completadas
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
