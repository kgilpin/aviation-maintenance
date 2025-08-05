import { resolveImagePath } from '@/utils/imageMap';

interface ContactSectionProps {
  icon: string;
  message: string;
  link: string;
}

export function ContactSection({ icon, message, link }: ContactSectionProps): JSX.Element {
  return (
    <div className="text-center">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-gray-600 transition-all duration-300">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center bg-blue-600 rounded-full">
              <img
                src={resolveImagePath(icon)}
                alt="Contact icon"
                className="w-8 h-8"
                onError={(e) => {
                  // Fallback to envelope icon if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgOEMyLjg5NSA4IDIgOC44OTUgMiAxMFYyMkMyIDIzLjEwNSAyLjg5NSAyNCA0IDI0SDI4QzI5LjEwNSAyNCAzMCAyMy4xMDUgMzAgMjJWMTBDMzAgOC44OTUgMjkuMTA1IDggMjggOEg0Wk00IDEwSDI4VjIySDRWMTBaTTEwLjIxIDEzLjM3NUwxNiAxOC4zNDJMMjEuNzggMTMuMzc1TDIzIDEyTDE2IDIwTDkgMTJMMTAuMjEgMTMuMzc1WiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>

          {/* Message */}
          <h2 className="text-2xl font-semibold text-white mb-6">
            {message}
          </h2>

          {/* Contact Button */}
          <a
            href={link}
            className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Get in Touch
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}