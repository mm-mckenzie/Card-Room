import React, { useState } from 'react';
import { GAMES } from './constants';
import { Game } from './types';
import { GameCard } from './components/GameCard';
import { GameFrame } from './components/GameFrame';
import { ChatAssistant } from './components/ChatAssistant';
import { TipsSection } from './components/TipsSection';
import { Gamepad2, MessageCircle, Search, Zap } from 'lucide-react';

function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = GAMES.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-full bg-hub-bg text-hub-text flex flex-col overflow-hidden font-comic selection:bg-hub-secondary selection:text-white">
      
      {/* Header */}
      {!activeGame && (
        <header className="h-24 px-6 lg:px-12 flex items-center justify-between shrink-0 bg-white border-b-4 border-hub-text/5 z-20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-hub-primary rounded-2xl shadow-comic transform -rotate-3 transition-transform hover:rotate-0">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-hub-text">
                Card Game Hub
              </h1>
              <p className="text-sm text-hub-primary font-bold tracking-wider uppercase">Play. Chill. Repeat.</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-hub-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Find a game..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border-2 border-transparent focus:border-hub-primary rounded-full py-3 pl-12 pr-6 text-sm font-bold focus:outline-none focus:bg-white transition-all w-72 placeholder-gray-400"
              />
            </div>
            
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-hub-primary text-gray-600 hover:text-hub-primary transition-all p-3 rounded-2xl shadow-sm hover:shadow-comic-sm"
            >
              <MessageCircle size={24} />
              <span className="font-bold hidden sm:inline">Ask Buddy</span>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow relative overflow-hidden flex flex-col">
        {activeGame ? (
          <GameFrame 
            game={activeGame} 
            onBack={() => setActiveGame(null)} 
            onToggleChat={() => setIsChatOpen(!isChatOpen)}
          />
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar p-6 lg:p-12">
             <div className="max-w-7xl mx-auto pb-10">
                
                {/* Featured Games Section */}
                <div className="mb-10 flex items-center gap-3">
                  <div className="bg-hub-secondary/20 p-2 rounded-xl">
                    <Zap className="text-hub-secondary fill-current" size={24} />
                  </div>
                  <h2 className="text-4xl font-bold text-hub-text">Featured Games</h2>
                </div>

                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-4">
                    {filteredGames.map(game => (
                      <div key={game.id} className="h-[28rem]">
                        <GameCard game={game} onPlay={setActiveGame} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Gamepad2 size={64} className="mb-4 opacity-50 text-hub-primary" />
                    <p className="text-xl font-bold">No games found matching "{searchQuery}"</p>
                  </div>
                )}

                {/* Tips Section */}
                <TipsSection />
             </div>
          </div>
        )}
      </main>

      {/* Chat Overlay */}
      <ChatAssistant 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        contextGameTitle={activeGame?.title}
      />
    </div>
  );
}

export default App;
