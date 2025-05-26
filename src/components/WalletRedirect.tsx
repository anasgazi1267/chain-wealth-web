
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWalletAuth } from '@/hooks/useWalletAuth';

const WalletRedirect = () => {
  const { isAuthenticated } = useWalletAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/stake', { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return null;
};

export default WalletRedirect;
