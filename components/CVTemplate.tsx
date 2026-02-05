
import React from 'react';
import { CVData } from '../types';

interface CVTemplateProps {
  data: CVData;
  id?: string;
}

export const CVTemplate: React.FC<CVTemplateProps> = ({ data, id }) => {
  const { personalInfo, experience, education, skills, templateId } = data;

  // Template 1: Hiện Đại (Modern Tech Style)
  if (templateId === 't1') {
    return (
      <div id={id} className="bg-gradient-to-br from-indigo-50 to-white p-8 min-h-full cv-preview-container flex flex-col">
        <div className="flex gap-6 mb-5">
          <div className="flex-shrink-0">
            {personalInfo.avatar ? (
              <img src={personalInfo.avatar} alt="Avatar" className="w-24 h-24 rounded-xl object-cover border-4 border-indigo-300 shadow-lg" />
            ) : (
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-2xl font-bold text-white bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-lg">
                {personalInfo.fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-black text-indigo-900 mb-1">{personalInfo.fullName}</h1>
            <div className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">Mục Tiêu Nghề Nghiệp</div>
            <p className="text-xs text-gray-700 leading-snug mb-2">{personalInfo.objective}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              {personalInfo.email && <span className="bg-indigo-100 px-2 py-1 rounded">📧 {personalInfo.email}</span>}
              {personalInfo.phone && <span className="bg-indigo-100 px-2 py-1 rounded">📱 {personalInfo.phone}</span>}
              {personalInfo.address && <span className="bg-indigo-100 px-2 py-1 rounded">📍 {personalInfo.address}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 flex-1">
          <div className="col-span-2 flex flex-col gap-4">
            {experience.length > 0 && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-600 shadow-sm">
                <h2 className="text-xs font-black uppercase text-indigo-900 mb-3 bg-indigo-100 p-2 rounded">Kinh Nghiệm</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-xs text-gray-900">{exp.position}</h3>
                      <span className="text-xs text-indigo-600">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-indigo-700 font-semibold">{exp.company}</p>
                    <p className="text-xs text-gray-700 leading-snug mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-600 shadow-sm">
                <h2 className="text-xs font-black uppercase text-indigo-900 mb-3 bg-indigo-100 p-2 rounded">Học Vấn</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-xs text-gray-900">{edu.school}</h3>
                      <span className="text-xs text-indigo-600">{edu.year}</span>
                    </div>
                    <p className="text-xs text-gray-700">{edu.major}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-1">
            {skills.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xs font-black uppercase mb-3">Kỹ Năng</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-white text-indigo-700 px-2 py-1 text-xs font-bold rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template 2: Cổ Điển (Classic)
  if (templateId === 't2') {
    return (
      <div id={id} className="bg-white p-9 min-h-full cv-preview-container flex flex-col">
        <div className="border-b-4 border-emerald-800 pb-4 mb-5">
          <div className="flex gap-6">
            <div>
              {personalInfo.avatar ? (
                <img src={personalInfo.avatar} alt="Avatar" className="w-20 h-20 object-cover border-2 border-emerald-800" />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center text-2xl font-bold text-white bg-emerald-800">
                  {personalInfo.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-emerald-900 letter-spacing-wide">{personalInfo.fullName}</h1>
              <p className="text-xs text-emerald-800 font-semibold uppercase letter-spacing-widest">Mục Tiêu Nghề Nghiệp</p>
              <p className="text-xs text-gray-800 leading-snug mt-1 italic">{personalInfo.objective}</p>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-gray-700 mt-3 border-t border-emerald-200 pt-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>•</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          <div className="col-span-2">
            {experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase border-b-2 border-emerald-800 pb-1 mb-3 text-emerald-900">Kinh Nghiệm Làm Việc</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-900">{exp.position}</p>
                        <p className="text-xs text-emerald-800 font-semibold italic">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-800 leading-snug mt-0.5">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase border-b-2 border-emerald-800 pb-1 mb-3 text-emerald-900">Học Vấn</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2.5">
                    <div className="flex justify-between">
                      <p className="text-xs font-bold text-gray-900">{edu.school}</p>
                      <span className="text-xs text-gray-600">{edu.year}</span>
                    </div>
                    <p className="text-xs text-gray-800">{edu.major}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase border-b-2 border-emerald-800 pb-1 mb-3 text-emerald-900">Kỹ Năng</h2>
                <div className="flex flex-col gap-1">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="text-xs text-gray-800 before:content-['▪'] before:mr-2 before:text-emerald-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template 3: Tối Giản (Minimalist)
  if (templateId === 't3') {
    return (
      <div id={id} className="bg-white p-8 min-h-full cv-preview-container flex flex-col">
        <div className="border-b border-gray-400 pb-4 mb-5">
          <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
          <p className="text-xs text-gray-700 mt-1">{personalInfo.objective}</p>
          <div className="flex gap-4 text-xs text-gray-700 mt-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>|</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>|</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          <div className="col-span-2">
            {experience.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase text-gray-900 mb-2.5">Kinh Nghiệm</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-2.5">
                    <div className="flex justify-between">
                      <p className="text-xs font-bold text-gray-900">{exp.position}</p>
                      <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-700">{exp.company}</p>
                    <p className="text-xs text-gray-700 leading-snug">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase text-gray-900 mb-2.5">Học Vấn</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-xs font-bold text-gray-900">{edu.school}</p>
                    <p className="text-xs text-gray-700">{edu.major} ({edu.year})</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase text-gray-900 mb-2.5">Kỹ Năng</h2>
                <div className="flex flex-col gap-1">
                  {skills.map((skill, idx) => (
                    <p key={idx} className="text-xs text-gray-700">{skill}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template 4: Sáng Tạo (Creative)
  if (templateId === 't4') {
    return (
      <div id={id} className="bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8 min-h-full cv-preview-container flex flex-col">
        <div className="mb-6">
          <div className="flex gap-4 items-end mb-4">
            {personalInfo.avatar ? (
              <img src={personalInfo.avatar} alt="Avatar" className="w-28 h-28 rounded-2xl object-cover border-4 border-blue-400" />
            ) : (
              <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-3xl font-black bg-gradient-to-br from-blue-400 to-blue-600">
                {personalInfo.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 pb-2">
              <h1 className="text-4xl font-black text-blue-300 mb-1">{personalInfo.fullName}</h1>
              <div className="flex gap-2 flex-wrap text-xs">
                {personalInfo.email && <span className="bg-blue-600 px-2 py-1 rounded">{personalInfo.email}</span>}
                {personalInfo.phone && <span className="bg-blue-600 px-2 py-1 rounded">{personalInfo.phone}</span>}
              </div>
            </div>
          </div>
          <p className="text-sm text-blue-200 italic border-l-4 border-blue-400 pl-3">{personalInfo.objective}</p>
        </div>

        <div className="grid grid-cols-3 gap-5 flex-1">
          <div className="col-span-2 space-y-4">
            {experience.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-blue-300 mb-3 flex items-center gap-2">━━ Kinh Nghiệm</h2>
                <div className="space-y-3">
                  {experience.map(exp => (
                    <div key={exp.id} className="bg-slate-700 p-3 rounded-lg border-l-4 border-blue-400">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-white text-xs">{exp.position}</h3>
                        <span className="text-xs text-blue-300">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-xs text-blue-300 font-semibold">{exp.company}</p>
                      <p className="text-xs text-gray-300 leading-snug mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-lg font-black text-blue-300 mb-3 flex items-center gap-2">━━ Học Vấn</h2>
                {education.map(edu => (
                  <div key={edu.id} className="bg-slate-700 p-2 rounded-lg mb-2">
                    <div className="flex justify-between">
                      <p className="font-bold text-white text-xs">{edu.school}</p>
                      <span className="text-xs text-blue-300">{edu.year}</span>
                    </div>
                    <p className="text-xs text-gray-300">{edu.major}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {skills.length > 0 && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg">
                <h2 className="text-sm font-black text-white mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-blue-900 text-blue-200 px-2.5 py-1 rounded-full text-xs font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template 5: Kinh Doanh Cổ Điển (Business Classic)
  if (templateId === 't5') {
    return (
      <div id={id} className="bg-white p-9 min-h-full cv-preview-container flex flex-col">
        <div className="border-t-4 border-b-2 border-slate-800 py-4 mb-5">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{personalInfo.fullName}</h1>
          <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest mt-1">Mục Tiêu Chuyên Nghiệp</p>
          <p className="text-xs text-gray-800 leading-snug mt-2 max-w-2xl">{personalInfo.objective}</p>
          <div className="flex justify-between mt-3 text-xs text-gray-700 border-t border-slate-200 pt-2">
            <span>{personalInfo.address || '---'}</span>
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 flex-1">
          <div className="col-span-3">
            {experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-2 mb-3">Kinh Nghiệm Chuyên Môn</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-3 pb-3 border-b border-slate-200 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold text-slate-900">{exp.position}</p>
                        <p className="text-xs text-slate-700 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap">{exp.startDate}—{exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-800 leading-snug mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase text-slate-900 border-b-2 border-slate-800 pb-2 mb-3">Học Vấn</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2 pb-2 border-b border-slate-200 last:border-0">
                    <p className="text-xs font-bold text-slate-900">{edu.school}</p>
                    <p className="text-xs text-gray-800">{edu.major}, {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            {skills.length > 0 && (
              <div className="bg-slate-100 p-4 rounded">
                <h2 className="text-xs font-black uppercase text-slate-900 mb-3">Kỹ Năng</h2>
                <ul className="space-y-2">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="text-xs text-gray-800 font-semibold">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template 6: Thiết Kế & Marketing (Design)
  if (templateId === 't6') {
    return (
      <div id={id} className="bg-white p-8 min-h-full cv-preview-container flex flex-col">
        <div className="flex gap-6 mb-5">
          {personalInfo.avatar ? (
            <img src={personalInfo.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black text-white bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
              {personalInfo.fullName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-baseline gap-3 mb-1">
              <h1 className="text-3xl font-black text-gray-900">{personalInfo.fullName}</h1>
              <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <p className="text-xs text-purple-700 font-bold mb-2">CREATIVE PROFESSIONAL</p>
            <p className="text-xs text-gray-800 leading-snug mb-3 italic">{personalInfo.objective}</p>
            <div className="flex gap-3 text-xs text-gray-700">
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{personalInfo.email}</span>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{personalInfo.phone}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 flex-1">
          <div className="col-span-2 space-y-4">
            {experience.length > 0 && (
              <div className="border-l-4 border-purple-500 pl-3">
                <h2 className="text-xs font-black uppercase text-gray-900 mb-3">Experience</h2>
                {experience.map(exp => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-xs text-purple-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs text-gray-800 leading-snug mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div className="border-l-4 border-pink-500 pl-3">
                <h2 className="text-xs font-black uppercase text-gray-900 mb-3">Education</h2>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <h3 className="text-xs font-bold text-gray-900">{edu.school}</h3>
                    <p className="text-xs text-gray-800">{edu.major} — {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase text-gray-900 mb-3">Skills & Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-bold rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: không được chỉ định template
  return (
    <div id={id} className="bg-white p-8 min-h-full cv-preview-container flex flex-col">
      <p className="text-center text-gray-500">No template selected</p>
    </div>
  );
};
