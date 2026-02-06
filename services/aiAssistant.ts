// ✅ Vite: đọc env bằng import.meta.env và biến phải có prefix VITE_
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const optimizeCVContent = async (content: string, field: string) => {
  // ✅ Nếu thiếu key hoặc content rỗng thì trả về content gốc
  if (!apiKey || !content.trim()) {
    console.warn("API key missing or content is empty");
    return content;
  }

  try {
    const prompt = `Hãy viết lại nội dung sau đây cho chuyên nghiệp hơn trong mục "${field}" của một CV tiếng Việt: "${content}". Chỉ trả về nội dung đã tối ưu, không thêm bình luận.`;

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
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return content;
    }

    const data = await response.json();
    
    // Extract text from response - Gemini API response structure
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.warn("No text generated from API");
      return content;
    }

    return generatedText.trim();
  } catch (error) {
    console.error("AI Optimization failed:", error);
    return content;
  }
};
