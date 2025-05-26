
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  wallet_address: string;
  username?: string;
  total_staked: number;
  total_rewards: number;
  referral_count: number;
  referral_earnings: number;
  created_at: string;
  updated_at: string;
}

export const useWalletAuth = () => {
  const { publicKey, connected } = useWallet();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      createOrGetProfile(publicKey.toString());
    } else if (!connected) {
      setProfile(null);
    }
  }, [connected, publicKey]);

  const createOrGetProfile = async (walletAddress: string) => {
    try {
      setLoading(true);
      
      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      if (existingProfile) {
        setProfile(existingProfile);
      } else {
        // Create new profile
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert([
            {
              wallet_address: walletAddress,
              username: `User_${walletAddress.slice(0, 8)}`,
              total_staked: 0,
              total_rewards: 0,
              referral_count: 0,
              referral_earnings: 0,
            }
          ])
          .select()
          .single();

        if (error) {
          console.error('Error creating profile:', error);
        } else {
          setProfile(newProfile);
        }
      }
    } catch (error) {
      console.error('Error in createOrGetProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!publicKey) return { error: 'No wallet connected' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('wallet_address', publicKey.toString())
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        return { error };
      }

      setProfile(data);
      return { data };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  return {
    profile,
    loading,
    isAuthenticated: connected && !!profile,
    walletAddress: publicKey?.toString(),
    updateProfile,
  };
};
