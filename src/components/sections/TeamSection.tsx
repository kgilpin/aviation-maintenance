import React from 'react';
import { cn } from '@/utils/cn';
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';
import type { TeamSection as TeamSectionData } from '@/data/types';

interface TeamSectionProps {
  teamData: TeamSectionData;
  layout?: 'grid' | 'alternating';
  className?: string;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  teamData,
  layout = 'grid',
  className
}) => {
  return (
    <section className={cn('py-20 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {teamData.heading}
          </h2>
          
          {teamData.subheading && (
            <h3 className="text-xl text-blue-600 font-semibold mb-6">
              {teamData.subheading}
            </h3>
          )}
          
          {teamData.description && (
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {teamData.description}
            </p>
          )}
        </div>

        {/* Team Members Grid */}
        {layout === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.members.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                layout="standard"
                showModal={true}
              />
            ))}
          </div>
        ) : (
          /* Alternating Layout */
          <div className="space-y-16">
            {teamData.members.map((member, index) => (
              <div
                key={member.id}
                className={cn(
                  'flex flex-col lg:flex-row items-center gap-8',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}
              >
                {/* Image */}
                <div className="flex-shrink-0 lg:w-1/3">
                  <img
                    src={member.image}
                    alt={member.imageAlt}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 lg:w-2/3">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-blue-600 font-semibold mb-4">
                      {member.role}
                    </p>

                    {member.yearsWithCompany && (
                      <p className="text-sm text-gray-600 mb-4">
                        {member.yearsWithCompany}+ years with Yankee Aviation
                      </p>
                    )}

                    <p className="text-gray-700 leading-relaxed mb-6">
                      {member.shortBio}
                    </p>

                    {/* Key Credentials */}
                    {member.credentials && member.credentials.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Credentials</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {member.credentials.slice(0, 3).map((credential, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {credential}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Achievements Badge */}
                    {member.achievements && member.achievements.length > 0 && (
                      <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        <span className="mr-1">🏆</span>
                        Award Winner
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;