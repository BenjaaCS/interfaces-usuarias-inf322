// --- START OF FILE src/components/Header.jsx ---

export default function Header({
  loggedIn,
  onLogout,
  onOpenCreate,
  onOpenLogin,
}) {
  const doLogout = () => {
    if (typeof onLogout === 'function') onLogout();
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      {/* 1. Contenedor principal con Flexbox y más padding vertical (py-4) para acomodar el gran logo */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
        
        {/* 2. El logo ahora es mucho más grande para ser el elemento dominante */}
        <img
          src="/Logo_UTFSM.png" // Asegúrate de que este es el logo grande y completo
          alt="Universidad Técnica Federico Santa María"
          className="h-28 w-auto" // Aumentado drásticamente a h-28 (112px)
        />

        {/* 3. El título tiene un margen a la izquierda para separarse del logo */}
        <div className="ml-8">
          <h1 className="text-xl font-semibold tracking-wide">
            Tracker de Eventos
          </h1>
          {/* 2. Se añade el subtítulo solicitado */}
          <p className="text-sm opacity-90">
            Universidad Técnica Federico Santa María
          </p>
        </div>

        {/* 4. ¡LA CLAVE! Un div espaciador que crece y ocupa todo el espacio disponible, empujando el botón hacia la derecha. */}
        <div className="flex-grow"></div>

        {/* 5. El botón o grupo de botones, ahora posicionado correctamente en el extremo derecho */}
        {!loggedIn ? (
          <button
            onClick={onOpenLogin}
            className="px-5 py-2 bg-white text-blue-800 rounded-md text-sm font-semibold hover:bg-blue-100 transition-colors shadow"
          >
            Iniciar Sesión
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreate}
              className="px-4 py-2 bg-yellow-400 text-blue-900 rounded-lg shadow-sm hover:bg-yellow-500 font-semibold"
            >
              + Crear evento
            </button>
            <button
              onClick={doLogout}
              className="px-3 py-2 border border-white/70 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}