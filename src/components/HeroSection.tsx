
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp, Globe, Coins } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

const HeroSection = () => {
  const { connected } = useWallet();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-32">
      {/* Animated Background Effects with Solana Icons */}
      <div className="absolute inset-0">
        {/* Floating Solana Coin Icons */}
        <div className="absolute top-10 left-10 w-16 h-16 text-purple-400/20 animate-bounce">
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '8s'}} />
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 text-blue-400/30 animate-pulse">
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '6s'}} />
        </div>
        <div className="absolute bottom-40 left-32 w-20 h-20 text-indigo-400/20 animate-bounce" style={{animationDelay: '2s'}}>
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '10s'}} />
        </div>
        <div className="absolute bottom-20 right-40 w-14 h-14 text-purple-300/25 animate-pulse" style={{animationDelay: '1s'}}>
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '7s'}} />
        </div>
        <div className="absolute top-1/2 left-20 w-10 h-10 text-blue-300/30 animate-bounce" style={{animationDelay: '3s'}}>
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '9s'}} />
        </div>
        <div className="absolute top-40 right-10 w-18 h-18 text-indigo-300/20 animate-pulse" style={{animationDelay: '1.5s'}}>
          <Coins className="w-full h-full animate-spin" style={{animationDuration: '5s'}} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Multi-chain Badge with Animation */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-purple-400/30 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Globe className="h-5 w-5 text-purple-300 animate-spin" style={{animationDuration: '4s'}} />
            <span className="text-purple-200 font-medium">Multi-Chain Staking Platform</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading with Staggered Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-fade-in" style={{animationDelay: '0.2s'}}>
              Stake Your{' '}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse inline-block" style={{animationDelay: '0.4s'}}>
              SOL
            </span>
            <br />
            <span className="inline-block animate-fade-in" style={{animationDelay: '0.6s'}}>
              Earn Premium Rewards
            </span>
          </h1>

          {/* Subtitle with Animation */}
          <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{animationDelay: '0.8s'}}>
            Join thousands of users earning up to{' '}
            <span className="text-green-400 font-semibold animate-pulse">8.5% APY</span>{' '}
            with our secure, non-custodial staking platform powered by QuickNode
          </p>

          {/* Feature Cards with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '1s'}}>
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-semibold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-purple-200 text-sm">Non-custodial staking with enterprise-level security protocols</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.2s'}}>
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3 animate-bounce" />
              <h3 className="text-lg font-semibold text-white mb-2">High Returns</h3>
              <p className="text-purple-200 text-sm">Competitive APY rates with daily compound rewards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.4s'}}>
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3 animate-pulse" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant Staking</h3>
              <p className="text-purple-200 text-sm">Start earning immediately with zero setup fees</p>
            </div>
          </div>

          {/* CTA Buttons with Animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '1.6s'}}>
            <Link to="/stake">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25 animate-pulse"
              >
                {connected ? 'Start Staking Now' : 'Connect & Stake'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/validators">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-purple-400/50 text-purple-100 hover:bg-purple-500/20 px-8 py-4 text-lg rounded-xl backdrop-blur-lg transform hover:scale-105 transition-all duration-300"
              >
                Explore Validators
              </Button>
            </Link>
          </div>

          {/* Stats with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-8 border-t border-purple-400/20">
            <div className="text-center animate-fade-in" style={{animationDelay: '1.8s'}}>
              <div className="text-3xl font-bold text-white animate-pulse">$2.4M+</div>
              <div className="text-purple-300 text-sm">Total Value Locked</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '2s'}}>
              <div className="text-3xl font-bold text-white animate-pulse">12,000+</div>
              <div className="text-purple-300 text-sm">Active Stakers</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '2.2s'}}>
              <div className="text-3xl font-bold text-white animate-pulse">99.9%</div>
              <div className="text-purple-300 text-sm">Network Uptime</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '2.4s'}}>
              <div className="text-3xl font-bold text-white animate-pulse">24/7</div>
              <div className="text-purple-300 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
