
import React from 'react';
import { User, UserRole } from '../types';
import { Layout, FileText, Settings, LogOut, Users } from 'lucide-react';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  activeView: string;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout, onNavigate, activeView }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              CV Builder Pro
            </span>
          </div>

          {user && (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-1 font-medium transition-colors ${activeView === 'dashboard' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
              >
                <Layout className="w-4 h-4" /> Bảng điều khiển
              </button>
              
              {user.role === UserRole.ADMIN && (
                <button 
                  onClick={() => onNavigate('admin')}
                  className={`flex items-center gap-1 font-medium transition-colors ${activeView === 'admin' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                >
                  <Settings className="w-4 h-4" /> Quản trị
                </button>
              )}

              <div className="h-6 w-px bg-gray-200 mx-2"></div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-gray-900">{user.fullName}</span>
                  <span className="text-xs text-gray-500 uppercase">{user.role}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
