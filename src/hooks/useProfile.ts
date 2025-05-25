
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWalletAuth } from './useWalletAuth';

interface Profile {
  id: string;
  wallet_address: string;
  username?: string;
  total_staked: number;
  total_rewards: number;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { walletAddress, profile } = useWalletAuth();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!walletAddress) return { error: 'No wallet connected' };

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('wallet_address', walletAddress)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }

      return { data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    updateProfile,
  };
};
