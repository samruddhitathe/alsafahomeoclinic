import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface AdminLoginProps {
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      onClose();
      // Redirect to admin dashboard
      window.location.hash = '#admin-dashboard';
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Lock className="text-emerald-800" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Admin Login</h2>
          <p className="text-stone-600 mt-2">Enter password to access admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-stone-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-colors"
              placeholder="Enter admin password"
              autoFocus
            />
            {error && (
              <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white py-3 rounded-xl font-bold hover:bg-emerald-900 transition-colors shadow-lg active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-stone-400 text-center mt-6">
          Default password: admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;