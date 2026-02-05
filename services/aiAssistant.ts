
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeCVContent = async (content: string, field: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy viết lại nội dung sau đây cho chuyên nghiệp hơn trong mục "${field}" của một CV tiếng Việt: "${content}". Chỉ trả về nội dung đã tối ưu, không thêm bình luận.`,
    });
    return response.text?.trim() || content;
  } catch (error) {
    console.error("AI Optimization failed", error);
    return content;
  }
};
