# UI Components for Team Members

## Overview

Create reusable UI components for displaying team member information, following the established component architecture and design system.

## New UI Components Required

### 1. TeamMemberCard Component (`src/components/ui/TeamMemberCard.tsx`)

```typescript
import React, { useState } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/Button';
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
```

### 2. TeamMemberModal Component (`src/components/ui/TeamMemberModal.tsx`)

```typescript
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
```

## Implementation Notes

### Design Principles

- **Responsive Design**: Cards adapt to different screen sizes
- **Accessibility**: Proper ARIA labels, keyboard navigation, focus management
- **Performance**: Lazy loading images, efficient modal handling
- **Consistency**: Follows existing design system and component patterns

### Component Features

- **Multiple Layouts**: Standard, compact, and detailed layouts for different contexts
- **Interactive Elements**: Hover effects, expandable content, modal dialogs
- **Rich Content**: Support for credentials, achievements, specialties, and personal details
- **Visual Hierarchy**: Clear information organization with proper typography

### Modal Functionality

- **Background Scroll Lock**: Prevents scrolling when modal is open
- **Keyboard Navigation**: Escape key to close, proper focus management
- **Responsive Design**: Works on all screen sizes
- **Rich Content Display**: Comprehensive biographical information

## Files to Create

- `src/components/ui/TeamMemberCard.tsx` - Main team member card component
- `src/components/ui/TeamMemberModal.tsx` - Modal for detailed member information

## Usage Examples

### Basic Team Member Card

```typescript
import { TeamMemberCard } from '@/components/ui/TeamMemberCard';

<TeamMemberCard 
  member={teamMember} 
  layout="standard"
  showModal={true}
/>
```

### Compact Layout for Sidebar

```typescript
<TeamMemberCard 
  member={teamMember} 
  layout="compact"
  showModal={false}
  className="max-w-xs"
/>
```

## Accessibility Features

- Proper alt text for images
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus management in modals
- Screen reader friendly content structure
- Sufficient color contrast ratios

## Performance Considerations

- Lazy loading for images
- Efficient modal state management
- Minimal re-renders
- Optimized bundle size with proper imports