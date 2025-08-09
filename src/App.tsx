import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { Facilities } from './pages/Facilities';
import { CMP } from './pages/CMP';
import { Contact } from './pages/Contact';
import { ClubClothing } from './pages/ClubClothing';
import { History } from './pages/History';
import { Links } from './pages/Links';
import { Location } from './pages/Location';
import { Meetings } from './pages/Meetings';
import { Membership } from './pages/Membership';
import { PreviousEvents } from './pages/PreviousEvents';
import { TheBow } from './pages/TheBow';
import { TheGun } from './pages/TheGun';
import { TheRod } from './pages/TheRod';
import './index.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/cmp" element={<CMP />} />
          <Route path="/cmp.html" element={<CMP />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/clubclothing" element={<ClubClothing />} />
          <Route path="/ClubClothing/clubclothing.html" element={<ClubClothing />} />
          <Route path="/history" element={<History />} />
          <Route path="/history.html" element={<History />} />
          <Route path="/links" element={<Links />} />
          <Route path="/links.html" element={<Links />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/meetings.html" element={<Meetings />} />
          <Route path="/location" element={<Location />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership.html" element={<Membership />} />
          <Route path="/previous-events" element={<PreviousEvents />} />
          <Route path="/PreviousEvents.html" element={<PreviousEvents />} />
          <Route path="/thebow" element={<TheBow />} />
          <Route path="/TheBow.html" element={<TheBow />} />
          <Route path="/thegun" element={<TheGun />} />
          <Route path="/TheGun.html" element={<TheGun />} />
          <Route path="/therod" element={<TheRod />} />
          <Route path="/TheRod.html" element={<TheRod />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
