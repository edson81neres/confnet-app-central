import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X, Download, MoreVertical, Smartphone } from 'lucide-react';

interface InstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      // If already installed, we generally don't show the prompt, 
      // but if the user clicked the button manually, we might show a message saying it's installed.
      // For now, we assume if they see the UI, they aren't in standalone or want help.
    }

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);

    if (isIOS) {
      setPlatform('ios');
      // Auto-open on iOS after delay if not explicitly controlled yet (optional logic)
      if (!localStorage.getItem('installPromptSeen')) {
         // parent controls visibility, but we can emit events if needed.
         // For now, rely on parent 'isOpen'
      }
    } else if (isAndroid) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto-show only on first visit logic could go here, 
      // but we let the App component decide initial visibility or user click.
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Trigger auto-open effect on mount if needed, 
  // currently we are fully controlled by props.

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    } else {
      // Fallback for when we don't have the event (e.g. fired too early or not supported)
      alert("Para instalar, toque no menu do navegador (três pontos) e selecione 'Instalar aplicativo' ou 'Adicionar à tela inicial'.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pointer-events-auto w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
             <div className="bg-sky-100 p-2 rounded-xl">
               <Smartphone className="w-6 h-6 text-sky-600" />
             </div>
             <div>
               <h3 className="font-bold text-gray-900">Baixar Aplicativo</h3>
               <p className="text-xs text-gray-500">Acesse sua fatura direto da tela inicial</p>
             </div>
          </div>
          <button 
            onClick={() => {
              localStorage.setItem('installPromptSeen', 'true');
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 p-1 bg-gray-50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {platform === 'ios' && (
          <div className="space-y-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <p className="font-semibold text-sky-700 mb-1">Como instalar no iPhone/iPad:</p>
            <p className="flex items-center gap-2">
              1. Toque no botão <Share className="w-4 h-4 text-blue-500" /> <strong>Compartilhar</strong> abaixo.
            </p>
            <p className="flex items-center gap-2">
              2. Role e selecione <PlusSquare className="w-4 h-4 text-gray-600" /> <strong>Adicionar à Tela de Início</strong>.
            </p>
          </div>
        )}

        {platform === 'android' && (
          <div className="mt-2 space-y-3">
             {deferredPrompt ? (
                <button
                  onClick={handleInstallClick}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Instalar Agora
                </button>
             ) : (
                <div className="space-y-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                   <p className="flex items-center gap-2">
                     1. Toque no menu <MoreVertical className="w-4 h-4 text-gray-500" /> do navegador.
                   </p>
                   <p className="flex items-center gap-2">
                     2. Selecione <strong>Instalar aplicativo</strong>.
                   </p>
                 </div>
             )}
          </div>
        )}

        {platform === 'desktop' && (
           <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
             <p>Procure pelo ícone de instalação <Download className="w-3 h-3 inline" /> na barra de endereço do seu navegador.</p>
           </div>
        )}
      </div>
    </div>
  );
};