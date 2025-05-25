
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface StakingPosition {
  id: string;
  validator_address: string;
  staked_amount: number;
  rewards_earned: number;
  apy: number;
  stake_account_address?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface StakingTransaction {
  id: string;
  transaction_signature: string;
  amount: number;
  transaction_type: 'stake' | 'unstake' | 'reward';
  validator_address?: string;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export const useStakingData = () => {
  const { user } = useAuth();
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [transactions, setTransactions] = useState<StakingTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPositions([]);
      setTransactions([]);
      setLoading(false);
      return;
    }

    const fetchStakingData = async () => {
      try {
        // Fetch staking positions
        const { data: positionsData, error: positionsError } = await supabase
          .from('staking_positions')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_active', true);

        if (positionsError) {
          console.error('Error fetching positions:', positionsError);
        } else {
          setPositions(positionsData || []);
        }

        // Fetch recent transactions
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('staking_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (transactionsError) {
          console.error('Error fetching transactions:', transactionsError);
        } else {
          setTransactions(transactionsData || []);
        }
      } catch (error) {
        console.error('Error fetching staking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStakingData();
  }, [user]);

  const addTransaction = async (transaction: Omit<StakingTransaction, 'id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('staking_transactions')
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error adding transaction:', error);
        return { error };
      }

      setTransactions(prev => [data, ...prev]);
      return { data };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { error };
    }
  };

  return {
    positions,
    transactions,
    loading,
    addTransaction,
  };
};
