# Custom Hooks for Data Access

## Overview

Create custom React hooks to provide type-safe access to about page and team data, following the established pattern of data access hooks in the project.

## New Hooks Required

### 1. useAboutData Hook (`src/hooks/useAboutData.ts`)

```typescript
import { useState, useEffect } from 'react';
import type { AboutPageData } from '@/data/types';

export const useAboutData = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        setLoading(true);
        // Import the JSON data
        const aboutData = await import('@/data/about.json');
        setData(aboutData.default);
        setError(null);
      } catch (err) {
        setError('Failed to load about page data');
        console.error('Error loading about data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  return {
    data,
    loading,
    error,
    hero: data?.hero || null,
    companyHistory: data?.companyHistory || null,
    seoMeta: data?.seoMeta || null
  };
};

export default useAboutData;
```

### 2. useTeamData Hook (`src/hooks/useTeamData.ts`)

```typescript
import { useState, useEffect } from 'react';
import type { TeamSection, TeamMember } from '@/data/types';

export const useTeamData = () => {
  const [data, setData] = useState<TeamSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        // Import the JSON data
        const teamData = await import('@/data/team.json');
        setData(teamData.default);
        setError(null);
      } catch (err) {
        setError('Failed to load team data');
        console.error('Error loading team data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, []);

  // Helper function to get a team member by ID
  const getTeamMember = (id: string): TeamMember | null => {
    return data?.members.find(member => member.id === id) || null;
  };

  // Helper function to get team members by role
  const getTeamMembersByRole = (role: string): TeamMember[] => {
    return data?.members.filter(member => 
      member.role.toLowerCase().includes(role.toLowerCase())
    ) || [];
  };

  // Helper function to get senior team members (by years of service)
  const getSeniorTeamMembers = (minYears: number = 10): TeamMember[] => {
    return data?.members.filter(member => 
      member.yearsWithCompany && member.yearsWithCompany >= minYears
    ) || [];
  };

  return {
    data,
    loading,
    error,
    members: data?.members || [],
    heading: data?.heading || '',
    subheading: data?.subheading || '',
    description: data?.description || '',
    // Helper functions
    getTeamMember,
    getTeamMembersByRole,
    getSeniorTeamMembers
  };
};

export default useTeamData;
```

## Implementation Notes

### Design Patterns

- **Consistent Error Handling**: All hooks follow the same pattern for loading states and error handling
- **Helper Functions**: Utility functions for common team data queries
- **Type Safety**: Full TypeScript support with proper typing
- **Performance**: Efficient data loading with proper dependency arrays

### Loading States

- **Loading**: Boolean flag for initial data fetch
- **Error**: String message for error states
- **Data**: Typed data objects or null for empty states

### Helper Functions

- **getTeamMember**: Find individual team member by unique ID
- **getTeamMembersByRole**: Filter team members by role/position
- **getSeniorTeamMembers**: Filter by years of service for highlighting experience

## Files to Create

- `src/hooks/useAboutData.ts` - About page data access hook
- `src/hooks/useTeamData.ts` - Team data access hook with utilities

## Usage Examples

### In About Page Component

```typescript
import { useAboutData } from '@/hooks/useAboutData';
import { useTeamData } from '@/hooks/useTeamData';

export const AboutPage: React.FC = () => {
  const { hero, companyHistory, loading: aboutLoading } = useAboutData();
  const { members, loading: teamLoading } = useTeamData();

  if (aboutLoading || teamLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      {hero && <AboutHeroSection hero={hero} />}
      {companyHistory && <CompanyHistorySection history={companyHistory} />}
      {members.length > 0 && <TeamSection members={members} />}
    </Layout>
  );
};
```

### In Team Member Component

```typescript
import { useTeamData } from '@/hooks/useTeamData';

export const TeamMemberDetail: React.FC<{ memberId: string }> = ({ memberId }) => {
  const { getTeamMember, loading } = useTeamData();
  const member = getTeamMember(memberId);

  if (loading) return <div>Loading...</div>;
  if (!member) return <div>Team member not found</div>;

  return <TeamMemberCard member={member} />;
};
```

## Error Handling

- Graceful degradation when data fails to load
- Console logging for debugging purposes
- User-friendly error messages
- Fallback to empty states rather than crashes

## Performance Considerations

- Data is loaded once per hook instance
- JSON imports are cached by the bundler
- Helper functions are memoized within the hook
- No unnecessary re-renders or data fetching