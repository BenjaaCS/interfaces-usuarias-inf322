// src/utils/categoryColors.js
export const CATEGORY_COLORS = {
  Todos: "bg-gray-300 text-gray-800",
  Académico: "bg-blue-600 text-white",
  Administrativo: "bg-emerald-600 text-white",
  Deportes: "bg-orange-500 text-white",
  Cultura: "bg-purple-600 text-white",
  Taller: "bg-teal-600 text-white",
  Otro: "bg-gray-500 text-white",
};

export function colorFor(category) {
  const key = String(category ?? "Otro").trim();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.Otro;
}
