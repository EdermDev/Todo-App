import { type FilterProps, TODO_FILTERS } from "../types.d";
import AllTodos from "./icons/AllTodos";
import Completed from "./icons/Completed";
import Active from "./icons/Active";
import React, { useState } from "react";

interface Props {
  onFilterChange: (filter: FilterProps) => void;
  activeTab: FilterProps;
  sortTodos: (sortBy: string) => void;
}
function Menu({ onFilterChange, activeTab, sortTodos }: Props) {
  const [selectedOption, setSelectedOption] = useState("recent");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortTodos(e.target.value);
    setSelectedOption(e.target.value);
  };

  return (
    <div className="border-b border-gray-200 ">
      <div className="flex justify-between items-center flex-col sm:flex-row ">
        <ul className="flex flex-col sm:flex-row -mb-px text-sm font-medium sm:text-center text-gray-500">
          <li className="me-2">
            <button
              className={`inline-flex items-center justify-center p-4 border-b-2  rounded-t-lg group ${
                activeTab === TODO_FILTERS.ALL
                  ? "text-blue-600 border-blue-600"
                  : "hover:text-gray-600 hover:border-gray-300 border-transparent"
              } `}
              onClick={() => {
                onFilterChange(TODO_FILTERS.ALL);
                setSelectedOption("recent");
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
                setSelectedOption("recent");
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
                setSelectedOption("recent");
              }}
            >
              <Completed width={20} height={20} activeTab={activeTab} />
              Completadas
            </button>
          </li>
        </ul>
        <label className="text-sm font-medium text-gray-900 flex items-center sm:mb-2 sm:mt-0 my-6 ">
          Ordenar por:
          <select
            className="bg-gray-50 hover:bg-gray-100 transition duration-75 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 p-1 ms-2 "
            value={selectedOption}
            onChange={handleSelect}
          >
            <option value="recent">Recientes</option>
            <option value="older">Antiguos</option>
            <option value="alfabetic">Alfabético</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Menu;
