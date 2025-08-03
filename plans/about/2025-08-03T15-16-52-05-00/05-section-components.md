# Section Components for About Page

## Overview

Create page-specific section components that compose the about page layout, integrating with existing section components where possible and creating new ones as needed.

## Section Components Required

### 1. AboutHeroSection Component (`src/components/sections/AboutHeroSection.tsx`)

**Purpose**: Page header with company introduction and hero image

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import type { AboutHeroContent } from '@/data/types';

interface AboutHeroSectionProps {
  hero: AboutHeroContent;
  className?: string;
}

export const AboutHeroSection: React.FC<AboutHeroSectionProps> = ({
  hero,
  className
}) => {
  return (
    <section className={cn(
      'relative py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden',
      className
    )}>
      {/* Background Image with Overlay */}
      {hero.backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage}
            alt="Yankee Aviation facility"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-700/80" />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {hero.primaryHeading}
          </h1>
          
          {hero.secondaryHeading && (
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-blue-100">
              {hero.secondaryHeading}
            </h2>
          )}
          
          <p className="text-lg md:text-xl leading-relaxed text-blue-50 max-w-3xl mx-auto">
            {hero.description}
          </p>

          {hero.callToAction && (
            <div className="mt-10">
              <a
                href={hero.callToAction.link}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transition-colors duration-300"
              >
                {hero.callToAction.text}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default AboutHeroSection;
```

### 2. CompanyHistorySection Component (`src/components/sections/CompanyHistorySection.tsx`)

**Purpose**: Company background, timeline, and key achievements

```typescript
import React from 'react';
import { cn } from '@/utils/cn';
import type { CompanyHistoryContent } from '@/data/types';

interface CompanyHistorySectionProps {
  history: CompanyHistoryContent;
  className?: string;
}

export const CompanyHistorySection: React.FC<CompanyHistorySectionProps> = ({
  history,
  className
}) => {
  return (
    <section className={cn('py-20 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {history.heading}
            </h2>
            
            {/* Description paragraphs */}
            <div className="space-y-6 mb-8">
              {history.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            {history.highlights && history.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Highlights
                </h3>
                <ul className="space-y-3">
                  {history.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timeline */}
            {history.timeline && history.timeline.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Company Timeline
                </h3>
                <div className="space-y-4">
                  {history.timeline.map((event, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {event.year}
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-gray-700 font-medium">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image */}
          {history.image && (
            <div className="order-first lg:order-last">
              <img
                src={history.image}
                alt={history.imageAlt || 'Company history image'}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistorySection;
```

### 3. TeamSection Component (`src/components/sections/TeamSection.tsx`)

**Purpose**: Team member grid with cards and management

```typescript
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
```

### 4. Enhanced AboutSection Component (Update Existing)

**Purpose**: Update existing AboutSection to work with new data structure

```typescript
// Update to src/components/sections/AboutSection.tsx
import React from 'react';
import { cn } from '@/utils/cn';
import type { AboutContent, Company } from '@/data/types';

interface AboutSectionProps {
  about?: AboutContent;
  company: Company;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  company,
  className
}) => {
  // Use about data if provided, otherwise fall back to company data
  const content = about || {
    heading: "WHO WE ARE",
    description: [company.description],
    highlights: company.specialties,
    image: "/images/about.jpg",
    imageAlt: "Yankee Aviation team and facility"
  };

  return (
    <section className={cn('py-20 bg-blue-900 text-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          {content.heading}
        </h2>

        <div className="max-w-4xl mx-auto">
          {content.description.map((paragraph, index) => (
            <p key={index} className="text-xl md:text-2xl leading-relaxed text-blue-100 mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {content.highlights && content.highlights.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.highlights.map((highlight, index) => (
              <div key={index} className="bg-blue-800/50 p-4 rounded-lg">
                <p className="text-blue-100">{highlight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
```

## Implementation Notes

### Component Architecture

- **Reusable Design**: Components accept props for flexible usage
- **Responsive Layout**: Mobile-first design with adaptive layouts
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Performance**: Optimized rendering and lazy loading

### Layout Options

- **Grid Layout**: Traditional card grid for team members
- **Alternating Layout**: Alternating left/right image placement for visual variety
- **Flexible Sizing**: Components adapt to available space and content

### Integration Points

- **Existing Components**: Leverages Button and other UI components
- **Data Hooks**: Works with custom hooks for data access
- **Styling System**: Uses Tailwind classes and cn utility
- **Type Safety**: Full TypeScript support with proper interfaces

## Files to Create/Modify

- `src/components/sections/AboutHeroSection.tsx` - New page hero section
- `src/components/sections/CompanyHistorySection.tsx` - New company history section  
- `src/components/sections/TeamSection.tsx` - New team members section
- `src/components/sections/AboutSection.tsx` - Update existing component

## Usage in About Page

```typescript
import { AboutHeroSection } from '@/components/sections/AboutHeroSection';
import { CompanyHistorySection } from '@/components/sections/CompanyHistorySection';
import { TeamSection } from '@/components/sections/TeamSection';

export const AboutPage: React.FC = () => {
  const { hero, companyHistory } = useAboutData();
  const { data: teamData } = useTeamData();

  return (
    <Layout>
      <AboutHeroSection hero={hero} />
      <CompanyHistorySection history={companyHistory} />
      <TeamSection teamData={teamData} layout="alternating" />
    </Layout>
  );
};
```

## Responsive Design Considerations

- **Mobile First**: Base styles target mobile devices
- **Breakpoints**: Uses standard Tailwind breakpoints (sm, md, lg, xl)
- **Flexible Layouts**: Grid layouts collapse to single column on mobile
- **Image Optimization**: Responsive images with appropriate sizing
- **Touch Interactions**: Proper touch targets and hover states