import React, { useState } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';

interface WebViewProps {
  url: string;
}

export const WebView: React.FC<WebViewProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Note: X-Frame-Options might block this URL. 
  // We provide a fallback UI if the user detects it's not loading, 
  // though programmatically detecting X-Frame-Options blocks is limited in JS.
  
  return (
    <div className="w-full h-full relative bg-gray-50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-50 text-sky-600">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
            <p className="text-sm font-medium text-gray-500 animate-pulse">Carregando Central...</p>
          </div>
        </div>
      )}

      <iframe 
        src={url} 
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        title="Central do Assinante"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
      />
      
      {/* 
         Floating Fallback Button: 
         Sometimes bank/portal sites block iframes. 
         This ensures the user can always access the site.
      */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
         <a 
           href={url} 
           target="_blank" 
           rel="noopener noreferrer"
           className="pointer-events-auto bg-white/90 backdrop-blur text-sky-700 text-xs font-medium px-4 py-2 rounded-full shadow-lg border border-sky-100 flex items-center gap-2 hover:bg-sky-50 transition-all opacity-80 hover:opacity-100"
         >
           <AlertTriangle className="w-3 h-3" />
           Não carregou? Clique aqui
           <ExternalLink className="w-3 h-3" />
         </a>
      </div>
    </div>
  );
};