import { useClubData } from '@/hooks/useClubData';
import { useNavigationData } from '@/hooks/useNavigationData';
import { useMediaData } from '@/hooks/useMediaData';
import { resolveImagePath } from '@/utils/imageResolver';
import { ExternalLink } from '@/components/ui/ExternalLink';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { clubData } = useClubData();
  const { navigationData } = useNavigationData();
  const mediaData = useMediaData();

  if (!clubData || !navigationData) return null;

  const logoSrc = resolveImagePath(clubData.logo);
  const newIconSrc = mediaData?.media.images.newIndicator?.path ? resolveImagePath(mediaData.media.images.newIndicator.path) : '';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-1/5 
        bg-teal-300 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4">
          {/* Club Logo and Info */}
          <div className="text-center mb-6">
            <img 
              src={logoSrc} 
              alt="Club Logo" 
              className="w-24 h-24 mx-auto mb-4"
            />
            <div className="text-sm font-sans font-bold space-y-1">
              <div>{clubData.name}</div>
              <div className="whitespace-pre-line text-xs">{clubData.address}</div>
              <div>{clubData.phone}</div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigationData.mainNavigation.map((item, index) => (
              <div key={index} className="block">
                {item.external ? (
                  <ExternalLink
                    href={item.href}
                    target={item.target || '_blank'}
                    className="text-black hover:text-gray-600 text-sm block py-1"
                  >
                    <div className="flex items-center">
                      {item.label}
                      {item.newIndicator && newIconSrc && (
                        <img src={newIconSrc} alt="new" className="ml-1 w-8 h-4" />
                      )}
                    </div>
                  </ExternalLink>
                ) : (
                  <a
                    href={item.href}
                    target={item.target}
                    className="text-black hover:text-gray-600 text-sm block py-1"
                  >
                    <div className="flex items-center">
                      {item.label}
                      {item.newIndicator && newIconSrc && (
                        <img src={newIconSrc} alt="new" className="ml-1 w-8 h-4" />
                      )}
                    </div>
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Additional section */}
          <div className="mt-6 pt-4 border-t border-teal-400">
            <p className="text-sm font-bold mb-2">Shooters Shop Talk</p>
          </div>
        </div>
      </aside>
    </>
  );
}