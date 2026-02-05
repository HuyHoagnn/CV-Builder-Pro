
import React from 'react';
import { CVData } from '../types';

interface CVTemplateProps {
  data: CVData;
  id?: string;
}

export const CVTemplate: React.FC<CVTemplateProps> = ({ data, id }) => {
  const { personalInfo, experience, education, skills, templateId } = data;

  // Simple conditional styling based on templateId
  const getStyles = () => {
    switch (templateId) {
      case 't2': return { accent: 'bg-emerald-700', text: 'text-emerald-700', border: 'border-emerald-700' };
      case 't3': return { accent: 'bg-gray-800', text: 'text-gray-800', border: 'border-gray-800' };
      default: return { accent: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600' };
    }
  };

  const theme = getStyles();

  return (
    <div id={id} className="bg-white p-12 shadow-inner min-h-full cv-preview-container flex flex-col">
      {/* Header with Avatar */}
      <div className="flex gap-8 border-b-3 pb-8 mb-8" style={{ borderColor: theme.text }}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {personalInfo.avatar ? (
            <img src={personalInfo.avatar} alt="Avatar" className="w-28 h-28 rounded-lg object-cover border-4" style={{ borderColor: theme.text }} />
          ) : (
            <div className="w-28 h-28 rounded-lg flex items-center justify-center text-4xl font-bold text-white" style={{ backgroundColor: theme.text }}>
              {personalInfo.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <p className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Mục tiêu nghề nghiệp</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4 max-w-2xl">{personalInfo.objective}</p>
          
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            {personalInfo.email && <p><span className="font-semibold">Email:</span> {personalInfo.email}</p>}
            {personalInfo.phone && <p><span className="font-semibold">Điện thoại:</span> {personalInfo.phone}</p>}
            {personalInfo.address && <p><span className="font-semibold">Địa chỉ:</span> {personalInfo.address}</p>}
            {personalInfo.dob && <p><span className="font-semibold">Ngày sinh:</span> {new Date(personalInfo.dob).toLocaleDateString('vi-VN')}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 flex-1">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 flex flex-col gap-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-3" style={{ color: theme.text, borderColor: theme.text }}>📌 Kinh Nghiệm Làm Việc</h2>
              <div className="flex flex-col gap-5">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{exp.position}</h3>
                        <p className="text-sm font-semibold" style={{ color: theme.text }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-3" style={{ color: theme.text, borderColor: theme.text }}>🎓 Học Vấn</h2>
              <div className="flex flex-col gap-4">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.school}</h3>
                      <p className="text-sm text-gray-700">{edu.major}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold uppercase tracking-wide mb-4 pb-2 border-b-3" style={{ color: theme.text, borderColor: theme.text }}>⚡ Kỹ Năng</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-xs font-semibold text-white rounded-full" style={{ backgroundColor: theme.text }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Additional Info */}
          <section className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-sm font-bold uppercase text-gray-600 mb-2 tracking-wider">ℹ️ Thông Tin Thêm</h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              Tôi xin cam đoan các thông tin trên là hoàn toàn chính xác, trung thực và sẵn sàng cung cấp thêm chứng chỉ nếu cần.
            </p>
          </section>
        </div>
      </div>
      
      <div className="mt-auto pt-8 flex justify-end">
        <div className="text-center w-40">
          <p className="text-xs text-gray-400 mb-12">Chữ ký ứng viên</p>
          <div className="border-t border-gray-300"></div>
          <p className="text-sm font-bold mt-2 text-gray-800">{personalInfo.fullName}</p>
        </div>
      </div>
    </div>
  );
};
