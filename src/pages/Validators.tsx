
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, TrendingUp, Shield, Zap } from "lucide-react";

const Validators = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const validators = [
    {
      id: 1,
      name: "Solana Foundation",
      commission: "5%",
      apy: "8.2%",
      staked: "1.2M SOL",
      uptime: "99.9%",
      status: "Active",
      identity: "Verified"
    },
    {
      id: 2,
      name: "Phantom Validator",
      commission: "7%",
      apy: "8.0%",
      staked: "890K SOL",
      uptime: "99.8%",
      status: "Active",
      identity: "Verified"
    },
    {
      id: 3,
      name: "Serum Validator",
      commission: "6%",
      apy: "8.1%",
      staked: "750K SOL",
      uptime: "99.7%",
      status: "Active",
      identity: "Verified"
    },
    {
      id: 4,
      name: "Mango Markets",
      commission: "8%",
      apy: "7.9%",
      staked: "650K SOL",
      uptime: "99.6%",
      status: "Active",
      identity: "Verified"
    },
    {
      id: 5,
      name: "Raydium Validator",
      commission: "5.5%",
      apy: "8.15%",
      staked: "580K SOL",
      uptime: "99.9%",
      status: "Active",
      identity: "Verified"
    },
    {
      id: 6,
      name: "Orca Validator",
      commission: "6.5%",
      apy: "8.05%",
      staked: "520K SOL",
      uptime: "99.8%",
      status: "Active",
      identity: "Verified"
    }
  ];

  const filteredValidators = validators.filter(validator =>
    validator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStakeToValidator = (validatorId: number) => {
    console.log("Staking to validator:", validatorId);
    // This would open a staking modal or redirect to stake page with validator pre-selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Validator
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Select from our curated list of high-performance validators with competitive rates and proven track records
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search validators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-purple-800/30 border-purple-600 text-white placeholder-purple-300"
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">8.2%</div>
              <div className="text-sm text-purple-200">Average APY</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-center">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,200+</div>
              <div className="text-sm text-purple-200">Active Validators</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-center">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-sm text-purple-200">Network Uptime</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-300">4.2M</div>
              <div className="text-sm text-purple-200">Total SOL Staked</div>
            </CardContent>
          </Card>
        </div>

        {/* Validators List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">Top Validators</h2>
          
          {filteredValidators.map((validator) => (
            <Card key={validator.id} className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                  {/* Validator Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {validator.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{validator.name}</h3>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="border-green-400 text-green-400">
                            {validator.status}
                          </Badge>
                          <Badge variant="outline" className="border-blue-400 text-blue-400">
                            {validator.identity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">{validator.apy}</div>
                    <div className="text-sm text-purple-200">APY</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{validator.commission}</div>
                    <div className="text-sm text-purple-200">Commission</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{validator.staked}</div>
                    <div className="text-sm text-purple-200">Total Staked</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-400">{validator.uptime}</div>
                    <div className="text-sm text-purple-200">Uptime</div>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <Button
                      onClick={() => handleStakeToValidator(validator.id)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2"
                    >
                      Stake Here
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredValidators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-purple-200 text-lg">No validators found matching your search.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Validators;
