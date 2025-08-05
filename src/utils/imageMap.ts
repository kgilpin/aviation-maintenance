// Image imports for Vite optimization - using existing assets
import logoMain from '@/assets/images/logo.svg';
import logoFavicon from '@/assets/favicons/logo.svg';
import bgDefault from '@/assets/images/bg-default.png';
import appleTouchIcon from '@/assets/favicons/apple-touch-icon.png';
import favicon16 from '@/assets/favicons/favicon-16x16.png';
import favicon32 from '@/assets/favicons/favicon-32x32.png';
import safariPinnedTab from '@/assets/favicons/safari-pinned-tab.svg';

export const imageMap: Record<string, string> = {
  '/assets/images/logo.svg': logoMain,
  '/assets/favicons/logo.svg': logoFavicon,
  '/assets/images/bg-default.png': bgDefault,
  '/assets/favicons/apple-touch-icon.png': appleTouchIcon,
  '/assets/favicons/favicon-16x16.png': favicon16,
  '/assets/favicons/favicon-32x32.png': favicon32,
  '/assets/favicons/safari-pinned-tab.svg': safariPinnedTab,
};

export const resolveImagePath = (path: string): string => {
  return imageMap[path] || path;
};

// Asset preloading for critical resources
export const preloadCriticalAssets = () => {
  const criticalAssets = [logoMain, bgDefault];
  
  criticalAssets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset;
    document.head.appendChild(link);
  });
};