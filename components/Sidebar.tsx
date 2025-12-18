import React from 'react';
import { BookOpen, Users, X, ChevronRight, GraduationCap } from 'lucide-react';
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
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container - Right Aligned */}
      <aside 
        className={`
          fixed top-0 right-0 h-full w-80 bg-pastel-yellow border-l-2 border-white/50 shadow-xl 
          z-50 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          md:translate-x-0 md:relative md:w-72 md:shrink-0
        `}
      >
        <div className="p-6 flex-grow overflow-y-auto">
          {/* Header & Close Button */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-pastel-text flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-400" />
              Menu
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-full hover:bg-white/50 text-pastel-text"
            >
              <X size={24} />
            </button>
          </div>

           {/* Home Link (Mobile primarily) */}
           <div className="mb-6">
              <button
                onClick={() => {
                  onGoHome();
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl font-semibold bg-white/60 hover:bg-white transition-all text-pastel-text shadow-sm"
              >
                🏠 Kembali ke Beranda
              </button>
           </div>

          {/* Materi Ajaib Section */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4 ml-2">
              Materi Ajaib
            </h3>
            <div className="space-y-2">
              {Object.values(MaterialTopic).map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    onSelectMaterial(topic);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                    ${activeTopic === topic && currentView === 'MATERIAL'
                      ? 'bg-pastel-pink text-gray-800 shadow-md transform scale-105 font-bold' 
                      : 'hover:bg-white/50 text-gray-600'}
                  `}
                >
                  <span className="text-sm">{topic}</span>
                  {activeTopic === topic && currentView === 'MATERIAL' && <ChevronRight size={16} />}
                </button>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-auto pt-6 border-t border-white/30">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4 ml-2 flex items-center gap-2">
              <Users size={16} />
              Tim Kami
            </h3>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="bg-white/40 p-3 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pastel-pink flex items-center justify-center text-xs font-bold text-white shadow-inner">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white/30 text-center text-xs text-gray-500">
          Kalkulator Ajaib v1.0
        </div>
      </aside>
    </>
  );
};