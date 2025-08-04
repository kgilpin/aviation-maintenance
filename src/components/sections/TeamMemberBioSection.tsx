import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { resolveImagePath } from '@/utils/imageMap';
import type { TeamMember } from '@/data/types';

interface TeamMemberBioSectionProps {
  member: TeamMember;
  imagePosition?: 'left' | 'right';
  showReadMore?: boolean;
  className?: string;
}

export const TeamMemberBioSection: React.FC<TeamMemberBioSectionProps> = ({
  member,
  imagePosition = 'left',
  showReadMore = false,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className={cn('py-8 lg:py-12 bg-white', className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start',
          imagePosition === 'right' && 'lg:grid-flow-col-dense'
        )}>
          
          {/* Image */}
          <div className={cn(
            'relative',
            imagePosition === 'right' && 'lg:col-start-2'
          )}>
            <img
              src={resolveImagePath(member.image)}
              alt={member.imageAlt}
              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className={cn(
            'space-y-6',
            imagePosition === 'right' && 'lg:col-start-1'
          )}>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 uppercase tracking-wide mb-2 font-heading">
                {member.name}
              </h2>
              
              <h3 className="text-base font-medium text-gray-700 mb-6 font-body">
                {member.role}
              </h3>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed font-body">
              {/* Render shortBio with proper line breaks */}
              {member.shortBio.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-sm lg:text-base">{paragraph}</p>
                )
              ))}
              
              {/* Extended bio content for Read More functionality */}
              {isExpanded && member.fullBio && (
                <div className="mt-4 space-y-4">
                  {member.fullBio.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="text-sm lg:text-base">{paragraph}</p>
                    )
                  ))}
                </div>
              )}
            </div>


            {showReadMore && member.fullBio && (
              <div className="mt-6">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-body"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMemberBioSection;