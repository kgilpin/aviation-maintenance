import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactUsPage } from "@/pages/ContactUsPage";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/en/contact-us" element={<ContactUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <a
                    href="/en/contact-us"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
