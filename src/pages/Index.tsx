
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, TrendingUp, Zap, Users, Award, Globe } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 py-20 text-center text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
            Stake Solana
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Earn Rewards with Confidence
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-purple-200">
            Secure, reliable, and profitable Solana staking with up to 8.5% APY. 
            Join thousands of validators and maximize your SOL rewards.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/stake">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
                Start Staking <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/validators">
              <Button variant="outline" className="border-purple-300 text-purple-300 hover:bg-purple-800 px-8 py-4 text-lg rounded-xl">
                Explore Validators
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-300">8.5%</div>
                <div className="text-sm text-purple-200">Average APY</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-300">2.1M+</div>
                <div className="text-sm text-purple-200">SOL Staked</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-300">1,200+</div>
                <div className="text-sm text-purple-200">Active Validators</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-yellow-300">99.9%</div>
                <div className="text-sm text-purple-200">Uptime</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-300 mb-4" />
                <CardTitle className="text-xl">Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Enterprise-grade security with 99.9% uptime guarantee. Your funds are always safe and accessible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-300 mb-4" />
                <CardTitle className="text-xl">High Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Maximize your earnings with up to 8.5% APY. Compound your rewards automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 text-white">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-300 mb-4" />
                <CardTitle className="text-xl">Instant Staking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-200">
                  Start earning immediately with no minimum staking amount. Unstake anytime you want.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-4 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-white mb-16">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Connect Wallet</h4>
              <p className="text-purple-200">
                Connect your Phantom, Solflare, or any Solana-compatible wallet securely.
              </p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Choose Validator</h4>
              <p className="text-purple-200">
                Select from our curated list of high-performance validators with competitive rates.
              </p>
            </div>
            
            <div className="text-center text-white">
              <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Earn Rewards</h4>
              <p className="text-purple-200">
                Sit back and watch your SOL grow with automatic reward distribution every epoch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
