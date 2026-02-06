# CV Builder Pro - AI Powered CV Generation

Ứng dụng web chuyên nghiệp để tạo, chỉnh sửa và xuất CV/Cover Letter với hỗ trợ AI từ Gemini 2.0

## ✨ Tính Năng Chính

### 1. **Tạo CV từ AI (AI Generative)**
- Nhập thông tin cơ bản: Tên, vị trí mục tiêu, kinh nghiệm, công việc hiện tại, kỹ năng
- AI tự động tạo:
  - Mục tiêu nghề nghiệp profess duyên
  - Kinh nghiệm làm việc chi tiết (3-4 công việc)
  - Kỹ năng phù hợp (8-10 kỹ năng)

### 2. **Tối Ưu Nội Dung CV**
- Nhấn "✨ Tối ưu bằng AI" trên bất kỳ trường nào
- AI viết lại nội dung:
  - Thêm từ khóa mạnh mẽ
  - Sử dụng động từ hành động
  - Thêm con số/% cho kết quả cụ thể
  - Cải thiện cách diễn đạt

### 3. **Gợi Ý Cải Thiện CV**
- Phân tích toàn bộ CV
- Đưa ra 8-10 gợi ý cụ thể:
  - Cần cải thiện điều gì
  - Hành động cụ thể
  - Tại sao cần thay đổi

### 4. **Phân Tích Chất Lượng CV**
- Xếp hạng CV từ 1-10 dựa trên:
  - Cấu trúc & định dạng
  - Nội dung & chuyên nghiệp
  - ATS compatibility (Applicant Tracking System)
- Liệt kê điểm mạnh & điểm yếu
- Khuyến nghị chi tiết để cải thiện

### 5. **Tạo Cover Letter**
- Tạo cover letter chuyên nghiệp tự động
- Cá nhân hóa theo vị trí & công ty
- 250-350 từ, cấu trúc chuẩn

### 6. **Xuất PDF Chuyên Nghiệp**
- 6 templates CV đẹp (Modern, Classic, Minimalist, Creative, Business, Design)
- Xuất PDF với fonts Roboto chuẩn
- Hỗ trợ đa trang tự động
- Định dạng A4 chuẩn

## 🔧 Cấu Hình

### Yêu Cầu
- Node.js 18+
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone https://github.com/HuyHoagnn/CV-Builder-Pro.git

# Cài đặt dependencies
npm install

# Tạo file .env.local
cp .env.example .env.local

# Thêm Gemini API Key
# Lấy từ: https://ai.google.dev/
# Thêm vào .env.local:
# VITE_GEMINI_API_KEY=your_api_key_here
```

### Chạy Ứng Dụng

```bash
# Development server
npm run dev
# Truy cập: http://localhost:3001

# Build production
npm run build

# Preview production
npm run preview
```

## 🤖 Gemini AI Integration

### Sử Dụng Gemini 2.0 Flash

Model tốt nhất cho:
- **Tốc độ**: Phản hồi trong < 2 giây
- **Chất lượng**: Đủ cao cho CV generation
- **Chi phí**: Rẻ nhất trong các model Gemini

### Các Hàm AI Sẵn Có

```typescript
// Tối ưu nội dung
await optimizeCVContent(content, fieldName);

// Tạo CV từ thông tin
await generateCVFromInfo(fullName, jobTitle, yearsExp, currentRole, skills);

// Gợi ý cải thiện
await suggestCVImprovements(cvContent);

// Phân tích chất lượng
await analyzeCVQuality(cvContent);

// Tạo Cover Letter
await generateCoverLetter(fullName, position, company, skills);

// Tạo bullet points
await generateBulletPoints(jobTitle, companyType, achievements);
```

### API Configuration

```javascript
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Generation Config
{
  temperature: 0.7,      // Độ sáng tạo
  topK: 40,             // Diversity
  topP: 0.95,           // Nucleus sampling
  maxOutputTokens: 2048 // Độ dài max
}
```

## 📊 Stack Công Nghệ

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI**: Google Gemini 2.0 Flash API
- **Cloud**: Supabase (Auth & Database)
- **PDF Export**: html2canvas + jsPDF
- **Build**: Vite 6

## 📝 Tệp Quan Trọng

```
services/
  ├── aiAssistant.ts      # Tất cả AI functions
  ├── supabase.ts         # Cloud backend
  └── api.ts              # API utilities

components/
  ├── CVTemplate.tsx      # 6 CV templates
  ├── Navigation.tsx      # Header/Menu
  └── AdminDashboard.tsx  # Admin panel

App.tsx                   # Main app logic
types.ts                  # TypeScript interfaces
constants.ts             # Const data
```

## 🚀 Cách Sử Dụng

### 1. Đăng Ký & Nhân vào

```
1. Nhấp "Đăng Ký"
2. Nhập email + mật khẩu
3. Nhân vào ứng dụng
```

### 2. Tạo CV Mới

```
1. Click "CV Mới"
2. Chọn template yêu thích
3. Nhập thông tin cơ bản
```

### 3. Sử Dụng AI

**Option A: Tối ưu nội dung hiện có**
```
- Nhập nội dung CV
- Nhấn "✨ Tối ưu bằng AI"
- AI sẽ viết lại chuyên nghiệp hơn
```

**Option B: Tạo CV mới từ AI**
```
- Nhập: Tên + Vị trí + Kinh nghiệm + Kỹ năng
- Nhấn "🤖 Tạo CV bằng AI"
- AI tạo CV hoàn chỉnh
```

### 4. Gợi Ý & Phân Tích

```
- "💡 Gợi ý cải thiện" → Nhận 8-10 gợi ý cụ thể
- "📊 Phân tích chất lượng" → Xếp hạng & feedback
```

### 5. Xuất PDF

```
- Chọn template
- Nhấn "📥 Xuất PDF"
- Tệp PDF sẽ download
```

## 🎨 Templates CV

1. **Modern Tech** - Thiết kế hiện đại, phù hợp IT/Tech
2. **Classic** - Cổ điển, chuyên nghiệp, phù hợp mọi ngành
3. **Minimalist** - Tối giản nhưng đầy đủ thông tin
4. **Creative** - Sáng tạo, phù hợp design/marketing
5. **Business** - Chính thức, phù hợp quản lý/kinh doanh
6. **Design** - Đẹp, phù hợp designer/creative roles

## 🐛 Troubleshoot

### "API Key không được cấu hình"
- Tạo file `.env.local` nếu chưa có
- Thêm `VITE_GEMINI_API_KEY=your_key`
- Restart dev server

### "Font chữ bị méo khi xuất PDF"
- Đảm bảo fonts Google đã load
- Thử lại hoặc chọn template khác

### "AI không tạo nội dung"
- Kiểm tra internet connection
- Kiểm tra API quota Gemini (max 15 requests/phút)
- Thử nội dung ngắn hơn

## 📞 Support

- GitHub Issues: https://github.com/HuyHoagnn/CV-Builder-Pro/issues
- Email: huyhoagnn@example.com

## 📄 License

MIT License - Miễn phí sử dụng & sửa đổi

## 🙌 Credits

- **AI**: Google Gemini 2.0 Flash
- **Cloud**: Supabase
- **UI Framework**: React + Tailwind CSS
- **Icons**: Lucide React

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: February 6, 2026

Happy CV Building! 🚀
