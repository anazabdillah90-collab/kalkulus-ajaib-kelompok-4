import React, { useState } from 'react';
import { BookOpen, Users, X, ChevronDown, ChevronRight, Home, Sparkles } from 'lucide-react';
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
  // State untuk accordion (buka/tutup menu)
  const [isMaterialOpen, setIsMaterialOpen] = useState(true);
  const [isTeamOpen, setIsTeamOpen] = useState(false);

  // Class dasar untuk container sidebar
  // Desktop: relative, w-80, border-left (karena di kanan)
  // Mobile: fixed inset-0 (drawer)
  const sidebarClasses = `
    bg-pastel-yellow 
    md:h-full md:w-80 
    md:border-l-2 md:border-white/50 
    md:shadow-none shadow-2xl
    flex flex-col
    transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
    md:translate-x-0
    fixed md:relative inset-y-0 right-0 z-40
    w-full sm:w-80
  `;

  return (
    <>
      {/* Overlay untuk Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className={sidebarClasses}>
        {/* Header Sidebar */}
        <div className="p-6 flex items-center justify-between border-b border-white/30">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onGoHome}>
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
                <Sparkles className="text-orange-500" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-700 leading-none">Kalkulator</h1>
              <span className="text-sm font-bold text-orange-500">Ajaib</span>
            </div>
          </div>
          {/* Tombol Close Mobile */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-white/50 text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Konten Menu Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Menu Beranda */}
          <button 
            onClick={() => { onGoHome(); setIsOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'HOME' ? 'bg-white text-orange-500 shadow-sm font-bold' : 'text-gray-600 hover:bg-white/40'}`}
          >
            <Home size={20} />
            Beranda
          </button>

          {/* Section Materi (Accordion) */}
          <div className="space-y-1">
            <button 
              onClick={() => setIsMaterialOpen(!isMaterialOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-white/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-pink-500" />
                Materi Ajaib
              </div>
              {isMaterialOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isMaterialOpen && (
              <div className="pl-4 pr-2 space-y-1 animate-slide-down">
                {Object.values(MaterialTopic).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      onSelectMaterial(topic);
                      setIsOpen(false); // Tutup sidebar di mobile setelah klik
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all border-l-2 ${activeTopic === topic && currentView === 'MATERIAL' ? 'border-orange-500 bg-white/60 text-orange-600 font-bold shadow-sm' : 'border-transparent text-gray-600 hover:bg-white/30 hover:border-pink-300'}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section Tim Kami (Accordion) */}
          <div className="space-y-1">
             <button 
              onClick={() => setIsTeamOpen(!isTeamOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-white/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users size={20} className="text-blue-500" />
                Tim Kami
              </div>
              {isTeamOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {isTeamOpen && (
              <div className="pl-4 pr-2 space-y-2 mt-2 animate-slide-down">
                {TEAM_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/30 border border-white/50">
                    <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-xs font-bold text-white shadow-sm flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-gray-700 truncate">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-white/30 text-center">
            <p className="text-xs text-gray-500 font-medium">
                © 2024 Kalkulator Ajaib
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
                Dibuat dengan ❤️ dan AI
            </p>
        </div>
      </nav>
    </>
  );
};