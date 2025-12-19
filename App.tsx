import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { CalculatorComponent } from './components/Calculator';
import { MaterialViewer } from './components/MaterialViewer';
import { CalculatorMode, MaterialTopic, ViewState } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [activeCalculatorMode, setActiveCalculatorMode] = useState<CalculatorMode | null>(null);
  const [activeMaterialTopic, setActiveMaterialTopic] = useState<MaterialTopic | null>(null);

  const handleModeSelect = (mode: CalculatorMode) => {
    setActiveCalculatorMode(mode);
    setCurrentView('CALCULATOR');
    // Scroll container to top
    document.getElementById('main-content')?.scrollTo(0, 0);
  };

  const handleMaterialSelect = (topic: MaterialTopic) => {
    setActiveMaterialTopic(topic);
    setCurrentView('MATERIAL');
    document.getElementById('main-content')?.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView('HOME');
    setActiveCalculatorMode(null);
    setActiveMaterialTopic(null);
    document.getElementById('main-content')?.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-pastel-cream">
      
      {/* Navbar Area (Formerly Sidebar) - Selalu di Atas */}
      <div className="z-50 shrink-0">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          onSelectMaterial={handleMaterialSelect}
          activeTopic={activeMaterialTopic}
          currentView={currentView}
          onGoHome={handleGoHome}
        />
      </div>

      {/* Main Content Area - Di Bawah Navbar */}
      <main 
        id="main-content"
        className="flex-1 relative overflow-y-auto scroll-smooth w-full p-0"
      >
        <div className="min-h-full pb-10">
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