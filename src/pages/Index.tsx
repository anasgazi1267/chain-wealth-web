
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, TrendingUp, Globe, Users, Award, Lock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Experience the future of DeFi staking with cutting-edge technology and unmatched security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Chain Support</h3>
                <p className="text-purple-200 text-sm">Stake across multiple blockchains with a single interface</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Non-Custodial</h3>
                <p className="text-purple-200 text-sm">You maintain full control of your assets at all times</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Mobile Optimized</h3>
                <p className="text-purple-200 text-sm">Stake and manage your portfolio on any device</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30 hover:bg-white/15 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Proven Track Record</h3>
                <p className="text-purple-200 text-sm">Trusted by thousands with zero security incidents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Earning in 3 Simple Steps
            </h2>
            <p className="text-xl text-purple-200">
              Get started with staking in under 2 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Connect Wallet</h3>
              <p className="text-purple-200">
                Connect your Phantom, Solflare, or any supported Solana wallet securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Choose Amount</h3>
              <p className="text-purple-200">
                Select how much SOL you want to stake and pick your preferred validator
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Start Earning</h3>
              <p className="text-purple-200">
                Sit back and watch your rewards accumulate automatically every epoch
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/stake">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-xl"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
