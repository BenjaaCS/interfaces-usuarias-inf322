// --- START OF FILE components/EventForm.jsx ---

import { useState, useEffect } from 'react';

const initialFormState = {
  title: '',
  description: '',
  campus: '',
  category: '',
  public: '',
  organizerUnit: '',
  specificDepartment: '',
  startDate: '',
  endDate: '',
  time: '',
};

export default function EventForm({ mode, initialValues, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    // Si estamos en modo 'edit', llenamos el formulario con los valores iniciales.
    if (mode === 'edit' && initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        campus: initialValues.campus || '',
        category: initialValues.category || '',
        public: initialValues.public || '',
        organizerUnit: initialValues.organizerUnit || '',
        specificDepartment: initialValues.specificDepartment || '',
        // Aseguramos que las fechas tengan el formato correcto para el input type="date"
        startDate: initialValues.startDate?.split('T')[0] || '',
        endDate: initialValues.endDate?.split('T')[0] || '',
        time: initialValues.time || '',
      });
    } else {
      setFormData(initialFormState);
    }
  }, [mode, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Estilos comunes para los inputs y selects para no repetirlos
  const inputClassName = "w-full bg-white text-gray-900 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-gray-700">
      {/* --- SECCIÓN DATOS DEL EVENTO --- */}
      <div>
        <h3 className="text-lg font-bold pb-2 mb-4 border-b border-gray-300">Datos del evento</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Título del evento <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Ej: Charla sobre Inteligencia Artificial" className={inputClassName} required />
          </div>
          
          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Temática <span className="text-red-500">*</span></label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className={inputClassName} required>
                <option value="" disabled>Seleccionar...</option>
                <option>Académico</option>
                <option>Cultural</option>
                <option>Deportivo</option>
                <option>Administrativo</option>
              </select>
            </div>
            <div>
              <label htmlFor="public" className="block text-sm font-medium mb-1">Público a quien va dirigido <span className="text-red-500">*</span></label>
              <select id="public" name="public" value={formData.public} onChange={handleChange} className={inputClassName} required>
                <option value="" disabled>Seleccionar...</option>
                <option>Estudiantes</option>
                <option>Académicos</option>
                <option>Funcionarios</option>
                <option>Toda la comunidad</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción de la actividad <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detalla aquí en qué consiste el evento..." rows="4" className={inputClassName} required></textarea>
          </div>
        </div>
      </div>
      
      {/* --- SECCIÓN FECHAS Y LUGAR --- */}
      <div>
        <h3 className="text-lg font-bold pb-2 mb-4 border-b border-gray-300">Fechas y Lugar</h3>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium mb-1">Fecha de inicio <span className="text-red-500">*</span></label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className={inputClassName} required />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-1">Fecha de fin <span className="text-red-500">*</span></label>
            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className={inputClassName} required />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">Hora <span className="text-red-500">*</span></label>
            <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} placeholder="Ej: 15:00 - 17:00" className={inputClassName} required />
          </div>
          <div>
            <label htmlFor="campus" className="block text-sm font-medium mb-1">Campus o Sede <span className="text-red-500">*</span></label>
            <select id="campus" name="campus" value={formData.campus} onChange={handleChange} className={inputClassName} required>
                <option value="" disabled>Seleccionar...</option>
                <option>Casa Central Valparaíso</option>
                <option>Campus Santiago San Joaquín</option>
                <option>Campus Santiago Vitacura</option>
                <option>Sede Viña del Mar</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN DATOS DEL ORGANIZADOR --- */}
      <div>
        <h3 className="text-lg font-bold pb-2 mb-4 border-b border-gray-300">Datos del Organizador</h3>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <label htmlFor="organizerUnit" className="block text-sm font-medium mb-1">Unidad que organiza <span className="text-red-500">*</span></label>
            <input type="text" id="organizerUnit" name="organizerUnit" value={formData.organizerUnit} onChange={handleChange} placeholder="Ej: Dirección de RR.HH." className={inputClassName} required />
          </div>
          <div>
            <label htmlFor="specificDepartment" className="block text-sm font-medium mb-1">Departamento específico</label>
            <input type="text" id="specificDepartment" name="specificDepartment" value={formData.specificDepartment} onChange={handleChange} placeholder="Ej: Depto. de Informática" className={inputClassName} />
          </div>
        </div>
      </div>

      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold">
          Cancelar
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          {mode === 'edit' ? 'Guardar Cambios' : 'Crear Evento'}
        </button>
      </div>
    </form>
  );
}