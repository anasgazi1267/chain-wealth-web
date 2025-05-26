
import { useWallet } from '@solana/wallet-adapter-react';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useWalletAuth } from '@/hooks/useWalletAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { connected, connecting } = useWallet();
  const { loading } = useWalletAuth();

  // Show loading while connecting
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

  // If wallet not connected, redirect to home
  if (!connected) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
