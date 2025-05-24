
import { Link } from "react-router-dom";
import { Github, Twitter, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-purple-700/30 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SolStake
              </span>
            </h3>
            <p className="text-purple-200 mb-4 max-w-md">
              The most trusted platform for Solana staking. Secure, reliable, and profitable staking solutions for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-purple-300 hover:text-white transition-colors">
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/stake" className="text-purple-200 hover:text-white transition-colors">Stake SOL</Link></li>
              <li><Link to="/validators" className="text-purple-200 hover:text-white transition-colors">Validators</Link></li>
              <li><Link to="/rewards" className="text-purple-200 hover:text-white transition-colors">Rewards</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-700/30 mt-8 pt-8 text-center">
          <p className="text-purple-200">
            © 2024 SolStake. All rights reserved. | Built on Solana
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
