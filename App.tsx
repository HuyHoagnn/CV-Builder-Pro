
import React, { useState, useEffect, useRef } from 'react';
import { User, UserRole, CVData, Template, Experience, Education } from './types';
import { INITIAL_TEMPLATES } from './constants';
import { Navigation } from './components/Navigation';
import { CVTemplate } from './components/CVTemplate';
import { AdminDashboard } from './components/AdminDashboard';
import { 
  optimizeCVContent,
  generateCVFromInfo,
  suggestCVImprovements,
  analyzeCVQuality
} from './services/aiAssistant';
import { supabase, db } from './services/supabase';
import html2canvas from 'html2canvas';
import { 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  ArrowLeft, 
  Layout, 
  User as UserIcon, 
  Briefcase, 
  GraduationCap, 
  Layers,
  FileText,
  Cloud,
  Loader2,
  CheckCircle2
} from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState('login');
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [allCvs, setAllCvs] = useState<CVData[]>([]); // Cho Admin
  const [templates, setTemplates] = useState<Template[]>([]);
  const [users, setUsers] = useState<User[]>([]); // Cho Admin
  const [activeCV, setActiveCV] = useState<CVData | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  
  // AI Generative States
  const [showAIGenerative, setShowAIGenerative] = useState(false);
  const [aiGenerativeLoading, setAiGenerativeLoading] = useState(false);
  const [cvSuggestions, setCvSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiAnalysisScore, setAiAnalysisScore] = useState<any>(null);

  // Auth States
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const cvPrintRef = useRef<HTMLDivElement>(null);

  // Fetch dữ liệu dựa trên role
  const fetchAdminData = async () => {
    if (user?.role !== UserRole.ADMIN) return;
    const { data: profiles } = await db.profiles.listAll();
    const { data: allCvsData } = await db.cvs.listAll();
    
    if (profiles) {
      setUsers(profiles.map(p => ({
        id: p.id,
        username: p.username,
        fullName: p.full_name,
        role: p.role as UserRole,
        createdAt: new Date(p.created_at).toLocaleDateString()
      })));
    }
    
    if (allCvsData) {
      setAllCvs(allCvsData.map(c => ({
        id: c.id,
        userId: c.user_id,
        title: c.title,
        ...c.content
      } as CVData)));
    }
  };

  useEffect(() => {
    if (view === 'admin') {
      fetchAdminData();
    }
  }, [view]);

  // Khởi tạo ứng dụng
  useEffect(() => {
    const initApp = async () => {
      setIsLoadingData(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await db.profiles.get(session.user.id);
        if (profile) {
          const userData: User = {
            id: profile.id,
            username: profile.username,
            fullName: profile.full_name,
            role: profile.role as UserRole,
            createdAt: profile.created_at
          };
          setUser(userData);
          
          const { data: userCvs } = await db.cvs.list(userData.id);
          if (userCvs) {
            setCvs(userCvs.map(item => ({
              id: item.id,
              userId: item.user_id,
              title: item.title,
              templateId: item.template_id,
              updatedAt: item.updated_at,
              ...item.content
            })));
          }
          setView('dashboard');
        }
      }

      const { data: tpls } = await db.templates.list();
      if (tpls && tpls.length > 0) {
        setTemplates(tpls);
      } else {
        setTemplates(INITIAL_TEMPLATES);
      }
      setIsLoadingData(false);
    };
    initApp();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingData(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Lỗi đăng nhập: " + error.message);
    } else if (data.user) {
      window.location.reload(); // Refresh để load lại toàn bộ state sạch
    }
    setIsLoadingData(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingData(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: { full_name: fullName } }
    });

    if (error) {
      alert("Lỗi đăng ký: " + error.message);
    } else if (data.user) {
      alert("Đăng ký thành công! Hãy đăng nhập.");
      setAuthMode('login');
    }
    setIsLoadingData(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const syncCVToCloud = async (cv: CVData) => {
    if (!user) return;
    setIsSyncing(true);
    const { personalInfo, experience, education, skills, type } = cv;
    await db.cvs.upsert({
      id: cv.id,
      user_id: user.id,
      title: cv.title,
      template_id: cv.templateId,
      updated_at: new Date().toISOString(),
      content: { personalInfo, experience, education, skills, type }
    });
    setTimeout(() => setIsSyncing(false), 500);
  };

  const createNewCV = async (templateId: string) => {
    if (!user) return;
    const newCV: CVData = {
      id: crypto.randomUUID(),
      userId: user.id,
      title: 'CV mới của tôi',
      personalInfo: {
        fullName: user.fullName,
        email: email || '',
        phone: '',
        dob: '',
        gender: 'Nam',
        address: '',
        objective: 'Mô tả mục tiêu nghề nghiệp của bạn tại đây...'
      },
      experience: [],
      education: [],
      skills: [],
      templateId,
      type: 'CV',
      updatedAt: new Date().toISOString()
    };
    setCvs([newCV, ...cvs]);
    setActiveCV(newCV);
    await syncCVToCloud(newCV);
    setView('editor');
  };

  const deleteCV = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa CV này?')) {
      await db.cvs.delete(id);
      setCvs(cvs.filter(c => c.id !== id));
    }
  };

  const updateActiveCV = (updates: Partial<CVData>) => {
    if (!activeCV) return;
    const updated = { ...activeCV, ...updates, updatedAt: new Date().toISOString() };
    setActiveCV(updated);
    setCvs(cvs.map(c => c.id === activeCV.id ? updated : c));
  };

  // Tự động lưu sau khi dừng gõ 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeCV && view === 'editor') {
        syncCVToCloud(activeCV);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeCV]);

  const handleAiOptimize = async (field: string, currentVal: string, setter: (val: string) => void) => {
    if (!currentVal) {
      alert('Vui lòng nhập nội dung trước khi tối ưu');
      return;
    }
    setIsAiLoading(true);
    try {
      const optimized = await optimizeCVContent(currentVal, field);
      setter(optimized);
      alert('✅ Tối ưu thành công! Nội dung đã được cập nhật.');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Lỗi không xác định';
      console.error('AI Optimize Error:', errorMsg);
      alert(`❌ Lỗi tối ưu: ${errorMsg}\n\nVui lòng kiểm tra API key trong .env.local`);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Tạo CV từ thông tin cơ bản sử dụng AI
  const handleGenerateCVWithAI = async (fullName: string, jobTitle: string, yearsExp: string, currentRole: string, skills: string) => {
    setAiGenerativeLoading(true);
    try {
      const cvData = await generateCVFromInfo(fullName, jobTitle, yearsExp, currentRole, skills);
      if (activeCV) {
        const updatedCV = {
          ...activeCV,
          personalInfo: {
            ...activeCV.personalInfo,
            objective: cvData.objective
          },
          experience: cvData.experience.map((exp: any, idx: number) => ({
            id: crypto.randomUUID(),
            ...exp
          })),
          skills: cvData.skills
        };
        setActiveCV(updatedCV);
        await syncCVToCloud(updatedCV);
        alert('✅ CV được tạo bởi AI thành công!');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Lỗi không xác định';
      alert(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setAiGenerativeLoading(false);
    }
  };

  // Gợi ý cải thiện CV
  const handleSuggestImprovements = async () => {
    if (!activeCV) return;
    setAiGenerativeLoading(true);
    try {
      const cvText = JSON.stringify(activeCV);
      const suggestions = await suggestCVImprovements(cvText);
      setCvSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Lỗi không xác định';
      alert(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setAiGenerativeLoading(false);
    }
  };

  // Phân tích chất lượng CV
  const handleAnalyzeCVQuality = async () => {
    if (!activeCV) return;
    setAiGenerativeLoading(true);
    try {
      const cvText = JSON.stringify(activeCV);
      const analysis = await analyzeCVQuality(cvText);
      setAiAnalysisScore(analysis);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Lỗi không xác định';
      alert(`❌ Lỗi: ${errorMsg}`);
    } finally {
      setAiGenerativeLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!cvPrintRef.current) return;
    try {
      const element = cvPrintRef.current;
      // Wait for fonts to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set background color explicitly for export
      const originalBg = element.style.backgroundColor;
      element.style.backgroundColor = '#ffffff';
      
      const canvas = await html2canvas(element, { 
        scale: 3,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
        imageTimeout: 5000,
        windowHeight: element.scrollHeight,
        windowWidth: element.scrollWidth,
        onclone: (cloned) => {
          // Ensure fonts are applied in cloned element
          const allElements = cloned.querySelectorAll('*');
          allElements.forEach((el: any) => {
            el.style.fontFamily = "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Arial', sans-serif";
          });
        }
      });
      
      element.style.backgroundColor = originalBg;
      
      const imgData = canvas.toDataURL('image/png', 0.95);
      const pdf = new (window as any).jspdf.jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Handle multiple pages if content is longer than one page
      let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();
      let position = 0;
      
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      
      pdf.save(`${activeCV?.title || 'CV'}.pdf`);
      alert('✅ Xuất PDF thành công!');
    } catch (error) {
      console.error('Export PDF error:', error);
      alert('❌ Lỗi khi xuất PDF. Vui lòng thử lại.');
    }
  };

  if (view === 'login' || isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        {isLoadingData ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-gray-500 font-medium">Đang kết nối Cloud...</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full border border-gray-100 animate-fadeIn">
            <div className="flex flex-col items-center mb-10">
              <div className="bg-indigo-600 p-4 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CV Builder Pro</h1>
              <p className="text-gray-500 mt-2 font-medium">Lưu trữ CV an toàn trên Supabase</p>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="flex flex-col gap-5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Nguyễn Văn A" required />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
                <input type="password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <button type="submit" className="mt-4 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all">
                {authMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </button>
              <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                {authMode === 'login' ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation user={user} onLogout={handleLogout} onNavigate={setView} activeView={view} />

      {/* Sync Status Overlay */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-xl text-[11px] font-bold text-gray-600 transition-all">
        {isSyncing ? (
          <>
            <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
            Đang lưu lên Supabase...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Đã đồng bộ an toàn
          </>
        )}
      </div>

      <main>
        {view === 'dashboard' && (
          <div className="max-w-7xl mx-auto p-8 animate-fadeIn">
             <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900">Chào, {user?.fullName}!</h1>
                <p className="text-gray-500 text-lg mt-1">Dữ liệu của bạn được bảo mật bởi Supabase RLS.</p>
             </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Layout className="w-5 h-5 text-indigo-600" /> Mẫu CV Chuyên nghiệp</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {templates.map(tpl => (
                  <div key={tpl.id} onClick={() => createNewCV(tpl.id)} className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img src={tpl.thumbnail} alt={tpl.name} className="w-full h-full object-cover group-hover:opacity-75" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600/20 backdrop-blur-sm">
                        <Plus className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-gray-800 text-sm truncate">{tpl.name}</p>
                      <span className="text-[10px] uppercase font-bold text-indigo-500">{tpl.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-600" /> CV của bạn (Đã đồng bộ)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cvs.map(cv => (
                  <div key={cv.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex justify-between items-center">
                    <div className="cursor-pointer flex-1" onClick={() => { setActiveCV(cv); setView('editor'); }}>
                      <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cv.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Cloud className="w-3 h-3" /> Cập nhật: {new Date(cv.updatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <button onClick={() => deleteCV(cv.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {cvs.length === 0 && (
                  <div className="col-span-full py-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400">
                    <FileText className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">Bạn chưa tạo CV nào.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'admin' && user?.role === UserRole.ADMIN && (
          <AdminDashboard 
            users={users} 
            cvs={allCvs} 
            templates={templates} 
            onDeleteTemplate={(id) => setTemplates(templates.filter(t => t.id !== id))}
            onAddTemplate={(name, category) => setTemplates([...templates, { id: Date.now().toString(), name, category, thumbnail: `https://picsum.photos/seed/${Date.now()}/400/600` }])}
          />
        )}

        {view === 'editor' && activeCV && (
          <div className="flex h-[calc(100vh-64px)] overflow-hidden">
             <div className="w-1/2 overflow-y-auto p-8 border-r border-gray-200 bg-white">
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold transition-colors"><ArrowLeft className="w-4 h-4" /> Thoát</button>
                <button onClick={exportPDF} className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"><Download className="w-4 h-4" /> Xuất PDF</button>
              </div>

              <div className="space-y-12">
                <section>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Tên dự án CV</label>
                  <input type="text" value={activeCV.title} onChange={(e) => updateActiveCV({ title: e.target.value })} className="w-full text-2xl font-bold border-b-2 border-transparent hover:border-gray-200 focus:border-indigo-600 outline-none pb-2" />
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-indigo-600"><UserIcon className="w-5 h-5" /> Thông tin cá nhân</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Avatar Upload */}
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-3 uppercase">Ảnh đại diện</label>
                      <div className="flex items-center gap-4">
                        {activeCV.personalInfo.avatar ? (
                          <img src={activeCV.personalInfo.avatar} alt="Avatar" className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-200" />
                        ) : (
                          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                            <UserIcon className="w-10 h-10 text-indigo-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updateActiveCV({ personalInfo: { ...activeCV.personalInfo, avatar: reader.result as string } });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 cursor-pointer"
                          />
                          <p className="text-xs text-gray-400 mt-2">JPG, PNG. Tối đa 5MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Họ và tên</label>
                      <input type="text" value={activeCV.personalInfo.fullName} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, fullName: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Email</label>
                      <input type="email" value={activeCV.personalInfo.email} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, email: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Số điện thoại</label>
                      <input type="tel" value={activeCV.personalInfo.phone} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, phone: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Ngày sinh</label>
                      <input type="date" value={activeCV.personalInfo.dob} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, dob: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Giới tính</label>
                      <select value={activeCV.personalInfo.gender} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, gender: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">-- Chọn giới tính --</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Địa chỉ</label>
                      <input type="text" value={activeCV.personalInfo.address} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, address: e.target.value }})} placeholder="VD: Hà Nội, Việt Nam" className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase">Mục tiêu nghề nghiệp (AI hỗ trợ)</label>
                      <button disabled={isAiLoading} onClick={() => handleAiOptimize('Mục tiêu nghề nghiệp', activeCV.personalInfo.objective, (val) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, objective: val }}))} className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:text-purple-700 uppercase">
                        <Sparkles className={`w-3 h-3 ${isAiLoading ? 'animate-spin' : ''}`} /> {isAiLoading ? 'AI đang viết...' : 'Tối ưu bằng AI'}
                      </button>
                    </div>
                    <textarea rows={3} value={activeCV.personalInfo.objective} onChange={(e) => updateActiveCV({ personalInfo: { ...activeCV.personalInfo, objective: e.target.value }})} className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-600"><Briefcase className="w-5 h-5" /> Kinh nghiệm</h3>
                    <button onClick={() => { const newExp: Experience = { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '' }; updateActiveCV({ experience: [...activeCV.experience, newExp] }); }} className="p-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200"><Plus className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-5">
                    {activeCV.experience.map((exp, idx) => (
                      <div key={exp.id} className="p-4 border border-gray-100 rounded-lg bg-slate-50 relative group">
                        <button onClick={() => updateActiveCV({ experience: activeCV.experience.filter(e => e.id !== exp.id) })} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input placeholder="Công ty" value={exp.company} onChange={(e) => { const newExp = [...activeCV.experience]; newExp[idx].company = e.target.value; updateActiveCV({ experience: newExp }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                          <input placeholder="Vị trí" value={exp.position} onChange={(e) => { const newExp = [...activeCV.experience]; newExp[idx].position = e.target.value; updateActiveCV({ experience: newExp }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                          <input type="month" placeholder="Từ tháng" value={exp.startDate} onChange={(e) => { const newExp = [...activeCV.experience]; newExp[idx].startDate = e.target.value; updateActiveCV({ experience: newExp }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                          <input type="month" placeholder="Đến tháng" value={exp.endDate} onChange={(e) => { const newExp = [...activeCV.experience]; newExp[idx].endDate = e.target.value; updateActiveCV({ experience: newExp }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                        </div>
                        <textarea placeholder="Mô tả công việc" rows={2} value={exp.description} onChange={(e) => { const newExp = [...activeCV.experience]; newExp[idx].description = e.target.value; updateActiveCV({ experience: newExp }); }} className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-sm resize-none mb-2" />
                        <button onClick={() => handleAiOptimize('Mô tả kinh nghiệm', exp.description, (val) => { const newExp = [...activeCV.experience]; newExp[idx].description = val; updateActiveCV({ experience: newExp }); })} className="flex items-center gap-1 text-[10px] font-bold text-purple-600 uppercase"><Sparkles className="w-3 h-3" /> AI tối ưu</button>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-600"><GraduationCap className="w-5 h-5" /> Học vấn</h3>
                    <button onClick={() => { const newEdu: Education = { id: crypto.randomUUID(), school: '', major: '', year: '' }; updateActiveCV({ education: [...activeCV.education, newEdu] }); }} className="p-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200"><Plus className="w-5 h-5" /></button>
                  </div>
                  <div className="space-y-3">
                    {activeCV.education.map((edu, idx) => (
                      <div key={edu.id} className="grid grid-cols-3 gap-3 p-3 border border-gray-100 rounded-lg bg-slate-50 relative group">
                        <input placeholder="Trường học" value={edu.school} onChange={(e) => { const newEdu = [...activeCV.education]; newEdu[idx].school = e.target.value; updateActiveCV({ education: newEdu }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                        <input placeholder="Ngành học" value={edu.major} onChange={(e) => { const newEdu = [...activeCV.education]; newEdu[idx].major = e.target.value; updateActiveCV({ education: newEdu }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                        <input placeholder="Năm tốt nghiệp" value={edu.year} onChange={(e) => { const newEdu = [...activeCV.education]; newEdu[idx].year = e.target.value; updateActiveCV({ education: newEdu }); }} className="px-3 py-2 bg-white border border-gray-200 rounded text-sm" />
                        <button onClick={() => updateActiveCV({ education: activeCV.education.filter(e => e.id !== edu.id) })} className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-indigo-600"><Sparkles className="w-5 h-5" /> Kỹ năng</h3>
                  
                  {/* Input field để thêm kỹ năng */}
                  <div className="flex gap-3 mb-6">
                    <input 
                      type="text" 
                      placeholder="VD: React, JavaScript, Node.js..."
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && skillInput.trim()) {
                          updateActiveCV({ skills: [...activeCV.skills, skillInput.trim()] });
                          setSkillInput('');
                        }
                      }}
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                      onClick={() => {
                        if (skillInput.trim()) {
                          updateActiveCV({ skills: [...activeCV.skills, skillInput.trim()] });
                          setSkillInput('');
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Thêm
                    </button>
                  </div>

                  {/* Hiển thị kỹ năng dưới dạng tags */}
                  <div className="flex flex-wrap gap-2">
                    {activeCV.skills.map((skill, idx) => (
                      <div 
                        key={idx} 
                        className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-all group"
                      >
                        {skill}
                        <button 
                          onClick={() => updateActiveCV({ skills: activeCV.skills.filter((_, i) => i !== idx) })} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                        >
                          <Trash2 className="w-3 h-3 cursor-pointer hover:text-red-500" />
                        </button>
                      </div>
                    ))}
                    {activeCV.skills.length === 0 && (
                      <p className="text-sm text-gray-400 italic">Chưa thêm kỹ năng nào</p>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <div className="w-1/2 bg-slate-200 overflow-y-auto p-12 flex justify-center items-start">
              <div className="w-[210mm] origin-top scale-[0.85] shadow-2xl rounded-sm overflow-hidden">
                <CVTemplate id="cv-to-print" data={activeCV} />
              </div>
              <div className="fixed -left-[10000px] top-0 w-[210mm]"><div ref={cvPrintRef}><CVTemplate data={activeCV} /></div></div>
            </div>
          </div>
        )}

      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
