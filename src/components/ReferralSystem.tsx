
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWalletAuth } from '@/hooks/useWalletAuth';
import { useToast } from '@/hooks/use-toast';
import { Gift, Users, Copy } from 'lucide-react';

const ReferralSystem = () => {
  const { profile, walletAddress } = useWalletAuth();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState('');

  const generateReferralLink = () => {
    if (!walletAddress) return '';
    return `${window.location.origin}?ref=${walletAddress}`;
  };

  const copyReferralLink = () => {
    const link = generateReferralLink();
    navigator.clipboard.writeText(link);
    toast({
      title: "Referral Link Copied!",
      description: "Share this link to earn 0.005 SOL per referral",
    });
  };

  const applyReferralCode = async () => {
    if (!referralCode || !walletAddress) return;

    // Here you would implement the referral logic
    toast({
      title: "Referral Applied!",
      description: "You'll receive bonus rewards when you stake",
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-purple-300/30">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Referral System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Your Referral Stats */}
        <div className="bg-purple-800/30 p-4 rounded-lg">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Your Referrals
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {profile?.referral_count || 0}
              </div>
              <div className="text-sm text-purple-200">Total Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {profile?.referral_earnings || 0} SOL
              </div>
              <div className="text-sm text-purple-200">Earnings</div>
            </div>
          </div>
        </div>

        {/* Share Referral Link */}
        <div className="space-y-3">
          <Label className="text-white">Your Referral Link</Label>
          <div className="flex gap-2">
            <Input
              value={generateReferralLink()}
              readOnly
              className="bg-purple-800/30 border-purple-600 text-white text-sm"
            />
            <Button
              onClick={copyReferralLink}
              className="bg-purple-600 hover:bg-purple-700"
              size="icon"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-purple-200">
            Earn 0.005 SOL for each friend who stakes using your link!
          </p>
        </div>

        {/* Apply Referral Code */}
        <div className="space-y-3">
          <Label className="text-white">Have a Referral Code?</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter referral wallet address"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="bg-purple-800/30 border-purple-600 text-white placeholder-purple-300"
            />
            <Button
              onClick={applyReferralCode}
              className="bg-green-600 hover:bg-green-700"
              disabled={!referralCode}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Referral Rules */}
        <div className="bg-blue-800/20 p-3 rounded-lg">
          <h4 className="text-blue-200 font-semibold mb-2">How it works:</h4>
          <ul className="text-sm text-blue-100 space-y-1">
            <li>• Share your referral link with friends</li>
            <li>• Earn 0.005 SOL when they make their first stake</li>
            <li>• No limit on referrals</li>
            <li>• Earnings are credited instantly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;
