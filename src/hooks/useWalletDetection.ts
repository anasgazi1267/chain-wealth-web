
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface WalletInfo {
  name: string;
  installed: boolean;
  mobile: boolean;
  desktop: boolean;
  icon?: string;
}

export const useWalletDetection = () => {
  const { wallets } = useWallet();
  const [detectedWallets, setDetectedWallets] = useState<WalletInfo[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if user is on mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const detectWallets = () => {
      const walletInfos: WalletInfo[] = [];

      // Check for Phantom
      const phantom = (window as any).phantom?.solana;
      walletInfos.push({
        name: 'Phantom',
        installed: !!phantom,
        mobile: isMobile,
        desktop: !isMobile,
        icon: phantom?.isPhantom ? '/phantom-icon.png' : undefined
      });

      // Check for Solflare
      const solflare = (window as any).solflare;
      walletInfos.push({
        name: 'Solflare',
        installed: !!solflare,
        mobile: isMobile,
        desktop: !isMobile,
        icon: solflare ? '/solflare-icon.png' : undefined
      });

      // Check for other wallets
      wallets.forEach(wallet => {
        if (!walletInfos.find(w => w.name === wallet.adapter.name)) {
          walletInfos.push({
            name: wallet.adapter.name,
            installed: wallet.adapter.connected || false,
            mobile: isMobile,
            desktop: !isMobile,
            icon: wallet.adapter.icon
          });
        }
      });

      setDetectedWallets(walletInfos);
    };

    detectWallets();
  }, [wallets, isMobile]);

  return {
    detectedWallets,
    isMobile,
    isPhantomInstalled: detectedWallets.find(w => w.name === 'Phantom')?.installed || false,
    isSolflareInstalled: detectedWallets.find(w => w.name === 'Solflare')?.installed || false,
  };
};
