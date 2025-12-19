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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-pastel-cream">
      
      {/* Mobile Header Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 bg-pastel-yellow shadow-sm z-20">
        <div className="font-bold text-lg text-gray-700">Kalkulator Ajaib</div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white rounded-lg text-orange-500">
           <Menu size={24} />
        </button>
      </div>

      {/* Main Content Area - KIRI (order-1 on desktop) */}
      <main 
        id="main-content"
        className="flex-1 relative overflow-y-auto scroll-smooth w-full order-2 md:order-1 p-0"
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

      {/* Sidebar - KANAN (order-2 on desktop) */}
      <div className="order-1 md:order-2 z-30">
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          onSelectMaterial={handleMaterialSelect}
          activeTopic={activeMaterialTopic}
          currentView={currentView}
          onGoHome={handleGoHome}
        />
      </div>

    </div>
  );
};

export default App;