
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private static ai: GoogleGenAI | null = null;

  private static getAI() {
    if (!this.ai) {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set.");
      }
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return this.ai;
  }

  public static async generateAnimalImage(animalName: string): Promise<string> {
    try {
      const ai = this.getAI();
      const prompt = `A simple, colorful, centered, cartoon illustration of a cute ${animalName} on a plain light blue background. Minimalist, for a children's game.`;
      
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
      } else {
        throw new Error("No image generated.");
      }
    } catch (error) {
      console.error("Error generating image with Gemini:", error);
      // Fallback to a placeholder service if Gemini fails
      return `https://picsum.photos/seed/${animalName}/512/512`;
    }
  }
}
