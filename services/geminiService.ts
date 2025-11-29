import { GoogleGenAI, Chat } from "@google/genai";
import { INITIAL_SYSTEM_INSTRUCTION } from '../constants';

// We initialize the client lazily or when needed to ensure we pick up the key.
// Ideally, the key is present in process.env.API_KEY.

let chatSession: Chat | null = null;

export const getGeminiChat = async (history: {role: 'user' | 'model', parts: [{text: string}]}[] = []) => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Reset session if it doesn't exist or if we want to force a fresh start (could expose a reset param)
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: INITIAL_SYSTEM_INSTRUCTION,
      },
      history: history
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = await getGeminiChat();
    const result = await chat.sendMessage({ message });
    return result.text || "I couldn't generate a response. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Game Master is currently offline (API Error). Please check your connection or API key.";
  }
};
