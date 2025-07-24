import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Check, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  FileText,
  Phone,
  Zap,
  Crown
} from "lucide-react";

export default function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium" | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelection = async (plan: "free" | "premium") => {
    setSelectedPlan(plan);
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `${plan === "free" ? "Free" : "Premium"} plan selected!`,
      description: "Setting up your HeartClutch experience...",
    });
    
    navigate("/dashboard");
    setLoading(false);
  };

  const freeFeatures = [
    { icon: MessageCircle, text: "Limited AI Chatbot Access", included: true },
    { icon: Phone, text: "Max 2 SOS Contacts", included: true },
    { icon: TrendingUp, text: "7-Day Health Trend Visualization", included: true },
    { icon: FileText, text: "2 AI Health Reports/Month", included: true },
    { icon: Users, text: "Family Members Access", included: false },
    { icon: TrendingUp, text: "30-Day Trend View", included: false },
    { icon: FileText, text: "Weekly AI Health Reports", included: false },
  ];

  const premiumFeatures = [
    { icon: MessageCircle, text: "Unlimited AI Chatbot Access", included: true },
    { icon: Phone, text: "Unlimited SOS Contacts", included: true },
    { icon: Users, text: "Add & View Family Members", included: true },
    { icon: TrendingUp, text: "30-Day Health Trend View", included: true },
    { icon: FileText, text: "Weekly AI Health Reports", included: true },
    { icon: Zap, text: "Priority Support", included: true },
    { icon: Heart, text: "Advanced Analytics", included: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-primary animate-heartbeat" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HeartClutch
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Heart Health Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the plan that best fits your heart health monitoring needs. 
            You can upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="relative border-2 shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Free Forever</Badge>
              </div>
              <CardTitle className="text-2xl">Free Tier</CardTitle>
              <CardDescription>Perfect for getting started with heart health monitoring</CardDescription>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-1 rounded-full ${
                      feature.included ? "bg-success/10" : "bg-muted"
                    }`}>
                      {feature.included ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </div>
                    <feature.icon className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-sm ${
                      feature.included ? "text-foreground" : "text-muted-foreground line-through"
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant={selectedPlan === "free" ? "default" : "outline"}
                onClick={() => handlePlanSelection("free")}
                loading={loading && selectedPlan === "free"}
                className="w-full"
              >
                {selectedPlan === "free" ? "Setting up..." : "Start Free"}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-primary shadow-elevated hover:shadow-elevated transition-all duration-300 bg-gradient-to-br from-card to-primary/5">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-primary text-white px-4 py-1">
                <Crown className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                Premium Tier
                <Heart className="h-5 w-5 text-primary animate-heartbeat" />
              </CardTitle>
              <CardDescription>Complete heart health protection for you and your family</CardDescription>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold">$20</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-1 rounded-full bg-success/10">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant={selectedPlan === "premium" ? "premium" : "hero"}
                onClick={() => handlePlanSelection("premium")}
                loading={loading && selectedPlan === "premium"}
                className="w-full"
              >
                {selectedPlan === "premium" ? "Setting up..." : "Start Premium Trial"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All plans include HIPAA-compliant data protection and 24/7 emergency monitoring
          </p>
        </div>
      </div>
    </div>
  );
}