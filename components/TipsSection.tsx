import React, { useState } from 'react';
import { Lightbulb, Plus, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { Tip } from '../types';
import { SAMPLE_TIPS } from '../constants';

export const TipsSection: React.FC = () => {
  // Load from LocalStorage on mount
  const [ideas, setIdeas] = useState<Tip[]>(() => {
    const saved = localStorage.getItem('card-game-hub-ideas');
    return saved ? JSON.parse(saved) : SAMPLE_TIPS;
  });

  const [newIdea, setNewIdea] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Save to LocalStorage whenever ideas change
  React.useEffect(() => {
    localStorage.setItem('card-game-hub-ideas', JSON.stringify(ideas));
  }, [ideas]);

  const handleAddIdea = async () => {
    if (!newIdea.trim()) return;

    setIsSending(true);

    // Simulate network request duration (0.8 seconds for snappier feel)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Construct the idea object
    const ideaToAdd: Tip = {
      id: Date.now().toString(),
      text: newIdea,
      author: 'You',
      color: 'bg-purple-100' // You could randomize this too!
    };

    // Update State
    setIdeas([ideaToAdd, ...ideas]);
    setNewIdea('');
    setIsSending(false);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleShareToGithub = () => {
    const title = encodeURIComponent("Community Game Idea");
    const body = encodeURIComponent(`Here is a new game idea:\n\n${newIdea}\n\nSubmitted via Card Game Hub.`);
    window.open(`https://github.com/mm-mckenzie/card-game-hub/issues/new?title=${title}&body=${body}`, '_blank');
  };

  return (
    <div className="mt-16 mb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-hub-accent/20 p-2 rounded-xl rotate-6">
          <Lightbulb className="text-hub-accent fill-current" size={28} />
        </div>
        <h2 className="text-3xl font-bold text-hub-text">Community Game Ideas</h2>
      </div>

      <div className="bg-white rounded-3xl border-4 border-hub-text/5 p-6 lg:p-10 shadow-sm relative overflow-hidden">

        {/* Input Area */}
        <div className="mb-10 bg-hub-bg rounded-2xl p-6 border-2 border-dashed border-hub-text/10 relative transition-all">
          <label className="block text-hub-text font-bold mb-3 text-lg flex items-center gap-2">
            <Plus size={20} className="text-hub-primary" />
            Share your game idea!
          </label>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              disabled={isSending}
              placeholder="e.g. A racing game where you control hamsters..."
              className="flex-grow bg-white border-2 border-gray-200 focus:border-hub-primary rounded-xl px-4 py-3 font-bold text-hub-text focus:outline-none transition-all placeholder-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
              onKeyDown={(e) => e.key === 'Enter' && !isSending && handleAddIdea()}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddIdea}
                disabled={!newIdea.trim() || isSending}
                className={`
                  font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-comic-sm 
                  ${showSuccess
                    ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                    : 'bg-hub-primary text-white hover:bg-violet-600 active:scale-95'
                  }
                  disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed
                `}
                title="Save to your board"
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span className="hidden sm:inline">Saved!</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareToGithub}
                disabled={!newIdea.trim() || isSending}
                className="bg-gray-800 text-white font-bold px-4 py-3 rounded-xl hover:bg-gray-900 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-comic-sm disabled:opacity-70 disabled:cursor-not-allowed"
                title="Share with the world on GitHub"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Publish</span>
              </button>
            </div>
          </div>

          {showSuccess && (
            <div className="absolute -bottom-2 left-0 right-0 text-center transform translate-y-full animate-bounce">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200 shadow-sm">
                Idea saved to your board! 📌
              </span>
            </div>
          )}
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className={`relative p-6 rounded-2xl ${idea.color} transform hover:-translate-y-1 transition-transform duration-300 shadow-sm border-2 border-transparent hover:border-black/5 animate-in fade-in slide-in-from-bottom-4`}
            >
              <div className="absolute -top-3 -right-3 bg-white p-1.5 rounded-full shadow-sm">
                <div className="w-3 h-3 rounded-full bg-hub-text/20"></div>
              </div>
              <p className="text-hub-text font-bold text-lg mb-4 leading-snug">
                "{idea.text}"
              </p>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-hub-text/50">
                <span>@{idea.author}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};