import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Shield, 
  Brain, 
  Users, 
  TrendingUp, 
  Phone, 
  CheckCircle,
  Star,
  Award,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-heart.jpg";

export default function Landing() {
  const features = [
    {
      icon: Brain,
      title: "AI Health Assistant",
      description: "Get personalized insights and recommendations from our advanced AI chatbot",
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "SOS Emergency Alert",
      description: "Instant alerts to your emergency contacts when critical heart events are detected",
      color: "text-destructive"
    },
    {
      icon: TrendingUp,
      title: "Heart Trend Analysis",
      description: "Visual trends and patterns in your heart health data over time",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Family Health Support",
      description: "Connect with family members and monitor each other's heart health",
      color: "text-secondary"
    }
  ];

  const stats = [
    { label: "Users Protected", value: "50,000+", icon: Shield },
    { label: "Emergency Alerts Sent", value: "2,500+", icon: Phone },
    { label: "AI Accuracy Rate", value: "99.2%", icon: Brain },
    { label: "Lives Potentially Saved", value: "847", icon: Heart }
  ];

  const trustBadges = [
    { label: "HIPAA Compliant", icon: Shield },
    { label: "FDA Approved AI", icon: Award },
    { label: "24/7 Monitoring", icon: Zap },
    { label: "Medical Grade", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Heart className="h-3 w-3 mr-1 animate-heartbeat" />
                  Your heart. Understood.
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Monitor Your
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Heart Health </span>
                  with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  HeartClutch uses wearable data and advanced AI to monitor your cardiac health, 
                  generate personalized reports, and alert you in real-time to keep your heart healthy.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    Start Protecting Your Heart
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <badge.icon className="h-4 w-4 text-success" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="Heart health monitoring illustration" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-card border shadow-card rounded-xl p-3 animate-pulse-soft">
                <Heart className="h-6 w-6 text-primary animate-heartbeat" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border shadow-card rounded-xl p-3 animate-pulse-soft">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Heart Health
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Protection</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced platform combines cutting-edge AI with intuitive design to give you 
              complete control over your cardiac health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="relative border-0 shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in bg-gradient-to-br from-card to-muted/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take Control of Your Heart Health?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already protecting their hearts with HeartClutch. 
            Start your journey to better cardiac health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Heart className="h-5 w-5 mr-2 animate-heartbeat" />
                Start Free Trial
              </Button>
            </Link>
            <Link to="/signin">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-primary animate-heartbeat" />
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                HeartClutch
              </span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2024 HeartClutch. All rights reserved.</p>
              <p className="mt-1">Protecting hearts with advanced AI technology.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}