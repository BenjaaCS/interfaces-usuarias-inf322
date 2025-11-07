const FieldLabel = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-600 mb-1">
    {children}
  </label>
);

export default function EventFilters({
  value,
  onChange,
  categories,
  publicOptions,
  statuses,        // por si lo usas en otro lado
  onClearDate,     // callback opcional para limpiar fecha
}) {
  // Estado derivado seguro (defaults)
  const filters = {
    query: "",
    category: "Todos",
    public: "Todos",
    status: "Todos",
    selectedDate: null,
    ...(value ?? {}),
  };

  const categoryOptions =
    categories ?? ["Todos", "Académico", "Administrativo", "Deportes", "Cultura", "Taller", "Otro"];

  const publicOpts = publicOptions ?? ["Todos", "Público", "Privado"];
  const statusOptions = statuses ?? ["Todos", "Programado", "En curso", "Finalizado"];

  const handleChange = (field) => (e) => {
    const val = e?.target?.value ?? e;
    onChange?.({ ...filters, [field]: val });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
      <div className="mb-5">
        <FieldLabel htmlFor="f-query">Buscar</FieldLabel>
        <input
          id="f-query"
          value={filters.query}
          onChange={handleChange("query")}
          placeholder="Buscar por título"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor="f-category">Categoría</FieldLabel>
        <select
          id="f-category"
          value={filters.category}
          onChange={handleChange("category")}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <FieldLabel htmlFor="f-public">Público</FieldLabel>
        <select
          id="f-public"
          value={filters.public}
          onChange={handleChange("public")}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          {publicOpts.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* (Opcional) si usas estados en otro lado */}
      {/* <div className="mb-5">
        <FieldLabel htmlFor="f-status">Estado</FieldLabel>
        <select
          id="f-status"
          value={filters.status}
          onChange={handleChange("status")}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div> */}

      {filters.selectedDate && (
        <button
          type="button"
          onClick={() => onClearDate?.()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar fecha seleccionada
        </button>
      )}
    </div>
  );
}