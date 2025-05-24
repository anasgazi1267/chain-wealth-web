
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";

const Stake = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const handleStake = () => {
    console.log("Staking", stakeAmount, "SOL");
    // Implementation will require wallet connection and transaction
  };

  const handleUnstake = () => {
    console.log("Unstaking", unstakeAmount, "SOL");
    // Implementation will require wallet connection and transaction
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Staking Interface */}
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Stake SOL</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-purple-800/50">
                  <TabsTrigger value="stake" className="text-white data-[state=active]:bg-purple-600">
                    Stake
                  </TabsTrigger>
                  <TabsTrigger value="unstake" className="text-white data-[state=active]:bg-purple-600">
                    Unstake
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
                      <span>Epoch Duration:</span>
                      <span className="text-white">~2-3 days</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleStake}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                    disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
                  >
                    Stake SOL <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </TabsContent>
                
                <TabsContent value="unstake" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="unstake-amount" className="text-white">
                      Amount to Unstake (SOL)
                    </Label>
                    <Input
                      id="unstake-amount"
                      type="number"
                      placeholder="0.00"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                      className="bg-purple-800/30 border-purple-600 text-white placeholder-purple-300"
                    />
                  </div>
                  
                  <div className="bg-purple-800/30 p-4 rounded-lg">
                    <div className="flex justify-between text-sm text-purple-200 mb-2">
                      <span>Unstaking Period:</span>
                      <span className="text-yellow-400">1-2 epochs (~2-6 days)</span>
                    </div>
                    <div className="flex justify-between text-sm text-purple-200">
                      <span>Available to Unstake:</span>
                      <span className="text-white">0.0000 SOL</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleUnstake}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3"
                    disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0}
                  >
                    Unstake SOL
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Portfolio Overview */}
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-800/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white">0.00</div>
                  <div className="text-sm text-purple-200">SOL Staked</div>
                </div>
                <div className="bg-blue-800/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">0.00</div>
                  <div className="text-sm text-purple-200">Total Rewards</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Wallet Balance:</span>
                  <span className="text-white">-- SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Current APY:</span>
                  <span className="text-green-400">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Next Reward:</span>
                  <span className="text-white">-- hours</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-purple-400 text-purple-300 hover:bg-purple-800">
                View Detailed History
              </Button>
            </CardContent>
          </Card>
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
