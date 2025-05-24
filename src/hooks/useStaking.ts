
import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, StakeProgram, Authorized, Lockup, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useToast } from '@/hooks/use-toast';

export const useStaking = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Your receiving address
  const PLATFORM_ADDRESS = new PublicKey('F3Cs6P1PHPYcAyLWKgPHD7PD3mYqzdDrNXkWiQrvnoDw');

  const stakeSOL = async (amount: number) => {
    if (!publicKey || !sendTransaction) {
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
      
      // Create a stake account
      const stakeAccount = PublicKey.unique();
      
      // Create stake account transaction
      const transaction = new Transaction();
      
      // Add create stake account instruction
      transaction.add(
        StakeProgram.createAccount({
          fromPubkey: publicKey,
          stakePubkey: stakeAccount,
          authorized: new Authorized(publicKey, publicKey),
          lockup: new Lockup(0, 0, publicKey),
          lamports: lamports,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      
      toast({
        title: "Staking Successful!",
        description: `Successfully staked ${amount} SOL`,
      });

      console.log('Stake transaction signature:', signature);
      
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
    if (!publicKey || !sendTransaction) {
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
      
      // Create transfer transaction
      const transaction = new Transaction();
      transaction.add(
        StakeProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientKey,
          lamports: lamports,
        })
      );

      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');
      
      toast({
        title: "Payment Successful!",
        description: `Successfully sent ${amount} SOL`,
      });

      console.log('Payment transaction signature:', signature);
      
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
