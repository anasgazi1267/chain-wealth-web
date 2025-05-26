
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from "lucide-react";
import { useWalletAuth } from '@/hooks/useWalletAuth';

const WalletConnect = () => {
  const { connected, connecting, publicKey } = useWallet();
  const { loading } = useWalletAuth();

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-purple-200 hidden md:block">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
        <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 !text-white !px-4 !py-2 !rounded-lg !text-sm" />
      </div>
    );
  }

  return (
    <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700 !text-white !px-6 !py-2 !rounded-lg !transition-all !duration-300 !transform hover:!scale-105">
      <Wallet className="h-4 w-4 mr-2" />
      {connecting || loading ? 'Connecting...' : 'Connect Wallet'}
    </WalletMultiButton>
  );
};

export default WalletConnect;
