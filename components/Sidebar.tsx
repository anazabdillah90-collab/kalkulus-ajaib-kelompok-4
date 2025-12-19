import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Users, X, ChevronDown, Home, Sparkles, Menu } from 'lucide-react';
import { MaterialTopic, TEAM_MEMBERS, ViewState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSelectMaterial: (topic: MaterialTopic) => void;
  activeTopic: MaterialTopic | null;
  currentView: ViewState;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  onSelectMaterial, 
  activeTopic,
  currentView,
  onGoHome
}) => {
  // State untuk dropdown menu
  const [openDropdown, setOpenDropdown] = useState<'NONE' | 'MATERIAL' | 'TEAM'>('NONE');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown('NONE');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: 'MATERIAL' | 'TEAM') => {
    setOpenDropdown(prev => prev === menu ? 'NONE' : menu);
  };

  return (
    <>
      {/* Navbar Container */}
      <nav 
        ref={dropdownRef}
        className="w-full bg-pastel-yellow/90 backdrop-blur-md shadow-sm border-b-2 border-white/50 sticky top-0 z-50 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={onGoHome}>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform border border-orange-100">
                <Sparkles className="text-orange-500" size={20} />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-700 leading-none tracking-tight">Kalkulator</h1>
                <span className="text-sm font-bold text-orange-500">Ajaib ✨</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Tombol Beranda */}
              <button 
                onClick={onGoHome}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold ${currentView === 'HOME' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-600 hover:bg-white/40'}`}
              >
                <Home size={18} />
                Beranda
              </button>

              {/* Dropdown Materi */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('MATERIAL')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold ${currentView === 'MATERIAL' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-600 hover:bg-white/40'}`}
                >
                  <BookOpen size={18} />
                  Materi
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === 'MATERIAL' ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Content */}
                {openDropdown === 'MATERIAL' && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden animate-slide-down p-2">
                    {Object.values(MaterialTopic).map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          onSelectMaterial(topic);
                          setOpenDropdown('NONE');
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${activeTopic === topic ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Tim */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('TEAM')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-semibold text-gray-600 hover:bg-white/40"
                >
                  <Users size={18} />
                  Tim
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === 'TEAM' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'TEAM' && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden animate-slide-down p-2">
                    {TEAM_MEMBERS.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-pink to-orange-200 flex items-center justify-center text-[10px] font-bold text-white shadow-sm flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-700 truncate">{member.name}</p>
                          <p className="text-[10px] font-mono text-gray-500">{member.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-white/50 hover:bg-white text-gray-600 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation (Hanya muncul di Mobile) */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl rounded-b-3xl border-t border-gray-100 p-4 transform transition-transform duration-300 origin-top ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col space-y-2 h-[70vh] overflow-y-auto">
            <button 
                onClick={() => { onGoHome(); setIsOpen(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 font-semibold text-gray-700"
              >
                <Home size={20} className="text-orange-500" />
                Beranda
            </button>
            
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Materi</div>
            <div className="grid grid-cols-1 gap-1 pl-2">
              {Object.values(MaterialTopic).map((topic) => (
                <button
                  key={topic}
                  onClick={() => { onSelectMaterial(topic); setIsOpen(false); }}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-medium ${activeTopic === topic ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Tim Kami</div>
            <div className="grid grid-cols-1 gap-2 pl-2 pb-4">
               {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-pink to-orange-200 flex items-center justify-center text-[10px] font-bold text-white shadow-sm flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-gray-700 truncate">{member.name}</p>
                      <p className="text-[10px] font-mono text-gray-500">{member.id}</p>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};