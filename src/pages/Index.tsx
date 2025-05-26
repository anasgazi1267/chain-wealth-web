
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WalletRedirect from "@/components/WalletRedirect";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const referralCode = searchParams.get('ref');
    if (referralCode) {
      // Store referral code in localStorage for later use
      localStorage.setItem('referralCode', referralCode);
      toast({
        title: "Referral Code Applied!",
        description: "You'll receive bonus rewards when you stake",
      });
    }
  }, [searchParams, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <WalletRedirect />
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Index;
