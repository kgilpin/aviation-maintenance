import { useState } from 'react';
import { resolveImagePath } from '@/utils/imageMap';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  isGreen?: boolean;
}

const navigationItems: NavigationItem[] = [
  { label: 'Aura Aero', href: '/en/', isActive: false },
  { label: 'INTEGRAL', href: '/en/integral', isActive: true },
  { label: 'ERA', href: '/en/era', isActive: false },
  { label: 'A sustainable approach', href: '/en/eco-responsibility', isActive: false, isGreen: true },
  { label: 'Media', href: '/en/medias', isActive: false },
  { label: 'Join us', href: '/en/join-us', isActive: false },
  { label: 'Member area', href: 'https://support.aura-aero.com', isActive: false }
];

const languages = [
  { code: 'en', label: 'en', href: '/en/integral', isActive: true },
  { code: 'fr', label: 'fr', href: '/integral', isActive: false }
];

export function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="main-header fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="head-logo">
              <a href="/en/" className="flex items-center">
                <img
                  src={resolveImagePath('/images/logo.svg')}
                  alt="Aura Aero"
                  className="h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTIwIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIyMCIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5BdXJhIEFlcm88L3RleHQ+PC9zdmc+';
                  }}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="head-navigation hidden lg:block">
              <ul className="flex items-center space-x-8">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        item.isActive
                          ? 'text-white border-b-2 border-blue-500 pb-1'
                          : item.isGreen
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Language Switcher */}
            <div className="head-languages hidden lg:block">
              <div className="relative">
                <button
                  onClick={toggleLanguageDropdown}
                  className="flex items-center text-white text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  {languages.find(lang => lang.isActive)?.label}
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${
                      isLanguageDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 py-2 w-16 bg-black bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg">
                    {languages
                      .filter(lang => !lang.isActive)
                      .map((lang) => (
                        <a
                          key={lang.code}
                          href={lang.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          {lang.label}
                        </a>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black bg-opacity-95 backdrop-blur-sm border-t border-gray-800">
            <nav className="container mx-auto px-4 py-6">
              <ul className="space-y-4">
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`block text-base font-medium transition-colors duration-200 ${
                        item.isActive
                          ? 'text-white'
                          : item.isGreen
                          ? 'text-green-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Language Switcher */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <ul className="flex space-x-4">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <a
                        href={lang.href}
                        className={`text-sm ${
                          lang.isActive ? 'text-white font-medium' : 'text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {lang.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20" />
    </>
  );
}