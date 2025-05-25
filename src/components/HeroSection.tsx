
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp, Globe, Coins } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';

const HeroSection = () => {
  const { connected } = useWallet();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 pb-32">
      {/* Animated Background with Solana Coins */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 text-purple-400/30 animate-float">
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 text-blue-400/25 animate-float" style={{animationDelay: '1s'}}>
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-32 w-20 h-20 text-indigo-400/20 animate-float" style={{animationDelay: '2s'}}>
          <Coins className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-40 w-14 h-14 text-purple-300/25 animate-float" style={{animationDelay: '0.5s'}}>
          <Coins className="w-full h-full" />
        </div>

        {/* Gradient Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border border-purple-400/30 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Globe className="h-5 w-5 text-purple-300" />
            <span className="text-purple-200 font-medium">Solana Staking Platform</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading with Animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-fade-in">
              Stake Your{' '}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-glow inline-block">
              SOL
            </span>
            <br />
            <span className="inline-block animate-fade-in" style={{animationDelay: '0.3s'}}>
              Earn Premium Rewards
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
            Join thousands of users earning up to{' '}
            <span className="text-green-400 font-semibold animate-pulse">8.5% APY</span>{' '}
            with our secure, non-custodial staking platform
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.7s'}}>
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-purple-200 text-sm">Non-custodial staking with enterprise-level security</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.9s'}}>
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">High Returns</h3>
              <p className="text-purple-200 text-sm">Competitive APY rates with daily rewards</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '1.1s'}}>
              <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant Staking</h3>
              <p className="text-purple-200 text-sm">Start earning immediately with zero fees</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{animationDelay: '1.3s'}}>
            <Link to="/stake">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-8 border-t border-purple-400/20">
            <div className="text-center animate-fade-in" style={{animationDelay: '1.5s'}}>
              <div className="text-3xl font-bold text-white">$2.4M+</div>
              <div className="text-purple-300 text-sm">Total Value Locked</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '1.7s'}}>
              <div className="text-3xl font-bold text-white">12,000+</div>
              <div className="text-purple-300 text-sm">Active Stakers</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '1.9s'}}>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-purple-300 text-sm">Network Uptime</div>
            </div>
            <div className="text-center animate-fade-in" style={{animationDelay: '2.1s'}}>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-purple-300 text-sm">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
