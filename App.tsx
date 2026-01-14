import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Analyzer from './components/Analyzer';

type ViewState = 'landing' | 'analyzer';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStart={() => setView('analyzer')} />
      ) : (
        <Analyzer onBack={() => setView('landing')} />
      )}
    </>
  );
};

export default App;