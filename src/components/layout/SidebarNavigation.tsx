import { useState, useEffect } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  target: string;
}

interface SidebarNavigationProps {
  navigationItems: NavigationItem[];
  activeSection?: string;
  className?: string;
}

export function SidebarNavigation({ 
  navigationItems, 
  activeSection, 
  className = '' 
}: SidebarNavigationProps): JSX.Element {
  const [currentActiveSection, setCurrentActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.querySelector(item.target)
      })).filter(section => section.element);

      let active = '';
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = section.element as HTMLElement;
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          active = section.id;
          break;
        }
      }

      setCurrentActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const handleNavClick = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const finalActiveSection = activeSection || currentActiveSection;

  return (
    <nav className={`space-y-4 ${className}`}>
      {navigationItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.target)}
          className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            finalActiveSection === item.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
          aria-current={finalActiveSection === item.id ? 'page' : undefined}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}