import React, { useState } from 'react';
import { Game } from '../types';
import { ArrowLeft, ExternalLink, RotateCcw, Sparkles } from 'lucide-react';

interface GameFrameProps {
  game: Game;
  onBack: () => void;
  onToggleChat: () => void;
}

export const GameFrame: React.FC<GameFrameProps> = ({ game, onBack, onToggleChat }) => {
  const [iframeKey, setIframeKey] = useState(0);

  const handleRefresh = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-full w-full bg-hub-bg">
      {/* Toolbar */}
      <div className="h-16 bg-white border-b-4 border-hub-text/10 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-500 hover:text-hub-primary hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all font-bold"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back</span>
          </button>
          <div className="h-8 w-1 bg-gray-200 rounded-full" />
          <h2 className="text-hub-text text-xl font-black hidden sm:block tracking-tight">{game.title}</h2>
        </div>

        <div className="flex items-center space-x-3">
          <button 
             onClick={handleRefresh}
             title="Reload Game"
             className="p-2.5 text-gray-500 hover:text-hub-primary bg-gray-100 hover:bg-white border-2 border-transparent hover:border-hub-primary rounded-xl transition-all"
          >
            <RotateCcw size={20} />
          </button>
          <a 
            href={game.url} 
            target="_blank" 
            rel="noopener noreferrer"
            title="Open in new tab"
            className="p-2.5 text-gray-500 hover:text-hub-primary bg-gray-100 hover:bg-white border-2 border-transparent hover:border-hub-primary rounded-xl transition-all"
          >
            <ExternalLink size={20} />
          </a>
          <button 
            onClick={onToggleChat}
            className="bg-hub-secondary text-white border-b-4 border-pink-600 active:border-b-0 active:translate-y-1 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 hover:brightness-110"
          >
            <Sparkles size={16} className="fill-current" />
            <span>Ask Buddy</span>
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-grow relative w-full h-full bg-hub-text p-0 sm:p-4">
        <div className="w-full h-full bg-white sm:rounded-2xl overflow-hidden shadow-2xl relative">
          <iframe
            key={iframeKey}
            src={game.url}
            title={game.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};