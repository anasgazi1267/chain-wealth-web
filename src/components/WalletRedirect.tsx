
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletRedirect = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if wallet is connected and on home page
    if (connected && location.pathname === '/') {
      // Use a small delay to prevent immediate redirect loops
      const timer = setTimeout(() => {
        navigate('/stake', { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [connected, location.pathname, navigate]);

  return null;
};

export default WalletRedirect;
