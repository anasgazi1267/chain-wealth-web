
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReferralSystem from "@/components/ReferralSystem";
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { useSolanaBalance } from "@/hooks/useSolanaBalance";
import { useStaking } from "@/hooks/useStaking";
import { useWallet } from '@solana/wallet-adapter-react';

const Stake = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const { balance, loading: balanceLoading } = useSolanaBalance();
  const { stakeSOL, sendPayment, loading: stakingLoading, platformAddress } = useStaking();
  const { connected } = useWallet();

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    stakeSOL(parseFloat(stakeAmount));
    setStakeAmount("");
  };

  const handlePayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) return;
    sendPayment(parseFloat(paymentAmount));
    setPaymentAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stake Your SOL
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Start earning rewards immediately with our secure and reliable staking platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Staking Interface */}
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Stake & Pay</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-purple-800/50">
                  <TabsTrigger value="stake" className="text-white data-[state=active]:bg-purple-600">
                    Stake SOL
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="text-white data-[state=active]:bg-purple-600">
                    Send Payment
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stake" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount" className="text-white">
                      Amount to Stake (SOL)
                    </Label>
                    <Input
                      id="stake-amount"
                      type="number"
                      placeholder="0.00"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-purple-800/30 border-purple-600 text-white placeholder-purple-300"
                    />
                  </div>
                  
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Current APY:</span>
                      <span className="text-green-400 font-semibold">8.2%</span>
                    </div>
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Estimated Annual Rewards:</span>
                      <span className="text-white">{stakeAmount ? (parseFloat(stakeAmount) * 0.082).toFixed(4) : "0.0000"} SOL</span>
                    </div>
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>Platform Address:</span>
                      <span className="text-white text-xs">{platformAddress.slice(0, 8)}...{platformAddress.slice(-8)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleStake}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                    disabled={!connected || !stakeAmount || parseFloat(stakeAmount) <= 0 || stakingLoading}
                  >
                    {stakingLoading ? "Processing..." : "Stake SOL"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="payment" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="payment-amount" className="text-white">
                      Payment Amount (SOL)
                    </Label>
                    <Input
                      id="payment-amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="bg-purple-800/30 border-purple-600 text-white placeholder-purple-300"
                    />
                  </div>
                  
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Recipient:</span>
                      <span className="text-white text-xs">Platform Wallet</span>
                    </div>
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>Transaction Fee:</span>
                      <span className="text-white">~0.000005 SOL</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3"
                    disabled={!connected || !paymentAmount || parseFloat(paymentAmount) <= 0 || stakingLoading}
                  >
                    {stakingLoading ? "Processing..." : "Send Payment"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Portfolio Overview */}
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Your Wallet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-purple-800/30 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-white">
                    {balanceLoading ? "Loading..." : balance ? balance.toFixed(4) : "0.00"}
                  </div>
                  <div className="text-sm text-purple-200">SOL Balance</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Wallet Status:</span>
                  <span className={`${connected ? 'text-green-400' : 'text-red-400'}`}>
                    {connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Current APY:</span>
                  <span className="text-green-400">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Platform Address:</span>
                  <span className="text-white text-xs">{platformAddress.slice(0, 12)}...</span>
                </div>
              </div>
              
              {!connected && (
                <div className="bg-yellow-600/20 border border-yellow-500/30 p-4 rounded-lg">
                  <p className="text-yellow-200 text-sm text-center">
                    Connect your wallet to start staking and view your balance
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Referral System */}
        <div className="mb-12">
          <ReferralSystem />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20 text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
              <p className="text-purple-200 text-sm">Non-custodial staking with enterprise security</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20 text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">High Yields</h3>
              <p className="text-purple-200 text-sm">Competitive rates up to 8.5% APY</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20 text-center">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant</h3>
              <p className="text-purple-200 text-sm">Start earning immediately with no delays</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Stake;
