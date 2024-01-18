import ReactIcon from "./icons/React";
import TypeScriptIcon from "./icons/TypeScript";
import TailwindCSS from "./icons/TailwindCSS";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 w-full text-slate-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-y-8 sm:gap-0 justify-center py-6 text-center">
        <aside className="sm:w-1/2 flex flex-col items-center">
          <h2 className="font-bold ">Tecnologías usadas:</h2>
          <ul className="ms-0 sm:ms-4">
            <li className="flex items-center gap-x-2">
              <span>
                <ReactIcon width={20} height={20} />
              </span>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 text-blue-950"
              >
                React
              </a>
            </li>
            <li className="flex items-center gap-x-2">
              <span>
                <TypeScriptIcon width={20} height={17} />
              </span>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 text-blue-950"
              >
                TypeScript
              </a>
            </li>
            <li className="flex items-center gap-x-2">
              <span>
                <TailwindCSS width={20} height={20} />
              </span>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 text-blue-950"
              >
                TailwindCSS
              </a>
            </li>
          </ul>
        </aside>
        <p className="sm:w-1/2">
          Hecho con ❤ por {""}
          <a
            href="https://github.com/EdermDev"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 text-blue-600"
          >
            Eder Martínez
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
