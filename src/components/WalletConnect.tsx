
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  const handleConnect = () => {
    // This will be implemented with Solana wallet adapter
    console.log("Connecting wallet...");
    // For now, show a placeholder message
    alert("Wallet connection will be implemented with Solana wallet adapter. You'll need an RPC endpoint for mainnet.");
  };

  return (
    <Button
      onClick={handleConnect}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
    >
      <Wallet className="h-4 w-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
