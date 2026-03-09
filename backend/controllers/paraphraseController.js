import { GoogleGenerativeAI } from "@google/generative-ai";
import { MODES } from "../utils/prompts.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const paraphraseText = async (req, res) => {
  const { text, mode } = req.body;

  if (!text || !mode) {
    return res.status(400).json({ error: "Text and Mode are required." });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      generationConfig: {
        temperature: 0.9, // Higher temperature for more creative/original phrasing
        topP: 0.95,
      }
    });

    const systemInstruction = MODES[mode] || MODES.professional;
    const prompt = `Task: ${systemInstruction}\n\nUser's Original Idea: "${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.status(200).json({ output: response.text() });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to connect to AI engine." });
  }
};