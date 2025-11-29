export interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Tip {
  id: string;
  text: string;
  author: string;
  gameId?: string;
  color: string;
}
