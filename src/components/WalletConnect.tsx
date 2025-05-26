
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, Smartphone, Globe } from "lucide-react";
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

const WalletConnect = () => {
  const { connected, connecting, publicKey, wallet, select, wallets } = useWallet();
  const { loading } = useWalletAuth();

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-purple-200 hidden md:flex">
          {wallet?.adapter.icon && (
            <img 
              src={wallet.adapter.icon} 
              alt={wallet.adapter.name}
              className="w-5 h-5"
            />
          )}
          <span className="text-sm">
            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </span>
        </div>
        <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 !text-white !px-4 !py-2 !rounded-lg !text-sm" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105">
          <Wallet className="h-4 w-4 mr-2" />
          {connecting || loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white/95 backdrop-blur-lg border-purple-300/30">
        <div className="p-2">
          <p className="text-sm font-medium text-gray-700 mb-2">Choose a wallet</p>
        </div>
        <DropdownMenuSeparator />
        
        {/* Desktop Wallets */}
        <div className="p-2">
          <p className="text-xs text-gray-500 mb-2 flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            Desktop Wallets
          </p>
          
          {wallets
            .filter(wallet => 
              wallet.adapter.name === 'Phantom' || 
              wallet.adapter.name === 'Solflare' ||
              wallet.adapter.name === 'Glow'
            )
            .map((wallet) => (
              <DropdownMenuItem
                key={wallet.adapter.name}
                onClick={() => select(wallet.adapter.name)}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50"
              >
                <img 
                  src={wallet.adapter.icon} 
                  alt={wallet.adapter.name}
                  className="w-6 h-6"
                />
                <span className="font-medium">{wallet.adapter.name}</span>
              </DropdownMenuItem>
            ))
          }
        </div>

        <DropdownMenuSeparator />
        
        {/* Mobile/Web Wallets */}
        <div className="p-2">
          <p className="text-xs text-gray-500 mb-2 flex items-center">
            <Smartphone className="h-3 w-3 mr-1" />
            Mobile & Web Wallets
          </p>
          
          {wallets
            .filter(wallet => 
              wallet.adapter.name === 'Torus' ||
              wallet.adapter.name === 'Slope'
            )
            .map((wallet) => (
              <DropdownMenuItem
                key={wallet.adapter.name}
                onClick={() => select(wallet.adapter.name)}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50"
              >
                <img 
                  src={wallet.adapter.icon} 
                  alt={wallet.adapter.name}
                  className="w-6 h-6"
                />
                <span className="font-medium">{wallet.adapter.name}</span>
              </DropdownMenuItem>
            ))
          }
        </div>

        <DropdownMenuSeparator />
        
        {/* Fallback for other wallets */}
        <DropdownMenuItem 
          onClick={() => {
            // This will open the default wallet modal
            const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
            button?.click();
          }}
          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50"
        >
          <Wallet className="h-5 w-5 text-purple-600" />
          <span className="font-medium">More Wallets</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;
