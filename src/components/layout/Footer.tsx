import { resolveImagePath } from '@/utils/imageMap';

const partnerLogos = [
  { name: 'French Fab', logo: '/images/partners/french-fab.png' },
  { name: 'BPI France', logo: '/images/partners/logo-bpi-france.jpg' },
  { name: 'France Relance', logo: '/images/partners/logo-france-relance.jpg' },
  { name: 'Occitanie', logo: '/images/partners/logo-occitanie.jpg' },
  { name: 'EASA', logo: '/images/partners/easa.png' },
  { name: 'OSAC', logo: '/images/partners/osac.png' },
  { name: 'ERA', logo: '/images/partners/era.png' }
];

const footerLinks = [
  { label: 'Legal notices', href: '/en/mentions' },
  { label: 'Privacy policy', href: '/en/privacy-policy' },
  { label: 'Cookie policy', href: '/en/cookie-policy' },
  { label: 'Accessibility', href: '/en/accessibility' }
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/aura-aero/', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://x.com/aero_aura', icon: 'twitter' },
  { name: 'Facebook', href: 'https://www.facebook.com/auraaero/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/aura_aero/', icon: 'instagram' }
];

export function Footer(): JSX.Element {
  return (
    <footer className="bg-black text-white">
      {/* Partner Logos Section */}
      <div className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-12">
                <img
                  src={resolveImagePath(partner.logo)}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-xs text-gray-500 px-2';
                    fallback.textContent = partner.name;
                    target.parentElement!.appendChild(fallback);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright and Company Info */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Aura Aero. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                AURA AERO - Aerospace manufacturer committed to sustainable aviation
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label={social.name}
                >
                  {social.icon === 'linkedin' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {social.icon === 'facebook' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}