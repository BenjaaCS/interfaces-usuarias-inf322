// --- START OF FILE components/LoginForm.jsx ---

import { useState } from 'react';

export default function LoginForm({ onLogin, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onLogin === 'function') {
      const ok = onLogin({ username, password });
      if (ok) {
        setPassword('');
      }
    }
  };

  return (
    <div>
      <header className="p-6 bg-blue-700 rounded-t-lg">
        <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
      </header>
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="w-full border rounded-md px-3 py-2 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Usuario"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••"
            className="w-full border rounded-md px-3 py-2 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Contraseña"
          />
        </div>
        <footer className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Entrar
          </button>
        </footer>
      </form>
    </div>
  );
}