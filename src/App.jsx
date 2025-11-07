// --- START OF FILE App.jsx ---

import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import EventFilters from './components/EventFilters.jsx';
import EventGrid from './components/EventGrid.jsx';
import UpcomingEvents from './components/UpcomingEvents.jsx';
import Calendar from './components/Calendar.jsx';
import Modal from './components/Modal.jsx';
import EventForm from './components/EventForm.jsx';
import ToastStack from './components/ToastStack.jsx';
import LoginForm from './components/LoginForm.jsx'; // Importar el nuevo componente
import { initialEvents } from './data/initialEvents.js';
import { formatDate } from './utils/date.js';

const STORAGE_KEY = 'event-tracker-events';

const App = () => {
  // ... (loadEvents y useState para 'events' sin cambios)
  const loadEvents = () => {
    if (typeof window === 'undefined') return initialEvents;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing events from localStorage', error);
    }
    return initialEvents;
  };
  const [events, setEvents] = useState(loadEvents);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [filters, setFilters] = useState({ query: '', category: 'Todos', public: 'Todos', selectedDate: null });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [detailEventId, setDetailEventId] = useState(null);
  const [formState, setFormState] = useState({ open: false, mode: 'create', event: null });
  const [toasts, setToasts] = useState([]);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Estado para el modal de login

  // ... (pushToast sin cambios)
  const pushToast = (message, type = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };
  
  const handleLogin = ({ username, password }) => {
    if (username === 'admin' && password === '1234') {
      setLoggedIn(true);
      pushToast('Inicio de sesión exitoso', 'success');
      setLoginModalOpen(false); // Cierra el modal al iniciar sesión
      return true;
    }
    pushToast('Credenciales incorrectas', 'error');
    return false;
  };

  const handleLogout = () => {
    setLoggedIn(false);
    pushToast('Sesión cerrada correctamente', 'info');
  };

  // ... (useMemo para categoryOptions, publicOptions, filteredEvents, upcomingEvents sin cambios)
  const categoryOptions = useMemo(() => new Set(events.map((event) => event.category)), [events]);
  const publicOptions = useMemo(() => new Set(events.map((event) => event.public)), [events]);
  const filteredEvents = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();
    return events.filter((event) => {
      const matchesQuery = event.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory = filters.category === 'Todos' || event.category === filters.category;
      const matchesPublic = filters.public === 'Todos' || event.public === filters.public;
      const matchesDate = !filters.selectedDate || (event.startDate <= filters.selectedDate && event.endDate >= filters.selectedDate);
      return matchesQuery && matchesCategory && matchesPublic && matchesDate;
    });
  }, [events, filters]);
  const upcomingEvents = useMemo(() => {
    const todayIso = new Date().toISOString().slice(0, 10);
    return events.filter((event) => event.endDate >= todayIso).sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 5);
  }, [events]);

  const detailEvent = detailEventId ? events.find((event) => event.id === detailEventId) : null;
  
  // ... (open/close/handle de modales de formulario y eventos sin cambios)
  const openCreateModal = () => setFormState({ open: true, mode: 'create', event: null });
  const openEditModal = (id) => {
    const found = events.find((event) => event.id === id);
    if (found) setFormState({ open: true, mode: 'edit', event: found });
  };
  const closeFormModal = () => setFormState({ open: false, mode: 'create', event: null });
  const handleDeleteEvent = (id) => {
    const target = events.find((event) => event.id === id);
    if (!target) return;
    if (window.confirm(`Seguro que deseas eliminar "${target.title}"?`)) {
      setEvents((current) => current.filter((event) => event.id !== id));
      pushToast('Evento eliminado', 'info');
      if (detailEventId === id) setDetailEventId(null);
    }
  };
  const handleSubmitEvent = (formData) => {
    if (formData.endDate < formData.startDate) {
      pushToast('La fecha de fin debe ser posterior a la de inicio', 'error');
      return;
    }
    if (formState.mode === 'edit' && formState.event) {
      setEvents((current) => current.map((event) => event.id === formState.event.id ? { ...formData, id: event.id } : event));
      pushToast('Evento actualizado con éxito', 'success');
    } else {
      const newEvent = { ...formData, id: `ev-${Date.now()}` };
      setEvents((current) => [newEvent, ...current]);
      pushToast('Evento creado con éxito', 'success');
    }
    closeFormModal();
  };

  const currentTitle = filters.selectedDate ? `Eventos para el ${formatDate(filters.selectedDate, { day: 'numeric', month: 'long' })}` : 'Todos los Eventos';

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))} />

      <Header
        loggedIn={loggedIn}
        onOpenLogin={() => setLoginModalOpen(true)} // Nueva prop
        onLogout={handleLogout}
        onOpenCreate={openCreateModal}
      />

      <main className="max-w-7xl mx-auto p-6 lg:p-8">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <EventFilters
                value={filters}
                onChange={setFilters}
                categories={['Todos', ...Array.from(categoryOptions)]}
                publicOptions={['Todos', ...Array.from(publicOptions)]}
                onClearDate={() => setFilters((c) => ({ ...c, selectedDate: null }))}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <UpcomingEvents events={upcomingEvents} onSelect={setDetailEventId} />
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <EventGrid title={currentTitle} events={filteredEvents} loggedIn={loggedIn} onSelect={setDetailEventId} onEdit={openEditModal} onDelete={handleDeleteEvent} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Calendar currentDate={currentDate} onPrev={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))} onNext={() => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))} events={events} onSelectDate={(iso) => setFilters((c) => ({ ...c, selectedDate: c.selectedDate === iso ? null : iso }))} selectedDate={filters.selectedDate} />
            </div>
          </div>
        </section>
      </main>

      {/* --- MODAL DE DETALLES (MEJORADO) --- */}
      <Modal open={Boolean(detailEvent)} onClose={() => setDetailEventId(null)} showClose={false} contentClassName="bg-white rounded-lg w-full max-w-2xl shadow-xl">
        {detailEvent && (
          <div>
            <header className="flex items-start justify-between p-6 border-b bg-gray-50 rounded-t-lg">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{detailEvent.title}</h2>
                <p className="text-md text-gray-500">{detailEvent.campus}</p>
              </div>
              <button onClick={() => setDetailEventId(null)} className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors" aria-label="Cerrar">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>
            <div className="p-6 space-y-4 text-gray-700">
              {/* Aquí podrías agregar íconos a cada línea para mayor impacto visual */}
              <p><strong>Fechas:</strong> {detailEvent.startDate === detailEvent.endDate ? formatDate(detailEvent.startDate) : `Del ${formatDate(detailEvent.startDate)} al ${formatDate(detailEvent.endDate)}`}</p>
              <p><strong>Hora:</strong> {detailEvent.time}</p>
              <p><strong>Categoría:</strong> {detailEvent.category}</p>
              <p><strong>Público:</strong> {detailEvent.public}</p>
              <p className="leading-relaxed whitespace-pre-line pt-4">{detailEvent.description}</p>
              <hr className="my-4"/>
              <p><strong>Organiza:</strong> {detailEvent.organizerUnit}</p>
              <p><strong>Departamento:</strong> {detailEvent.specificDepartment}</p>
            </div>
            {loggedIn && (
              <footer className="px-6 py-4 bg-gray-50 border-t rounded-b-lg flex justify-end gap-3">
                <button onClick={() => { setDetailEventId(null); openEditModal(detailEvent.id); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">Editar</button>
                <button onClick={() => handleDeleteEvent(detailEvent.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">Eliminar</button>
              </footer>
            )}
          </div>
        )}
      </Modal>

      {/* --- MODAL DE FORMULARIO (MEJORADO) --- */}
      <Modal open={formState.open} onClose={closeFormModal} showClose={false} contentClassName="bg-white rounded-lg w-full max-w-4xl shadow-xl">
        {formState.open && (
          <div>
            <header className="p-6 bg-blue-700 rounded-t-lg">
              <h2 className="text-2xl font-bold text-white">{formState.mode === 'edit' ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>
            </header>
            <div className="p-8">
              <EventForm mode={formState.mode} initialValues={formState.event} onSubmit={handleSubmitEvent} onCancel={closeFormModal} />
            </div>
          </div>
        )}
      </Modal>

      {/* --- NUEVO MODAL DE LOGIN --- */}
      <Modal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} showClose={false} contentClassName="bg-white rounded-lg w-full max-w-md shadow-xl">
        <LoginForm onLogin={handleLogin} onCancel={() => setLoginModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
