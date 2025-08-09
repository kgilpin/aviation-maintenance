import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { Facilities } from './pages/Facilities';
import { CMP } from './pages/CMP';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/cmp" element={<CMP />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
