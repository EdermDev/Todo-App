import { type MenuProps, TODO_FILTERS } from "../../types.d";

function Completed({ width, height, activeTab }: MenuProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 448 512"
      className={`w-4 h-4 me-2 ${
        activeTab === TODO_FILTERS.COMPLETED
          ? "text-blue-600"
          : "text-gray-400 group-hover:text-gray-500"
      }  `}
      fill="currentColor"
    >
      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
  );
}

export default Completed;
