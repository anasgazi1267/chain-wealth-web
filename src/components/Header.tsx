
import React from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                SolanaStake
              </h1>
              <p className="text-xs text-purple-300">Multi-Chain Staking Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-purple-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/stake" 
              className="text-purple-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Stake
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/validators" 
              className="text-purple-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Validators
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/rewards" 
              className="text-purple-100 hover:text-white transition-colors duration-300 font-medium relative group"
            >
              Rewards
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Features badges */}
          <div className="hidden lg:flex items-center space-x-4 mr-6">
            <div className="flex items-center space-x-1 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-1 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">8.5% APY</span>
            </div>
          </div>

          {/* Wallet Connect */}
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
