import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
