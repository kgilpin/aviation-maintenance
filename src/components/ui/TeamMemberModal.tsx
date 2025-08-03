import React, { useEffect } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import type { TeamMember } from '@/data/types';

interface TeamMemberModalProps {
  member: TeamMember;
  onClose: () => void;
  className?: string;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
  className
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={cn(
        'bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto',
        className
      )}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
            <p className="text-blue-600 font-semibold">{member.role}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image and Basic Info */}
            <div className="lg:col-span-1">
              <img
                src={member.image}
                alt={member.imageAlt}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              {member.yearsWithCompany && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Experience</h4>
                  <p className="text-blue-800">
                    {member.yearsWithCompany}+ years with Yankee Aviation
                  </p>
                </div>
              )}

              {member.currentAircraft && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Current Aircraft</h4>
                  <p className="text-green-800">{member.currentAircraft}</p>
                </div>
              )}
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2">
              {/* Full Biography */}
              {member.fullBio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
                  <p className="text-gray-700 leading-relaxed">{member.fullBio}</p>
                </div>
              )}

              {/* Achievements */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">🏆</span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Credentials */}
              {member.credentials && member.credentials.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Credentials</h3>
                  <ul className="space-y-2">
                    {member.credentials.map((credential, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">📋</span>
                        <span className="text-gray-700">{credential}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              {member.education && member.education.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                  <ul className="space-y-2">
                    {member.education.map((education, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">🎓</span>
                        <span className="text-gray-700">{education}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Interests */}
              {member.personalInterests && member.personalInterests.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.personalInterests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;