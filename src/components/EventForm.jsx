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
  startTime: '',
  endTime: '',
  status: 'Programado',
  imageUrl: '',
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
        startTime: initialValues.startTime || '',
        endTime: initialValues.endTime || '',
        status: initialValues.status || 'Programado',
        imageUrl: initialValues.imageUrl || '',
      });
    } else {
      setFormData(initialFormState);
    }
  }, [mode, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // --- INICIO DE LA LÓGICA MODIFICADA ---
    if (name === "startDate") {
      // Si la nueva fecha de inicio es posterior a la fecha de fin actual,
      // actualizamos también la fecha de fin para que sea igual a la de inicio.
      if (value > formData.endDate && formData.endDate) {
        setFormData((prev) => ({
          ...prev,
          startDate: value,
          endDate: value,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // --- FIN DE LA LÓGICA MODIFICADA ---
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
            {/* --- CAMBIO PRINCIPAL AQUÍ --- */}
            <input 
              type="date" 
              id="endDate" 
              name="endDate" 
              value={formData.endDate} 
              onChange={handleChange} 
              min={formData.startDate} // Se añade la propiedad 'min'
              disabled={!formData.startDate} // Opcional: deshabilita si no hay fecha de inicio
              className={inputClassName} 
              required 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                Hora de inicio <span className="text-red-500"></span>
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                Hora de término <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={inputClassName}
                required
              />
            </div>
          </div>

          <p className="mt-1 text-xs text-gray-500">
            Usa formato de 24 horas (por ejemplo, 15:00 a 17:00).
          </p>
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
      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium mb-1"
        >
          Imagen del evento (URL, opcional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://... (afiche del evento)"
          className={inputClassName}
        />
        <p className="mt-1 text-xs text-gray-500">
          Esta imagen se mostrará en la tarjeta del evento, similar a usm.cl/eventos.
        </p>
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
