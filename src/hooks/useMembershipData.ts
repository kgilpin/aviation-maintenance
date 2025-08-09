import { useState, useEffect } from 'react';
import type { MembershipData } from '@/data/types';

export function useMembershipData() {
  const [membershipData, setMembershipData] = useState<MembershipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembershipData = async () => {
      try {
        const response = await import('@/data/membership.json');
        setMembershipData(response.default);
      } catch (err) {
        setError('Failed to load membership data');
        console.error('Error loading membership data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMembershipData();
  }, []);

  return { membershipData, loading, error };
}