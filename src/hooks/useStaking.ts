
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
  StakeProgram, 
  Authorized, 
  Lockup, 
  LAMPORTS_PER_SOL,
  SystemProgram
} from '@solana/web3.js';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useWalletAuth } from './useWalletAuth';

export const useStaking = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { walletAddress } = useWalletAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const PLATFORM_ADDRESS = new PublicKey('F3Cs6P1PHPYcAyLWKgPHD7PD3mYqzdDrNXkWiQrvnoDw');

  const stakeSOL = async (amount: number, validatorAddress?: string) => {
    if (!publicKey || !sendTransaction || !walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake SOL",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const lamports = amount * LAMPORTS_PER_SOL;
      const stakeAccount = PublicKey.unique();
      const transaction = new Transaction();
      
      transaction.add(
        StakeProgram.createAccount({
          fromPubkey: publicKey,
          stakePubkey: stakeAccount,
          authorized: new Authorized(publicKey, publicKey),
          lockup: new Lockup(0, 0, publicKey),
          lamports: lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      // Record the transaction in database
      await supabase.from('staking_transactions').insert([
        {
          wallet_address: walletAddress,
          transaction_signature: signature,
          transaction_type: 'stake',
          amount: amount,
          validator_address: validatorAddress || PLATFORM_ADDRESS.toString(),
          status: 'confirmed'
        }
      ]);

      // Update or create staking position
      await supabase.from('staking_positions').upsert([
        {
          wallet_address: walletAddress,
          validator_address: validatorAddress || PLATFORM_ADDRESS.toString(),
          staked_amount: amount,
          stake_account_address: stakeAccount.toString(),
          is_active: true
        }
      ]);
      
      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} SOL`,
      });

    } catch (error) {
      console.error('Staking error:', error);
      toast({
        title: "Staking Failed",
        description: "Failed to stake SOL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendPayment = async (amount: number, recipient?: PublicKey) => {
    if (!publicKey || !sendTransaction || !walletAddress) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const lamports = amount * LAMPORTS_PER_SOL;
      const recipientKey = recipient || PLATFORM_ADDRESS;
      
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientKey,
          lamports: lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      // Record the payment transaction
      await supabase.from('staking_transactions').insert([
        {
          wallet_address: walletAddress,
          transaction_signature: signature,
          transaction_type: 'payment',
          amount: amount,
          status: 'confirmed'
        }
      ]);
      
      toast({
        title: "Payment Successful!",
        description: `Successfully sent ${amount} SOL`,
      });

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "Failed to send payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    stakeSOL,
    sendPayment,
    loading,
    platformAddress: PLATFORM_ADDRESS.toString(),
  };
};
