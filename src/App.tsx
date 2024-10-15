import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DashboardCreator from './components/DashboardCreator';
import DashboardView from './components/DashboardView';

// App.tsx
const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-6 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<DashboardCreator />} />
          <Route path="/edit/:id" element={<DashboardCreator />} />
          <Route path="/view/:id" element={<DashboardView />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
