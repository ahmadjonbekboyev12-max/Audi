
import React, { useState } from 'react';
import { ADMIN_CREDENTIALS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.login && password === ADMIN_CREDENTIALS.password) {
      onLogin(true);
    } else {
      setError('Ruxsat berilmadi');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#eee_0%,_#fff_100%)]"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white rounded-sm p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-t-4 border-red-600">
          <div className="flex flex-col items-center mb-10">
            <Link to="/">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2560px-Audi-Logo_2016.svg.png" 
                alt="Audi" 
                className="h-6 brightness-0 mb-6"
              />
            </Link>
            <h2 className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase">Boshqaruv Tizimi</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Login</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-sm py-4 px-4 text-black focus:outline-none focus:border-red-600 transition-all font-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-sm py-4 px-4 text-black focus:outline-none focus:border-red-600 transition-all font-medium"
                required
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-red-600 text-[10px] uppercase tracking-widest text-center font-bold"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-sm hover:bg-red-600 transition-all duration-300 uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 group"
            >
              <span>Kirish</span>
              <LucideIcons.Lock size={16} />
            </button>
            
            <Link to="/" className="block text-center text-[10px] text-gray-400 hover:text-black uppercase tracking-widest transition-colors pt-4">
              Bekor qilish
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
