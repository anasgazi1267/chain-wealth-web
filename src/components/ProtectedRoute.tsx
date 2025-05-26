
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useWalletAuth();
  const { connected, connecting } = useWallet();

  // Show loading while wallet is connecting or profile is being created
  if (connecting || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Connecting wallet...</p>
        </div>
      </div>
    );
  }

  // If wallet is not connected, redirect to home
  if (!connected || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
