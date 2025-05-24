
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrendingUp, Calendar, Gift, ArrowUpRight } from "lucide-react";

const Rewards = () => {
  const rewardHistory = [
    {
      id: 1,
      epoch: 485,
      date: "2024-01-15",
      amount: "0.0245 SOL",
      validator: "Solana Foundation",
      status: "Claimed"
    },
    {
      id: 2,
      epoch: 484,
      date: "2024-01-13",
      amount: "0.0238 SOL",
      validator: "Solana Foundation",
      status: "Claimed"
    },
    {
      id: 3,
      epoch: 483,
      date: "2024-01-11",
      amount: "0.0251 SOL",
      validator: "Phantom Validator",
      status: "Claimed"
    },
    {
      id: 4,
      epoch: 482,
      date: "2024-01-09",
      amount: "0.0247 SOL",
      validator: "Phantom Validator",
      status: "Claimed"
    },
    {
      id: 5,
      epoch: 481,
      date: "2024-01-07",
      amount: "0.0253 SOL",
      validator: "Serum Validator",
      status: "Claimed"
    }
  ];

  const totalRewards = rewardHistory.reduce((sum, reward) => 
    sum + parseFloat(reward.amount.split(' ')[0]), 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Rewards
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Track your staking rewards and see how your SOL is growing over time
          </p>
        </div>

        {/* Rewards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Gift className="h-5 w-5 mr-2 text-green-400" />
                Total Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {totalRewards.toFixed(4)} SOL
              </div>
              <div className="text-sm text-purple-200">
                ≈ ${(totalRewards * 95.50).toFixed(2)} USD
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                Current APY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                8.2%
              </div>
              <div className="text-sm text-purple-200">
                Based on last 30 epochs
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-yellow-400" />
                Next Reward
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                ~18h
              </div>
              <div className="text-sm text-purple-200">
                Epoch 486 ending soon
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Rewards Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-purple-800/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-purple-200">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                <p className="text-lg">Performance chart will be displayed here</p>
                <p className="text-sm">Shows rewards over time and APY trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards History */}
        <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-xl">Rewards History</CardTitle>
            <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800">
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewardHistory.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-4 bg-purple-800/20 rounded-lg hover:bg-purple-800/30 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Epoch {reward.epoch} Reward
                      </div>
                      <div className="text-sm text-purple-200">
                        {reward.date} • {reward.validator}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-400 font-semibold text-lg">
                      +{reward.amount}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-green-400 text-green-400">
                        {reward.status}
                      </Badge>
                      <ArrowUpRight className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-800">
                Load More History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">How Rewards Work</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-2">
              <p>• Rewards are distributed every epoch (~2-3 days)</p>
              <p>• APY varies based on network performance and validator commission</p>
              <p>• Rewards are automatically compounded to increase your stake</p>
              <p>• No action required - rewards are automatic</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-lg border-purple-300/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Maximize Your Rewards</CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200 space-y-2">
              <p>• Choose validators with low commission rates</p>
              <p>• Stake larger amounts for better absolute returns</p>
              <p>• Keep your stake active for consistent rewards</p>
              <p>• Monitor validator performance regularly</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rewards;
