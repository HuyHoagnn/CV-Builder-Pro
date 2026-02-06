# 🚀 Hướng Dẫn Khi Hết Token Gemini API

## ⚠️ Vấn Đề: "Hết quota/token Gemini API"

### Nguyên Nhân
- Gemini API miễn phí có giới hạn requests: **15 requests/phút** và **1 triệu tokens/tháng**
- Nếu vượt quá sẽ bị blocked tạm thời

---

## ✅ **Giải Pháp 1: Chờ Reset Quota**

### Nếu bị limit tạm thời:
1. **Chờ 1 giờ** để quota reset  
2. Hoặc **chờ đến tháng sau** nếu vượt quota hàng tháng
3. Restart app sau đó

---

## ✅ **Giải Pháp 2: Upgrade API Plan**

### Tạo API Key mới từ Google AI Studio:

**Bước 1**: Truy cập [ai.google.dev](https://ai.google.dev)

**Bước 2**: Đăng nhập Google account

**Bước 3**: Nhấp "Get API Key" → "Create new API key"

**Bước 4**: Copy API key mới

**Bước 5**: Update `.env.local`:
```bash
VITE_GEMINI_API_KEY=your_new_api_key_here
```

**Bước 6**: Restart dev server:
```bash
npm run dev
```

---

## ✅ **Giải Pháp 3: Sử Dụng App Mà Không Cần AI**

### Các tính năng vẫn hoạt động bình thường:
- ✅ Tạo CV thủ công (nhập thông tin)
- ✅ Chọn templates đẹp (6 templates)
- ✅ Xuất PDF chuyên nghiệp
- ✅ Cloud sync (Supabase)
- ✅ Admin dashboard

### Các tính năng cần AI:
- ❌ **Tối ưu bằng AI** (sẽ hiển thị lỗi)
- ❌ **Tạo CV bằng AI**
- ❌ **Gợi ý cải thiện**
- ❌ **Phân tích chất lượng**
- ❌ **Tạo Cover Letter (AI)**

**Giải pháp**: Nhập CV thủ công rồi xuất PDF

---

## ✅ **Giải Pháp 4: Sử Dụng API Key Khác**

### Có thể dùng các service khác:
| Service | Miễn Phí | Tốc độ | Chất lượng |
|---------|---------|-------|-----------|
| **Gemini** (hiện tại) | 1 tr tokens/tháng | ⚡⚡⚡ | ⭐⭐⭐⭐ |
| **Claude** | Không | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| **GPT-4** | Không | ⚡⚡ | ⭐⭐⭐⭐⭐ |
| **LLaMA** | Có | ⚡ | ⭐⭐⭐ |

**Lưu ý**: Đổi API sẽ cần sửa code trong `services/aiAssistant.ts`

---

## 📊 **Cách Kiểm Tra Quota**

### 1. Vào [Google AI Studio](https://aistudio.google.com/)
### 2. Xem "Usage" dashboard
### 3. Kiểm tra:
   - Requests đã dùng
   - Tokens đã dùng
   - Limit hàng năm

---

## 🎯 **Khuyến Nghị**

### Development:
- Sử dụng miễn phí (quota 1 tr tokens/tháng)
- Tối ưu hóa prompts ngắn hơn
- Test với data nhỏ trước

### Production:
- Upgrade Google Cloud project
- Thanh toán theo usage ($0.00001 per token)
- Monitor quota thường xuyên

---

## 🔥 **Tips Tiết Kiệm Token**

### 1. Dùng prompts ngắn
```typescript
// ❌ Dài (lãng phí)
const prompt = `Bạn là chuyên gia... hãy viết lại nội dung... Yêu cầu... Không thêm...`;

// ✅ Ngắn (tiết kiệm)
const prompt = `Viết lại chuyên nghiệp: "${content}"`;
```

### 2. Batch requests (nếu có)
```typescript
// Gộp nhiều requests thành 1
const prompt = `Tối ưu từng phần: 
1. ${field1}
2. ${field2}`;
```

### 3. Dùng temperature thấp
```javascript
temperature: 0.5 // Thay vì 0.7, sẽ ít "sáng tạo" hơn
```

---

## ❓ Câu Hỏi Thường Gặp

**Q: Bao lâu quota reset?**  
A: 15 requests/phút reset, 1 tr tokens/tháng reset vào ngày 1 hàng tháng

**Q: Có thể extend quota free?**  
A: Không, phải upgrade Google Cloud project

**Q: Có alternative miễn phí?**  
A: có local LLMs (LLaMA, Mistral) nhưng chậm + cần máy mạnh

**Q: Giá bao nhiêu nếu upgrade?**  
A: $0.00001 - $0.00002 per token (rất rẻ)

---

## 📞 Liên Hệ

Nếu cần giúp:
- GitHub Issues: https://github.com/HuyHoagnn/CV-Builder-Pro/issues
- Doc: Xem `AI_FEATURES.md`

---

**Cần API key mới? Hãy follow hướng dẫn Giải pháp 2 ở trên!** ✅
