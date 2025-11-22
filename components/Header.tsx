import React from 'react';
import { RotateCcw, ExternalLink, Download } from 'lucide-react';

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
    <header className="bg-slate-900 text-white shadow-lg flex-none z-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex items-center gap-3 select-none">
            <div className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {/* Simulated 'G' Logo */}
                <span className="text-slate-900 font-black text-2xl leading-none -ml-0.5 mt-0.5 font-sans">G</span>
                {/* Blue Arrow Accent */}
                <div className="absolute right-1.5 bottom-2.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-sky-600 -rotate-45"></div>
            </div>
            <div className="flex flex-col justify-center">
                <span className="font-extrabold text-lg leading-none tracking-widest text-white">CONFNET</span>
                <span className="text-[10px] font-bold text-sky-500 leading-none tracking-[0.3em] mt-0.5 uppercase">Fibra</span>
            </div>
        </div>

        {/* Actions Area */}
        <div className="flex items-center space-x-2">
           <button 
            onClick={onInstallClick}
            className="flex items-center space-x-1 bg-sky-600 hover:bg-sky-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md shadow-sky-900/20 transition-all hover:scale-105 active:scale-95 border border-sky-500/50"
            title="Instalar Aplicativo"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">BAIXAR APP</span>
          </button>

           <button 
            onClick={handleExternal}
            className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden text-slate-300 hover:text-white"
            aria-label="Abrir no Navegador"
          >
            <ExternalLink className="w-5 h-5" />
          </button>

          <button 
            onClick={handleReload}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
            aria-label="Recarregar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};