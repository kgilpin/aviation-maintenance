import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { IntegralPage } from './pages/IntegralPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center"><h1 className="text-4xl font-bold">Welcome to Aura Aero</h1></div>} />
            <Route path="/en/integral" element={<IntegralPage />} />
            <Route path="/integral" element={<IntegralPage />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
