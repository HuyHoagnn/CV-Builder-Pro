// Gemini AI Assistant Service - Advanced CV Generation & Optimization
// Using Gemini 2.0 Flash for best performance and quality

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Helper to call Gemini API with fallback
const callGeminiAPI = async (prompt: string, maxTokens: number = 2048): Promise<string> => {
  if (!apiKey?.trim()) {
    throw new Error("⚠️ Gemini API Key không được cấu hình. Vui lòng thêm VITE_GEMINI_API_KEY vào .env.local");
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: maxTokens,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.error?.message || response.statusText;
      
      // Handle quota exceeded or API errors gracefully
      if (errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("quota")) {
        throw new Error("⚠️ Hết quota/token Gemini API. Vui lòng chờ hoặc nâng cấp API plan");\n      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("❌ Không có nội dung được tạo từ AI");
    return text.trim();
  } catch (error) {
    console.error("[AI Error]:", error);
    throw error;
  }
};
};

// 1. Optimize existing CV content
export const optimizeCVContent = async (content: string, field: string): Promise<string> => {
  if (!content.trim()) throw new Error("❌ Nội dung không được để trống");

  const prompt = `Hãy viết lại nội dung sau cho chuyên nghiệp hơn trong mục "${field}" của CV:
"${content}"

Yêu cầu:
- Chỉ trả về nội dung được tối ưu
- Thêm từ khóa mạnh mẽ, động từ hành động
- Nếu là kinh nghiệm, thêm con số hoặc %
- Không thêm bình luận hoặc ký hiệu
- Sử dụng cấu trúc: [Hành động] + [Kết quả] + [Tác động]

Nội dung tối ưu:`;

  return callGeminiAPI(prompt, 512);
};

// 2. Generate CV from user info (Generative AI)
export const generateCVFromInfo = async (
  fullName: string,
  jobTitle: string,
  yearsExperience: string,
  currentRole: string,
  skills: string
): Promise<any> => {
  const prompt = `Bạn là chuyên gia viết CV. Tạo CV chuyên nghiệp cho:
- Tên: ${fullName}
- Vị trí mục tiêu: ${jobTitle}
- Kinh nghiệm: ${yearsExperience} năm
- Vị trí hiện tại: ${currentRole}
- Kỹ năng: ${skills}

Trả về JSON format (CHỈ JSON):
{
  "objective": "Mục tiêu nghề nghiệp 2-3 câu cụ thể",
  "experience": [
    {
      "position": "Vị trí",
      "company": "Tên công ty",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY",
      "description": "Mô tả chi tiết với thành tựu cụ thể"
    }
  ],
  "skills": ["kỹ năng 1", "kỹ năng 2", ...]
}

Yêu cầu:
- 3-4 công việc
- Mỗi công việc có mô tả chi tiết (3-4 thành tựu)
- Mỗi thành tựu có con số, %, hoặc kết quả cụ thể
- 8-10 kỹ năng chính
- Tất cả bằng tiếng Việt
- Định dạng đơn giản, không thêm ký hiệu

JSON output:`;

  const result = await callGeminiAPI(prompt, 2000);
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("❌ Không tìm thấy JSON trong response");
  return JSON.parse(jsonMatch[0]);
};

// 3. Suggest CV improvements
export const suggestCVImprovements = async (cvContent: string): Promise<string[]> => {
  const prompt = `Bạn là chuyên gia tuyển dụng. Phân tích CV này và đưa ra 8-10 gợi ý CỤTHỂ:

${cvContent}

Với mỗi gợi ý:
- Rõ ràng và hữu ích
- Có hành động cụ thể
- Giải thích tại sao cần cải thiện

Trả về danh sách:
- Gợi ý 1: [Hành động] vì [lý do]
- Gợi ý 2: [Hành động] vì [lý do]
...

Gợi ý:`;

  const result = await callGeminiAPI(prompt, 1500);
  return result
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter((line) => line.length > 0);
};

// 4. Generate professional Cover Letter
export const generateCoverLetter = async (
  fullName: string,
  position: string,
  company: string,
  keySkills: string,
  yearsExperience?: string
): Promise<string> => {
  const prompt = `Viết cover letter chuyên nghiệp, cá nhân hóa bằng tiếng Việt:

Thông tin:
- Tên: ${fullName}
- Vị trí: ${position}
- Công ty: ${company}
- Kỹ năng chính: ${keySkills}
${yearsExperience ? `- Kinh nghiệm: ${yearsExperience} năm` : ''}

Yêu cầu:
- 250-350 từ
- Cấu trúc: Mở đầu → Kinh nghiệm → Kỹ năng → Đóng
- Nhấn mạnh sự phù hợp với vị trí
- Thể hiện kiến thức về công ty
- Kết thúc bằng lời mời cuộc phỏng vấn
- Trang trọng nhưng cá nhân
- Dễ đọc, không quá formal

Cover letter:`;

  return callGeminiAPI(prompt, 1024);
};

// 5. Analyze CV quality with detailed feedback
export const analyzeCVQuality = async (cvContent: string): Promise<any> => {
  const prompt = `Bạn là nhà tuyển dụng có 20 năm kinh nghiệm. Phân tích CV:

${cvContent}

Trả về JSON (CHỈ JSON):
{
  "score": 8,
  "feedback": "Tóm tắt đánh giá tổng quát (2-3 câu)",
  "strengths": ["điểm mạnh 1", "điểm mạnh 2", "điểm mạnh 3"],
  "weaknesses": ["điểm yếu 1", "điểm yếu 2", "điểm yếu 3"],
  "recommendations": ["khuyến nghị 1", "khuyến nghị 2", "khuyến nghị 3"]
}

Yêu cầu:
- score: 1-10 (dựa trên cấu trúc, nội dung, định dạng)
- 3-4 điểm mạnh
- 3-4 điểm yếu
- 5-7 khuyến nghị cụ thể, có thể hành động
- Tiếng Việt

JSON:`;

  const result = await callGeminiAPI(prompt, 2000);
  const jsonMatch = result.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("❌ Không tìm thấy JSON");
  return JSON.parse(jsonMatch[0]);
};

// 6. Generate job-specific resume bullet points
export const generateBulletPoints = async (jobTitle: string, companyType: string, keyAchievements: string): Promise<string[]> => {
  const prompt = `Tạo 5-7 bullet point chuyên nghiệp cho CV:

Vị trí: ${jobTitle}
Loại công ty: ${companyType}
Thành tựu chính: ${keyAchievements}

Yêu cầu:
- Bắt đầu bằng động từ hành động mạnh (Developed, Led, Increased, v.v.)
- Bao gồm con số, %, hoặc kết quả cụ thể
- Rõ ràng và đầy cá nhân
- Tiếng Việt
- Mỗi bullet 1-2 dòng

Trả về danh sách:
- Bullet point 1
- Bullet point 2
...

Bullet points:`;

  const result = await callGeminiAPI(prompt, 800);
  return result
    .split('\n')
    .filter((line) => line.trim().startsWith('-'))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter((line) => line.length > 0);
};
