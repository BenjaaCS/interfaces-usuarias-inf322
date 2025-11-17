// components/EventGrid.jsx
import { formatDate } from '../utils/date.js';

const statusColor = {
  Programado: 'bg-blue-600',
  'En curso': 'bg-green-600',
  Finalizado: 'bg-gray-500',
};

const EventCard = ({ event, loggedIn, onSelect, onEdit, onDelete }) => {
  const badgeColor = statusColor[event.status] || 'bg-blue-600';

  const handleSelect = () => {
    if (onSelect) onSelect(event.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) onEdit(event.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(event.id);
  };

  const startLabel = event.startDate ? formatDate(event.startDate) : '';
  const endLabel =
    event.endDate && event.endDate !== event.startDate
      ? formatDate(event.endDate)
      : null;

  return (
    <article
      className="event-card border rounded-lg p-4 shadow-sm bg-white text-gray-800 hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
      onClick={handleSelect}
    >
      {/* Imagen estilo usm.cl/eventos */}
      {event.imageUrl ? (
        <div className="-mx-4 -mt-4 mb-4 h-36 overflow-hidden rounded-t-lg">
          <img
            src={event.imageUrl}
            alt={`Imagen del evento ${event.title}`}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        // Placeholder suave si no hay imagen
        <div className="-mx-4 -mt-4 mb-4 h-10" />
      )}

      <div className="flex items-start justify-between mb-2">
        <h3 className="text-md font-semibold leading-snug">
          {event.title}
        </h3>
        {event.status && (
          <span
            className={`text-xs px-2 py-1 rounded-full text-white ${badgeColor}`}
          >
            {event.status}
          </span>
        )}
      </div>

      {event.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {event.description}
        </p>
      )}

      <p className="text-xs text-gray-500 mb-1">
        {startLabel}
        {endLabel && <> — {endLabel}</>}
        {event.time && ` · ${event.time}`}
      </p>

      {event.campus && (
        <p className="text-xs text-gray-500 mb-3">{event.campus}</p>
      )}

      {loggedIn && (
        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="px-3 py-1 text-xs rounded-full bg-gray-800 text-white hover:bg-gray-900"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-1 text-xs rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
};

const EventGrid = ({ title, events, loggedIn, onSelect, onEdit, onDelete }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <span className="text-xs text-gray-400">
        {events.length === 0
          ? 'Sin resultados para los filtros actuales'
          : `${events.length} evento(s) encontrados`}
      </span>
    </div>

    {events.length === 0 ? (
      <p className="text-sm text-gray-500">
        No se encontraron eventos con los filtros seleccionados.
      </p>
    ) : (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            loggedIn={loggedIn}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    )}
  </div>
);

export default EventGrid;