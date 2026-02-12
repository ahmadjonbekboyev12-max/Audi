
import React, { useState } from 'react';
import { LinkItem, AppSettings, IconType } from '../types';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminPanelProps {
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ links, setLinks, settings, setSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'links' | 'settings'>('links');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'Yangi Havola',
      url: 'https://',
      iconName: IconType.Globe,
      isActive: true
    };
    setLinks([newLink, ...links]);
  };

  const deleteLink = (id: string) => {
    if (window.confirm('Haqiqatan ham ushbu havolani o\'chirmoqchimisiz?')) {
      setLinks(links.filter(l => l.id !== id));
    }
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    setLinks(links.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Sidebar / Top Nav */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={settings.logoUrl} className="h-6 invert" alt="Audi" />
            <span className="hidden md:inline text-white/40 font-light">|</span>
            <h1 className="hidden md:block font-bold tracking-tight">Boshqaruv</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveTab('links')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'links' ? 'bg-white text-black' : 'hover:bg-white/10 text-gray-400'}`}
            >
              Havolalar
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-white text-black' : 'hover:bg-white/10 text-gray-400'}`}
            >
              Sozlamalar
            </button>
            <button 
              onClick={onLogout}
              className="ml-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LucideIcons.LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'links' ? (
            <motion.div 
              key="links-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Havolalarni Boshqarish</h2>
                  <p className="text-gray-500 text-sm">Barcha faol havolalar ro'yxati</p>
                </div>
                <button 
                  onClick={addLink}
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center space-x-2 hover:bg-gray-200"
                >
                  <LucideIcons.Plus size={18} />
                  <span>Qo'shish</span>
                </button>
              </div>

              <div className="grid gap-4">
                {links.map((link) => (
                  <div key={link.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 transition-all hover:bg-white/[0.07]">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                          {(LucideIcons as any)[link.iconName] ? React.createElement((LucideIcons as any)[link.iconName], { size: 20 }) : <LucideIcons.Link size={20} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{link.title}</h3>
                          <p className="text-gray-500 text-xs truncate max-w-[200px] md:max-w-md">{link.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateLink(link.id, { isActive: !link.isActive })}
                          className={`p-2 rounded-lg transition-colors ${link.isActive ? 'text-green-500 bg-green-500/10' : 'text-gray-500 bg-gray-500/10'}`}
                          title={link.isActive ? "Faol" : "Nofaol"}
                        >
                          {link.isActive ? <LucideIcons.Eye size={18} /> : <LucideIcons.EyeOff size={18} />}
                        </button>
                        <button 
                          onClick={() => setEditingId(editingId === link.id ? null : link.id)}
                          className="p-2 text-blue-500 bg-blue-500/10 rounded-lg"
                        >
                          <LucideIcons.Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteLink(link.id)}
                          className="p-2 text-red-500 bg-red-500/10 rounded-lg"
                        >
                          <LucideIcons.Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {editingId === link.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="border-t border-white/10 pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Sarlavha</label>
                          <input 
                            type="text" 
                            value={link.title}
                            onChange={(e) => updateLink(link.id, { title: e.target.value })}
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">URL</label>
                          <input 
                            type="text" 
                            value={link.url}
                            onChange={(e) => updateLink(link.id, { url: e.target.value })}
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Ikonka</label>
                          <select 
                            value={link.iconName}
                            onChange={(e) => updateLink(link.id, { iconName: e.target.value })}
                            className="w-full bg-black/50 border border-white/20 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
                          >
                            {Object.values(IconType).map(icon => (
                              <option key={icon} value={icon}>{icon}</option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="settings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">Umumiy Sozlamalar</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">Brend Logotipi</label>
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                        <img src={settings.logoUrl} alt="Logo Preview" className="max-w-full h-auto max-h-16 object-contain invert" />
                      </div>
                      <div className="flex-1">
                        <input 
                          type="file" 
                          id="logo-upload" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                        <label 
                          htmlFor="logo-upload"
                          className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium"
                        >
                          <LucideIcons.Upload size={16} />
                          <span>Faylni tanlash</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-2">PNG, SVG yoki JPG formatlari tavsiya etiladi.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Slogan (Shior)</label>
                    <input 
                      type="text" 
                      value={settings.slogan}
                      onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                      placeholder="Texnologiya orqali yuksalish..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Orqa fon rangi</label>
                    <div className="flex items-center space-x-3">
                      <input 
                        type="color" 
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                        className="w-12 h-12 bg-transparent border-none rounded-lg cursor-pointer"
                      />
                      <span className="text-gray-300 font-mono text-sm">{settings.backgroundColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start space-x-4">
                <LucideIcons.AlertTriangle className="text-red-500 shrink-0" size={24} />
                <div>
                  <h3 className="text-red-500 font-bold">Ma'lumotlarni saqlash</h3>
                  <p className="text-sm text-gray-400 mt-1">O'zgarishlar brauzer xotirasida (LocalStorage) avtomatik ravishda saqlanadi.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Preview Button (only for mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <a 
          href="#/" 
          target="_blank"
          className="bg-white text-black p-4 rounded-full shadow-2xl flex items-center justify-center"
        >
          <LucideIcons.ExternalLink size={24} />
        </a>
      </div>
    </div>
  );
};

export default AdminPanel;
