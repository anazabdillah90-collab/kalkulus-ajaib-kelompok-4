import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Users, Menu, X, ChevronDown, GraduationCap, Home } from 'lucide-react';
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
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  // Close dropdowns when clicking outside
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowMaterialDropdown(false);
        setShowTeamDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="bg-pastel-yellow border-b-2 border-white/50 shadow-md z-50 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={onGoHome}>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm mr-2 group-hover:rotate-12 transition-transform">
                <span className="text-xl">✨</span>
            </div>
            <h1 className="font-bold text-xl text-gray-700 tracking-tight">
              Kalkulator <span className="text-orange-500">Ajaib</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Home Button */}
            <button 
              onClick={onGoHome}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'HOME' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-600 hover:bg-white/50'}`}
            >
              <Home size={18} />
              Beranda
            </button>

            {/* Dropdown Materi */}
            <div className="relative">
              <button 
                onClick={() => { setShowMaterialDropdown(!showMaterialDropdown); setShowTeamDropdown(false); }}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'MATERIAL' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-600 hover:bg-white/50'}`}
              >
                <BookOpen size={18} />
                Materi Ajaib
                <ChevronDown size={14} className={`transition-transform duration-200 ${showMaterialDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Desktop */}
              {showMaterialDropdown && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden py-2 animate-fade-in-up">
                  {Object.values(MaterialTopic).map((topic) => (
                    <button
                      key={topic}
                      onClick={() => {
                        onSelectMaterial(topic);
                        setShowMaterialDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-pastel-cream hover:text-orange-600 transition-colors ${activeTopic === topic && currentView === 'MATERIAL' ? 'text-orange-500 font-bold bg-orange-50' : 'text-gray-600'}`}
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
                onClick={() => { setShowTeamDropdown(!showTeamDropdown); setShowMaterialDropdown(false); }}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-white/50 transition-colors flex items-center gap-2"
              >
                <Users size={18} />
                Tim Kami
                <ChevronDown size={14} className={`transition-transform duration-200 ${showTeamDropdown ? 'rotate-180' : ''}`} />
              </button>
               {showTeamDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden p-3 animate-fade-in-up">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">Anggota Tim</h3>
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-pastel-cream transition-colors">
                      <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-700">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-white/50 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapse) */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 absolute top-16 left-0 w-full shadow-lg max-h-[80vh] overflow-y-auto animate-slide-down">
          <div className="px-4 pt-2 pb-6 space-y-4">
             {/* Mobile Home */}
             <button
                onClick={() => {
                  onGoHome();
                  setIsOpen(false);
                }}
                className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl bg-pastel-yellow/30 text-gray-800 font-bold"
              >
                <Home size={20} />
                Beranda
              </button>

            {/* Mobile Materi Section */}
            <div>
              <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                 <BookOpen size={14} /> Materi Ajaib
              </h3>
              <div className="space-y-1">
                {Object.values(MaterialTopic).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      onSelectMaterial(topic);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeTopic === topic && currentView === 'MATERIAL' ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Team Section */}
            <div className="border-t border-gray-100 pt-4">
              <h3 className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                 <Users size={14} /> Tim Kami
              </h3>
              <div className="grid grid-cols-1 gap-2">
                 {TEAM_MEMBERS.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 px-3 py-2">
                       <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-xs font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.id}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};