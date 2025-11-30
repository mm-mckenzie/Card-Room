import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { INITIAL_SYSTEM_INSTRUCTION } from '../constants';

const API_KEY_STORAGE_KEY = 'card_game_hub_api_key';

let chatSession: ChatSession | null = null;
let genAI: GoogleGenerativeAI | null = null;

export const hasApiKey = (): boolean => {
  return !!localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const setApiKey = (key: string) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
  // Reset session to force re-initialization with new key
  chatSession = null;
  genAI = null;
};

export const getGeminiChat = async () => {
  const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);

  if (!apiKey) {
    throw new Error("API Key not found");
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }

  if (!chatSession) {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Using 1.5-flash as it's stable and fast
      systemInstruction: INITIAL_SYSTEM_INSTRUCTION
    });

    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello! Who are you?" }],
        },
        {
          role: "model",
          parts: [{ text: "I am your Game Buddy! I'm here to help you with rules, strategies, and fun facts about the games in the Card Room." }],
        },
      ],
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = await getGeminiChat();
    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("API Key")) {
      return "MISSING_API_KEY";
    }
    return "I'm having trouble connecting to the game server. Please check your API key and internet connection.";
  }
};
