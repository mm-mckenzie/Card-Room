import React from 'react';
import { Game } from '../types';
import { Play, Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border-4 border-hub-text hover:-translate-y-2 hover:shadow-comic-hover shadow-comic transition-all duration-300 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden border-b-4 border-hub-text bg-gray-100">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-hub-accent text-hub-text rounded-full border-2 border-hub-text shadow-sm">
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-2xl font-black text-hub-text mb-3 group-hover:text-hub-primary transition-colors">
          {game.title}
        </h3>
        <p className="text-gray-500 text-sm font-medium mb-6 flex-grow leading-relaxed">
          {game.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-1 text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            <Star size={14} className="text-hub-secondary fill-current" />
            <span>{game.difficulty}</span>
          </div>
          <button
            onClick={() => onPlay(game)}
            className="flex items-center space-x-2 bg-hub-primary text-white border-2 border-hub-primary px-6 py-2.5 rounded-xl font-bold hover:bg-white hover:text-hub-primary transition-all duration-200 active:scale-95 shadow-sm"
          >
            <Play size={18} className="fill-current" />
            <span>Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};