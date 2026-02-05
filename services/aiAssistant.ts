import { GoogleGenAI } from "@google/genai";

// ✅ Vite: đọc env bằng import.meta.env và biến phải có prefix VITE_
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// ✅ Tránh crash trắng trang: chỉ khởi tạo khi có key
const ai = apiKey && apiKey.trim() ? new GoogleGenAI({ apiKey }) : null;

export const optimizeCVContent = async (content: string, field: string) => {
  // ✅ Nếu thiếu key thì trả về content gốc (không throw)
  if (!ai) return content;

  try {
    const prompt = `Hãy viết lại nội dung sau đây cho chuyên nghiệp hơn trong mục "${field}" của một CV tiếng Việt: "${content}". Chỉ trả về nội dung đã tối ưu, không thêm bình luận.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text?.trim() || content;
  } catch (error) {
    console.error("AI Optimization failed", error);
    return content;
  }
};
