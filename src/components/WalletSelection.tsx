import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Monitor, Globe, Shield } from 'lucide-react';

const WalletSelection = () => {
  const { wallets, select, connecting } = useWallet();

  const walletCategories = {
    desktop: [
      {
        name: 'Phantom',
        description: 'Most popular Solana wallet with great security',
        icon: Shield,
        recommended: true
      },
      {
        name: 'Solflare',
        description: 'Feature-rich wallet with staking support',
        icon: Monitor,
        recommended: false
      },
      {
        name: 'Glow',
        description: 'Simple and secure Solana wallet',
        icon: Shield,
        recommended: false
      }
    ],
    mobile: [
      {
        name: 'Torus',
        description: 'Easy social login wallet',
        icon: Smartphone,
        recommended: false
      },
      {
        name: 'Slope',
        description: 'Mobile-first Solana wallet',
        icon: Smartphone,
        recommended: false
      }
    ]
  };

  const handleWalletSelect = (walletName: string) => {
    const wallet = wallets.find(w => w.adapter.name === walletName);
    if (wallet) {
      select(wallet.adapter.name);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Choose Your Wallet</h2>
        <p className="text-purple-200">Connect with any Solana-compatible wallet</p>
      </div>

      {/* Desktop Wallets */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Monitor className="h-5 w-5 mr-2" />
          Desktop Wallets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {walletCategories.desktop.map((walletInfo) => {
            const wallet = wallets.find(w => w.adapter.name === walletInfo.name);
            return (
              <Card key={walletInfo.name} className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2">
                    {wallet?.adapter.icon ? (
                      <img 
                        src={wallet.adapter.icon} 
                        alt={walletInfo.name}
                        className="w-12 h-12 mx-auto"
                      />
                    ) : (
                      <walletInfo.icon className="h-12 w-12 text-purple-400" />
                    )}
                  </div>
                  <CardTitle className="text-white flex items-center justify-center gap-2">
                    {walletInfo.name}
                    {walletInfo.recommended && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Recommended</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-purple-200 text-sm mb-4">{walletInfo.description}</p>
                  <Button
                    onClick={() => handleWalletSelect(walletInfo.name)}
                    disabled={connecting || !wallet}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {connecting ? 'Connecting...' : `Connect ${walletInfo.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Mobile Wallets */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Smartphone className="h-5 w-5 mr-2" />
          Mobile & Web Wallets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {walletCategories.mobile.map((walletInfo) => {
            const wallet = wallets.find(w => w.adapter.name === walletInfo.name);
            return (
              <Card key={walletInfo.name} className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2">
                    {wallet?.adapter.icon ? (
                      <img 
                        src={wallet.adapter.icon} 
                        alt={walletInfo.name}
                        className="w-12 h-12 mx-auto"
                      />
                    ) : (
                      <walletInfo.icon className="h-12 w-12 text-purple-400" />
                    )}
                  </div>
                  <CardTitle className="text-white">{walletInfo.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-purple-200 text-sm mb-4">{walletInfo.description}</p>
                  <Button
                    onClick={() => handleWalletSelect(walletInfo.name)}
                    disabled={connecting || !wallet}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {connecting ? 'Connecting...' : `Connect ${walletInfo.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Other Wallets */}
      <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20">
        <CardHeader className="text-center">
          <CardTitle className="text-white flex items-center justify-center">
            <Globe className="h-5 w-5 mr-2" />
            Other Wallets
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-purple-200 text-sm mb-4">
            Can't find your wallet? Try the universal wallet selector.
          </p>
          <Button
            onClick={() => {
              const button = document.querySelector('.wallet-adapter-button') as HTMLButtonElement;
              button?.click();
            }}
            variant="outline"
            className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white"
          >
            Browse All Wallets
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSelection;
