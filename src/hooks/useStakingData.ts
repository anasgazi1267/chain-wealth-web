
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useWalletAuth } from './useWalletAuth';

interface StakingPosition {
  id: string;
  wallet_address: string;
  validator_address: string;
  staked_amount: number;
  rewards_earned: number;
  apy?: number;
  is_active?: boolean;
  stake_account_address?: string;
  created_at: string;
  updated_at: string;
}

interface StakingTransaction {
  id: string;
  wallet_address: string;
  transaction_signature: string;
  transaction_type: 'stake' | 'unstake' | 'reward';
  amount: number;
  validator_address?: string;
  status: 'pending' | 'confirmed' | 'failed';
  created_at: string;
}

export const useStakingData = () => {
  const { walletAddress } = useWalletAuth();
  const [positions, setPositions] = useState<StakingPosition[]>([]);
  const [transactions, setTransactions] = useState<StakingTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      fetchStakingData();
    } else {
      setPositions([]);
      setTransactions([]);
    }
  }, [walletAddress]);

  const fetchStakingData = async () => {
    if (!walletAddress) return;

    try {
      setLoading(true);

      // Fetch staking positions
      const { data: positionsData, error: positionsError } = await supabase
        .from('staking_positions')
        .select('*')
        .eq('wallet_address', walletAddress)
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
        .eq('wallet_address', walletAddress)
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
      } else {
        const typedTransactions: StakingTransaction[] = (transactionsData || []).map(tx => ({
          ...tx,
          transaction_type: tx.transaction_type as 'stake' | 'unstake' | 'reward',
          status: tx.status as 'pending' | 'confirmed' | 'failed'
        }));
        setTransactions(typedTransactions);
      }
    } catch (error) {
      console.error('Error fetching staking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<StakingTransaction, 'id' | 'created_at' | 'wallet_address'>) => {
    if (!walletAddress) return { error: 'No wallet connected' };

    try {
      const { data, error } = await supabase
        .from('staking_transactions')
        .insert([{ ...transaction, wallet_address: walletAddress }])
        .select()
        .single();

      if (error) {
        console.error('Error adding transaction:', error);
        return { error };
      }

      const typedTransaction: StakingTransaction = {
        ...data,
        transaction_type: data.transaction_type as 'stake' | 'unstake' | 'reward',
        status: data.status as 'pending' | 'confirmed' | 'failed'
      };

      setTransactions(prev => [typedTransaction, ...prev]);
      return { data: typedTransaction };
    } catch (error) {
      console.error('Error adding transaction:', error);
      return { error };
    }
  };

  return {
    positions,
    transactions,
    loading,
    fetchStakingData,
    addTransaction,
  };
};
