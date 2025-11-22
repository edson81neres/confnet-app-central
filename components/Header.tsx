import React from 'react';
import { RotateCcw, ExternalLink, ShieldCheck, Download } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onInstallClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onInstallClick }) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleExternal = () => {
    window.open('https://confnetfibra.sgp.tsmx.com.br/accounts/central/login', '_blank');
  };

  return (
    <header className="bg-sky-600 text-white shadow-md flex-none z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-1.5 rounded-lg bg-opacity-20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight">ConfNet<span className="font-light opacity-90">Central</span></h1>
        </div>

        <div className="flex items-center space-x-2">
           {/* Botão de Instalar em destaque */}
           <button 
            onClick={onInstallClick}
            className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm transition-all animate-pulse"
            title="Instalar Aplicativo"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline">Baixar App</span>
          </button>

           <button 
            onClick={handleExternal}
            className="p-2 rounded-full hover:bg-white/20 transition-colors md:hidden"
            aria-label="Abrir no Navegador"
            title="Abrir no Navegador"
          >
            <ExternalLink className="w-5 h-5" />
          </button>

          <button 
            onClick={handleReload}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Recarregar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};