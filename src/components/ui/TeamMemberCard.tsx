import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
import { TeamMemberModal } from '@/components/ui/TeamMemberModal';
import type { TeamMember } from '@/data/types';

interface TeamMemberCardProps {
  member: TeamMember;
  layout?: 'standard' | 'compact' | 'detailed';
  showModal?: boolean;
  className?: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  layout = 'standard',
  showModal = true,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    if (showModal && member.fullBio) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <div className={cn(
        'bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105',
        layout === 'compact' && 'max-w-sm',
        layout === 'detailed' && 'max-w-2xl',
        className
      )}>
        {/* Image */}
        <div className="relative">
          <img
            src={member.image}
            alt={member.imageAlt}
            className={cn(
              'w-full object-cover',
              layout === 'compact' ? 'h-48' : 'h-64'
            )}
            loading="lazy"
          />
          {member.achievements && member.achievements.length > 0 && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              Award Winner
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {member.name}
          </h3>
          
          <p className="text-blue-600 font-semibold mb-3">
            {member.role}
          </p>

          {member.yearsWithCompany && (
            <p className="text-sm text-gray-600 mb-3">
              {member.yearsWithCompany}+ years with Yankee Aviation
            </p>
          )}

          <p className="text-gray-700 mb-4 leading-relaxed">
            {member.shortBio}
          </p>

          {/* Credentials */}
          {member.credentials && member.credentials.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Credentials</h4>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                {member.credentials.slice(0, 3).map((credential, index) => (
                  <li key={index}>{credential}</li>
                ))}
                {member.credentials.length > 3 && (
                  <li className="text-blue-600">+ {member.credentials.length - 3} more</li>
                )}
              </ul>
            </div>
          )}

          {/* Specialties */}
          {member.specialties && member.specialties.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {member.specialties.slice(0, 4).map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
                {member.specialties.length > 4 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    +{member.specialties.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Read More Button */}
          {showModal && member.fullBio && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReadMore}
              className="w-full"
            >
              Read Full Biography
            </Button>
          )}
        </div>
      </div>

      {/* Modal for Full Biography */}
      {isExpanded && member.fullBio && (
        <TeamMemberModal
          member={member}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default TeamMemberCard;