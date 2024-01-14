function Header() {
  return (
    <header className="mt-24">
      <hgroup className="flex flex-col items-center gap-y-4">
        <h1 className="text-slate-800 text-6xl font-medium text-center">
          📝Todo<sup className="text-blue-600 text-3xl">TS</sup>
        </h1>
        <h2 className="text-slate-600 text-lg">¡Crea tus tareas fácilmente!</h2>
      </hgroup>
    </header>
  );
}

export default Header;
