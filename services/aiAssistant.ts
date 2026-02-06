// ✅ Vite: đọc env bằng import.meta.env và biến phải có prefix VITE_
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const optimizeCVContent = async (content: string, field: string): Promise<string> => {
  // ✅ Nếu thiếu key hoặc content rỗng thì trả về content gốc
  if (!apiKey || !content.trim()) {
    console.warn("API key missing or content is empty");
    throw new Error("API key is not configured. Please check .env.local file.");
  }

  try {
    const prompt = `Hãy viết lại nội dung sau đây cho chuyên nghiệp hơn trong mục "${field}" của một CV tiếng Việt: "${content}". Chỉ trả về nội dung đã tối ưu, không thêm bình luận. Trả về mà không có dấu ngoặc hoặc định dạng thêm.`;

    console.log("[AI] Calling Gemini API with prompt:", prompt.substring(0, 100));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    console.log("[AI] API Response Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[AI] API Error Response:", errorText);
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("[AI] API Response Data:", data);
    
    // Extract text from response - Gemini API response structure
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.warn("[AI] No text generated from API.", data);
      throw new Error("No content generated from AI");
    }

    console.log("[AI] Generated text:", generatedText.substring(0, 100));
    return generatedText.trim();
  } catch (error) {
    console.error("[AI] AI Optimization failed:", error);
    throw error;
  }
};
