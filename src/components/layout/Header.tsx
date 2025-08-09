import { useClubData } from '@/hooks/useClubData';
import { resolveImagePath } from '@/utils/imageResolver';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { clubData } = useClubData();

  if (!clubData) return null;

  const logoSrc = resolveImagePath(clubData.logo);

  return (
    <header className="lg:hidden bg-teal-300 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img src={logoSrc} alt="Club Logo" className="w-8 h-8" />
        <h1 className="text-sm font-bold font-sans">{clubData.name}</h1>
      </div>
      <button
        onClick={onMenuToggle}
        className="text-black hover:text-gray-600 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <div className={`w-5 h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-5 h-0.5 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : 'mt-1'}`}></div>
          <div className={`w-5 h-0.5 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'mt-1'}`}></div>
        </div>
      </button>
    </header>
  );
}