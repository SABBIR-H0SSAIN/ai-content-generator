import { config } from "@/config";
import { GoogleGenAI } from "@google/genai";

export const ai = new GoogleGenAI({ apiKey: config.gemini.apiKey });

interface GernerateContentOptions {
  model?: string;
  systemInstruction?: string;
}
export const gernerateContent = (
  prompt: string,
  {
    model = config.gemini.model,
    systemInstruction = config.gemini.systemInstruction,
  }: GernerateContentOptions = {}
) => {
  return ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

export const prompt = async (userPrompt: string) => {
  try {
    const response = await gernerateContent(userPrompt);
    return response.text;
  } catch {
    return null;
  }
};
