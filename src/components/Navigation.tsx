
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Coins, Menu, X } from 'lucide-react';
import { useState } from 'react';
import WalletConnect from './WalletConnect';
import { useWalletAuth } from '@/hooks/useWalletAuth';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, profile } = useWalletAuth();
  const navigate = useNavigate();

  const navItems = isAuthenticated ? [
    { name: 'Dashboard', href: '/stake' },
    { name: 'Validators', href: '/validators' },
    { name: 'Rewards', href: '/rewards' },
  ] : [
    { name: 'Home', href: '/' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-purple-300/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coins className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">Solstake</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-purple-200 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <WalletConnect />
            {isAuthenticated && profile && (
              <span className="text-purple-200 text-sm">
                Welcome, {profile.username}
              </span>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-purple-200 hover:text-white transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-purple-300/20 space-y-3">
              <WalletConnect />
              {isAuthenticated && profile && (
                <div className="text-purple-200 text-sm">
                  Welcome, {profile.username}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
