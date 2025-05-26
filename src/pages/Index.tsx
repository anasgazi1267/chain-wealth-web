
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WalletRedirect from "@/components/WalletRedirect";

const Index = () => {
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
