import { useState, useEffect } from 'react';
import type { TeamSection, TeamMember } from '@/data/types';
import teamData from '@/data/team.json';

export const useTeamData = () => {
  const [data, setData] = useState<TeamSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        setLoading(true);
        // Use the imported JSON data
        setData(teamData as TeamSection);
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