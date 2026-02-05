
import React from 'react';
import { CVData } from '../types';

interface CVTemplateProps {
  data: CVData;
  id?: string;
}

export const CVTemplate: React.FC<CVTemplateProps> = ({ data, id }) => {
  const { personalInfo, experience, education, skills, templateId } = data;

  // Professional color scheme based on templateId
  const getStyles = () => {
    switch (templateId) {
      case 't2': return { text: 'text-emerald-700', border: 'border-emerald-700', skillBg: 'bg-emerald-50', skillText: 'text-emerald-700' };
      case 't3': return { text: 'text-gray-800', border: 'border-gray-800', skillBg: 'bg-gray-100', skillText: 'text-gray-800' };
      case 't4': return { text: 'text-blue-700', border: 'border-blue-700', skillBg: 'bg-blue-50', skillText: 'text-blue-700' };
      case 't5': return { text: 'text-slate-700', border: 'border-slate-700', skillBg: 'bg-slate-100', skillText: 'text-slate-700' };
      case 't6': return { text: 'text-purple-700', border: 'border-purple-700', skillBg: 'bg-purple-50', skillText: 'text-purple-700' };
      default: return { text: 'text-indigo-700', border: 'border-indigo-700', skillBg: 'bg-indigo-50', skillText: 'text-indigo-700' };
    }
  };

  const theme = getStyles();

  return (
    <div id={id} className="bg-white p-10 shadow-inner min-h-full cv-preview-container flex flex-col">
      {/* Header with Avatar */}
      <div className="flex gap-6 border-b-2 pb-6 mb-6" style={{ borderColor: theme.border }}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          {personalInfo.avatar ? (
            <img src={personalInfo.avatar} alt="Avatar" className="w-24 h-24 rounded object-cover border-2" style={{ borderColor: theme.border }} />
          ) : (
            <div className="w-24 h-24 rounded flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: theme.text }}>
              {personalInfo.fullName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
          <p className="text-sm font-semibold mb-2" style={{ color: theme.text }}>Mục Tiêu Nghề Nghiệp</p>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">{personalInfo.objective}</p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            {personalInfo.email && <span><span className="font-semibold">Email:</span> {personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span><span className="font-semibold">ĐT:</span> {personalInfo.phone}</span>}
            {personalInfo.address && <span>•</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ color: theme.text, borderColor: theme.border }}>Kinh Nghiệm Làm Việc</h2>
              <div className="flex flex-col gap-4">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                        <p className="text-xs font-semibold" style={{ color: theme.text }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ color: theme.text, borderColor: theme.border }}>Học Vấn</h2>
              <div className="flex flex-col gap-3">
                {education.map(edu => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{edu.school}</h3>
                      <p className="text-xs text-gray-700">{edu.major}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{edu.year}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3 pb-2 border-b-2" style={{ color: theme.text, borderColor: theme.border }}>Kỹ Năng</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 text-xs font-medium rounded" style={{ backgroundColor: theme.skillBg, color: theme.skillText }}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
