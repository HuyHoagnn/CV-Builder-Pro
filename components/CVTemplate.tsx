
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
    <div id={id} className="bg-white p-12 shadow-inner min-h-full cv-preview-container flex flex-col font-serif">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 pb-6" style={{ borderColor: theme.text }}>
        <div className="flex-1">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900">{personalInfo.fullName}</h1>
          <p className="mt-2 text-lg font-medium" style={{ color: theme.text }}>Mục tiêu nghề nghiệp</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-lg">{personalInfo.objective}</p>
        </div>
        <div className="text-right text-sm text-gray-600 flex flex-col gap-1">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.address}</p>
          <p>{personalInfo.dob} | {personalInfo.gender}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-8 flex-1">
        {/* Main Column */}
        <div className="col-span-8 flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-4" style={{ color: theme.text, borderColor: theme.text }}>Kinh nghiệm làm việc</h2>
            <div className="flex flex-col gap-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium italic text-gray-700 mb-2">{exp.company}</p>
                  <p className="text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-4" style={{ color: theme.text, borderColor: theme.text }}>Học vấn</h2>
            <div className="flex flex-col gap-4">
              {education.map(edu => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">{edu.school}</h3>
                    <p className="text-xs text-gray-600">{edu.major}</p>
                  </div>
                  <span className="text-xs text-gray-500">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold uppercase border-b-2 mb-4" style={{ color: theme.text, borderColor: theme.text }}>Kỹ năng</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Lời cam đoan</h2>
            <p className="text-[10px] text-gray-500 italic">
              Tôi xin cam đoan các thông tin trên là hoàn toàn chính xác và trung thực.
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
