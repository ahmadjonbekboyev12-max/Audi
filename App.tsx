
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicView from './components/PublicView';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import { LinkItem, AppSettings } from './types';
import { DEFAULT_LINKS, DEFAULT_SETTINGS } from './constants';

const App: React.FC = () => {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem('audi_links');
    return saved ? JSON.parse(saved) : DEFAULT_LINKS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('audi_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('audi_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('audi_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('audi_settings', JSON.stringify(settings));
  }, [settings]);

  const handleLogin = (status: boolean) => {
    setIsAuthenticated(status);
    localStorage.setItem('audi_auth', status.toString());
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<PublicView links={links} settings={settings} />} 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? 
            <AdminPanel 
              links={links} 
              setLinks={setLinks} 
              settings={settings} 
              setSettings={setSettings} 
              onLogout={() => handleLogin(false)}
            /> : 
            <Navigate to="/login" />
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
