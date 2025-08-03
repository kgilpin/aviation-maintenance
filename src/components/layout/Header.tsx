import React from "react";
import { Navigation } from "./Navigation";

export const Header: React.FC = () => {
  return (
    <header className="site-header bg-white" role="banner">
      {/* Top Section with Airport Info, Company Name, and Header Images */}
      <div className="header-top py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Grid Layout matching original design */}
          <div className="header-grid grid grid-cols-3 items-center gap-8">
            {/* Left: Airport Location Info */}
            <div className="header-location text-center">
              <h2
                className="text-lg font-bold text-gray-800 tracking-wider uppercase"
                style={{ fontFamily: "open sans condensed, sans-serif", letterSpacing: "0.15em" }}
              >
                Lawrence Municipal Airport
              </h2>
              <p
                className="text-lg text-gray-700 tracking-wider uppercase mt-1"
                style={{ fontFamily: "open sans condensed, sans-serif", letterSpacing: "0.15em" }}
              >
                North Andover, Massachusetts
              </p>
            </div>

            {/* Center: Company Name */}
            <div className="header-company text-center">
              <h1
                className="text-4xl text-gray-800 mb-4"
                style={{ fontFamily: "belinda-w00-regular, script, cursive" }}
              >
                <a href="/" className="hover:opacity-80 transition-opacity">
                  Falcon Air Inc.
                </a>
              </h1>

              {/* Main Navigation */}
              <Navigation />
            </div>

            {/* Right: Header Images */}
            <div className="header-images flex flex-col items-center gap-4">
              {/* Calendar Image */}
              <div className="calendar-image">
                <img
                  src="/images/calendar-aviation.jpg"
                  alt="Aviation calendar"
                  className="w-32 h-24 object-cover rounded shadow-sm"
                  loading="eager"
                />
              </div>

              {/* Corporate Aircraft Association Logo */}
              <div className="partner-logo">
                <a
                  href="https://www.corpaa.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/partners/corpaa-logo.jpg"
                    alt="Corporate Aircraft Association"
                    className="w-28 h-18 object-contain"
                    loading="eager"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
