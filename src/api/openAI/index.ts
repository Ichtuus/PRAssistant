import { OpenAI } from "openai";

class OpenAIApiWrapper {
  private openai: OpenAI;

  constructor(private apiKey: any) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateText(prompt: string, options: any = {}): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: options.engine || "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      } else {
        throw new Error("No text generated");
      }
    } catch (error) {
      throw error;
    }
  }
}

export default OpenAIApiWrapper;
