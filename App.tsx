import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WebView } from './components/WebView';
import { InstallPrompt } from './components/InstallPrompt';

export default function App() {
  const [targetUrl] = useState('https://confnetfibra.sgp.tsmx.com.br/accounts/central/login');
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Logic to handle mobile viewport height issues
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <Header 
        onMenuClick={() => {}} 
        onInstallClick={() => setShowInstallModal(true)} 
      />
      
      <main className="flex-1 relative w-full overflow-hidden">
        <WebView url={targetUrl} />
        
        {/* Install Prompt Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 z-50 p-4 flex justify-center transition-transform duration-300 ${showInstallModal ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}>
           <InstallPrompt 
             isOpen={showInstallModal} 
             onClose={() => setShowInstallModal(false)} 
           />
        </div>
      </main>

    </div>
  );
}