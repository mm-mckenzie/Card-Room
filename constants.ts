import { Game, Tip } from './types';

export const GAMES: Game[] = [
  {
    id: 'taco-vs-burrito',
    title: 'Taco vs Burrito',
    description: 'Build the weirdest meal to win! A food fight in card form.',
    url: 'https://mm-mckenzie.github.io/taco-vs-burrito/',
    thumbnail: 'https://placehold.co/800x600/FF9F43/FFFFFF.png?text=🌮+vs+🌯&font=roboto',
    category: 'Strategy',
    difficulty: 'Easy'
  },
  {
    id: 'blackjack',
    title: 'Blackjack',
    description: 'Beat the dealer to 21! A classic casino showdown.',
    url: 'https://mm-mckenzie.github.io/blackjack/',
    thumbnail: 'https://placehold.co/800x600/2ECC71/FFFFFF.png?text=♠️+21+♥️&font=roboto',
    category: 'Casino',
    difficulty: 'Medium'
  },
  {
    id: 'exploding-kittens',
    title: 'Exploding Kittens',
    description: 'Avoid the exploding cats! A kitty-powered Russian Roulette.',
    url: 'https://mm-mckenzie.github.io/explodingkittens/',
    thumbnail: 'https://placehold.co/800x600/FF6B6B/FFFFFF.png?text=💣+🐱+Boom!&font=roboto',
    category: 'Party',
    difficulty: 'Easy'
  }
];

export const SAMPLE_TIPS: Tip[] = [
  {
    id: '1',
    text: "A multiplayer game where you play as different types of pasta fighting for the sauce.",
    author: "NoodleKing",
    color: 'bg-yellow-100'
  },
  {
    id: '2',
    text: "Reverse Blackjack: You try to get as close to zero as possible without going negative.",
    author: "MathWizard",
    color: 'bg-blue-100'
  },
  {
    id: '3',
    text: "Exploding Puppies: The sequel we all need with cute dogs.",
    author: "DoggoFan",
    color: 'bg-green-100'
  }
];

export const INITIAL_SYSTEM_INSTRUCTION = `You are the "Card Game Hub" Buddy. 
Your goal is to be a chill, fun, and helpful companion for players.
The games are: Taco vs Burrito, Blackjack, and Exploding Kittens.
Keep your vibe friendly, casual, and supportive (use emojis!).
If a user is playing a game, give them quick tips.
For Blackjack, explain hitting/standing simply.
For the other games, explain the wacky card effects if asked.`;