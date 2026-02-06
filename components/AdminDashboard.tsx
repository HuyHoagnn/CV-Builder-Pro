
import React, { useState } from 'react';
import { User, CVData, Template } from '../types';
import { Users, FileText, LayoutTemplate, TrendingUp, Trash2, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  users: User[];
  cvs: CVData[];
  templates: Template[];
  onDeleteTemplate: (id: string) => void;
  onAddTemplate: (name: string, category: 'CV' | 'COVER_LETTER') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  users, cvs, templates, onDeleteTemplate, onAddTemplate 
}) => {
  const [newTplName, setNewTplName] = useState('');
  const [newTplCat, setNewTplCat] = useState<'CV' | 'COVER_LETTER'>('CV');

  const stats = [
    { label: 'Tổng người dùng', value: users.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'CV đã tạo', value: cvs.length, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Mẫu thiết kế', value: templates.length, icon: LayoutTemplate, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'Users', count: users.length },
    { name: 'CVs', count: cvs.length },
    { name: 'Templates', count: templates.length },
  ];

  const handleAdd = () => {
    if (!newTplName) return;
    onAddTemplate(newTplName, newTplCat);
    setNewTplName('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tổng quan quản trị</h1>
          <p className="text-gray-500">Quản lý hệ thống và theo dõi hiệu suất.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" /> Thống kê hoạt động
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                   {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#6366f1', '#a855f7'][index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-purple-600" /> Quản lý mẫu
          </h2>
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Tên mẫu mới..." 
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={newTplName}
              onChange={(e) => setNewTplName(e.target.value)}
            />
            <select 
              className="px-4 py-2 border border-gray-200 rounded-lg outline-none"
              value={newTplCat}
              onChange={(e) => setNewTplCat(e.target.value as any)}
            >
              <option value="CV">CV</option>
              <option value="COVER_LETTER">Thư xin việc</option>
            </select>
            <button 
              onClick={handleAdd}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Thêm
            </button>
          </div>
          <div className="overflow-hidden border border-gray-100 rounded-xl">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên mẫu</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Loại</th>
                  <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {templates.map(tpl => (
                  <tr key={tpl.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{tpl.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${tpl.category === 'CV' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {tpl.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => onDeleteTemplate(tpl.id)} className="text-red-500 hover:text-red-700 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" /> Danh sách người dùng
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Họ và tên</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tên đăng nhập</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{u.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.username}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
