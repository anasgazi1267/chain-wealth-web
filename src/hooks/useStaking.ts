
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  PublicKey, 
  Transaction, 
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

  // Your wallet address where all staked SOL will be sent
  const PLATFORM_ADDRESS = new PublicKey('F3Cs6P1PHPYcAyLWKgPHD7PD3mYqzdDrNXkWiQrvnoDw');

  const processReferral = async (walletAddress: string) => {
    const referralCode = localStorage.getItem('referralCode');
    if (referralCode && referralCode !== walletAddress) {
      try {
        // Check if this is user's first stake
        const { data: existingStakes } = await supabase
          .from('staking_transactions')
          .select('*')
          .eq('wallet_address', walletAddress)
          .eq('transaction_type', 'stake');

        if (!existingStakes || existingStakes.length === 0) {
          // This is first stake, process referral
          const referralAmount = 0.005;

          // Update referrer's stats
          const { data: referrer } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', referralCode)
            .single();

          if (referrer) {
            await supabase
              .from('profiles')
              .update({
                referral_count: referrer.referral_count + 1,
                referral_earnings: referrer.referral_earnings + referralAmount,
                updated_at: new Date().toISOString()
              })
              .eq('wallet_address', referralCode);

            // Clear referral code
            localStorage.removeItem('referralCode');

            toast({
              title: "Referral Bonus Applied!",
              description: `Referrer earned ${referralAmount} SOL bonus`,
            });
          }
        }
      } catch (error) {
        console.error('Error processing referral:', error);
      }
    }
  };

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
      
      // Create transaction to send SOL to your platform wallet
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: PLATFORM_ADDRESS,
          lamports: lamports,
        })
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      // Process referral if applicable
      await processReferral(walletAddress);

      // Record the staking transaction in database
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

      // Create or update staking position
      const { data: existingPosition } = await supabase
        .from('staking_positions')
        .select('*')
        .eq('wallet_address', walletAddress)
        .eq('validator_address', validatorAddress || PLATFORM_ADDRESS.toString())
        .maybeSingle();

      if (existingPosition) {
        // Update existing position
        await supabase
          .from('staking_positions')
          .update({
            staked_amount: existingPosition.staked_amount + amount,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingPosition.id);
      } else {
        // Create new position
        await supabase.from('staking_positions').insert([
          {
            wallet_address: walletAddress,
            validator_address: validatorAddress || PLATFORM_ADDRESS.toString(),
            staked_amount: amount,
            stake_account_address: signature,
            is_active: true
          }
        ]);
      }

      // Update user's total staked amount in profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_staked')
        .eq('wallet_address', walletAddress)
        .maybeSingle();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            total_staked: profile.total_staked + amount,
            updated_at: new Date().toISOString()
          })
          .eq('wallet_address', walletAddress);
      }
      
      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} SOL. Transaction: ${signature.slice(0, 8)}...`,
      });

      return signature;

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
