import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { CalculatorComponent } from './components/Calculator';
import { MaterialViewer } from './components/MaterialViewer';
import { CalculatorMode, MaterialTopic, ViewState } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [activeCalculatorMode, setActiveCalculatorMode] = useState<CalculatorMode | null>(null);
  const [activeMaterialTopic, setActiveMaterialTopic] = useState<MaterialTopic | null>(null);

  const handleModeSelect = (mode: CalculatorMode) => {
    setActiveCalculatorMode(mode);
    setCurrentView('CALCULATOR');
    window.scrollTo(0, 0);
  };

  const handleMaterialSelect = (topic: MaterialTopic) => {
    setActiveMaterialTopic(topic);
    setCurrentView('MATERIAL');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView('HOME');
    setActiveCalculatorMode(null);
    setActiveMaterialTopic(null);
    window.scrollTo(0, 0);
  };

  return (
    // Flex-row-reverse ensures Sidebar is on the Right visually but logic remains standard Flex
    <div className="flex flex-row-reverse h-screen overflow-hidden bg-pastel-cream">
      
      {/* Sidebar (Right) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onSelectMaterial={handleMaterialSelect}
        activeTopic={activeMaterialTopic}
        currentView={currentView}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area (Left) */}
      <main className="flex-1 relative overflow-y-auto h-full scroll-smooth">
        
        {/* Mobile Hamburger (Absolute top right of main content) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 right-4 z-30 p-2 bg-white/80 rounded-full shadow-md text-gray-600 md:hidden hover:bg-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="min-h-full">
          {currentView === 'HOME' && (
            <Home onSelectMode={handleModeSelect} />
          )}

          {currentView === 'CALCULATOR' && activeCalculatorMode && (
            <CalculatorComponent 
              mode={activeCalculatorMode} 
              onBack={handleGoHome}
            />
          )}

          {currentView === 'MATERIAL' && activeMaterialTopic && (
            <MaterialViewer topic={activeMaterialTopic} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;