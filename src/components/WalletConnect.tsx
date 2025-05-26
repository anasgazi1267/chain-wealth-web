import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Wallet, Smartphone, Globe, AlertCircle, CheckCircle, Download } from "lucide-react";
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useWalletDetection } from '@/hooks/useWalletDetection';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';

const WalletConnect = () => {
  const { connected, connecting, publicKey, wallet, select, wallets, disconnect } = useWallet();
  const { loading } = useWalletAuth();
  const { detectedWallets, isMobile, isPhantomInstalled, isSolflareInstalled } = useWalletDetection();
  const [connectionTimeout, setConnectionTimeout] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (connecting) {
      setConnectionTimeout(false);
      timeout = setTimeout(() => {
        setConnectionTimeout(true);
      }, 10000); // 10 seconds timeout
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [connecting]);

  const handleWalletSelect = async (walletName: string) => {
    try {
      setConnectionTimeout(false);
      const selectedWallet = wallets.find(w => w.adapter.name === walletName);
      if (selectedWallet) {
        await select(selectedWallet.adapter.name);
      }
    } catch (error) {
      console.error('Wallet selection failed:', error);
    }
  };

  const getWalletDownloadUrl = (walletName: string) => {
    switch (walletName) {
      case 'Phantom':
        return isMobile 
          ? 'https://phantom.app/download'
          : 'https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa';
      case 'Solflare':
        return isMobile 
          ? 'https://solflare.com/download'
          : 'https://chrome.google.com/webstore/detail/solflare-wallet/bhhhlbepdkbapadjdnnojkbgioiodbic';
      default:
        return '#';
    }
  };

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
          <CheckCircle className="h-4 w-4 text-green-400" />
        </div>
        <Button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {connectionTimeout && (
        <Alert className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Connection is taking longer than expected. Please ensure your wallet is unlocked and try again.
          </AlertDescription>
        </Alert>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            disabled={connecting || loading}
          >
            <Wallet className="h-4 w-4 mr-2" />
            {connecting || loading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 bg-white/95 backdrop-blur-lg border-purple-300/30 z-50">
          <DropdownMenuLabel className="text-center">
            <p className="font-medium text-gray-700">Choose Your Wallet</p>
            <p className="text-xs text-gray-500 mt-1">
              {isMobile ? 'Mobile wallets detected' : 'Desktop browser wallets'}
            </p>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {/* Recommended Wallets */}
          <div className="p-2">
            <p className="text-xs text-gray-500 mb-2 flex items-center">
              {isMobile ? <Smartphone className="h-3 w-3 mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
              Recommended for {isMobile ? 'Mobile' : 'Desktop'}
            </p>
            
            {/* Phantom */}
            <DropdownMenuItem className="flex items-center justify-between p-3 cursor-pointer hover:bg-purple-50 rounded-lg mb-2">
              <div 
                className="flex items-center gap-3 flex-1"
                onClick={() => isPhantomInstalled ? handleWalletSelect('Phantom') : window.open(getWalletDownloadUrl('Phantom'), '_blank')}
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Phantom</span>
                    {isPhantomInstalled ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Download className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {isPhantomInstalled ? 'Ready to connect' : 'Click to install'}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>

            {/* Solflare */}
            <DropdownMenuItem className="flex items-center justify-between p-3 cursor-pointer hover:bg-purple-50 rounded-lg mb-2">
              <div 
                className="flex items-center gap-3 flex-1"
                onClick={() => isSolflareInstalled ? handleWalletSelect('Solflare') : window.open(getWalletDownloadUrl('Solflare'), '_blank')}
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Solflare</span>
                    {isSolflareInstalled ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Download className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {isSolflareInstalled ? 'Ready to connect' : 'Click to install'}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>

            {/* Web Wallet Option */}
            <DropdownMenuItem 
              onClick={() => handleWalletSelect('Torus')}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-purple-50 rounded-lg"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium">Web Wallet</span>
                <p className="text-xs text-gray-500">No installation required</p>
              </div>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator />
          
          {/* Other Wallets */}
          <DropdownMenuItem 
            onClick={() => {
              const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
              button?.click();
            }}
            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-purple-50 rounded-lg m-2"
          >
            <Wallet className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Browse All Wallets</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden wallet adapter button for fallback */}
      <div className="hidden">
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default WalletConnect;
