import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloatingChatBot } from "@/components/chat/FloatingChatBot";
import { Navbar } from "@/components/layout/Navbar";
import { useTheme } from "@/components/layout/ThemeProvider";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Clock,
  Shield
} from "lucide-react";
// Charts temporarily simplified for demo

const heartRateData = [
  { time: "6 AM", rate: 65, stress: 20 },
  { time: "9 AM", rate: 78, stress: 35 },
  { time: "12 PM", rate: 82, stress: 45 },
  { time: "3 PM", rate: 75, stress: 30 },
  { time: "6 PM", rate: 88, stress: 55 },
  { time: "9 PM", rate: 70, stress: 25 },
  { time: "12 AM", rate: 62, stress: 15 },
];

const vitals = [
  {
    title: "Heart Rate",
    value: "74",
    unit: "BPM",
    status: "normal",
    icon: Heart,
    trend: "up",
    change: "+2.3%",
    color: "text-primary"
  },
  {
    title: "Blood Pressure",
    value: "118/78",
    unit: "mmHg",
    status: "normal",
    icon: Activity,
    trend: "down",
    change: "-1.2%",
    color: "text-success"
  },
  {
    title: "Stress Level",
    value: "32",
    unit: "%",
    status: "low",
    icon: Brain,
    trend: "down",
    change: "-5.4%",
    color: "text-secondary"
  },
  {
    title: "Body Temp",
    value: "98.6",
    unit: "°F",
    status: "normal",
    icon: Thermometer,
    trend: "stable",
    change: "0%",
    color: "text-muted-foreground"
  }
];

const alerts = [
  {
    id: 1,
    type: "info",
    message: "Heart rate spike detected during workout at 2:30 PM",
    time: "2 hours ago",
    severity: "low"
  },
  {
    id: 2,
    type: "warning",
    message: "Stress levels elevated for 3+ hours",
    time: "4 hours ago",
    severity: "medium"
  },
  {
    id: 3,
    type: "success",
    message: "Great job! 30 minutes of cardio completed",
    time: "1 day ago",
    severity: "low"
  }
];

export default function Dashboard() {
  const { isDark, toggleTheme } = useTheme();
  const [timeRange, setTimeRange] = useState("7d");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success/10 text-success border-success/20";
      case "low": return "bg-secondary/10 text-secondary border-secondary/20";
      case "elevated": return "bg-warning/10 text-warning border-warning/20";
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "success": return <Shield className="h-4 w-4 text-success" />;
      default: return <Activity className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} darkMode={isDark} toggleDarkMode={toggleTheme} />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Heart className="h-8 w-8 text-primary animate-heartbeat" />
                Heart Health Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time monitoring of your cardiac health
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={timeRange === "24h" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("24h")}
              >
                24H
              </Button>
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("7d")}
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange("30d")}
              >
                30D
              </Button>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {vitals.map((vital, index) => (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {vital.title}
                  </CardTitle>
                  <vital.icon className={`h-5 w-5 ${vital.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {vital.value}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {vital.unit}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        {vital.trend === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                        {vital.trend === "down" && <TrendingDown className="h-3 w-3 text-success" />}
                        <span className="text-xs text-muted-foreground">{vital.change}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(vital.status)} variant="outline">
                      {vital.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Heart Rate Trend */}
            <Card className="lg:col-span-2 shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Heart Rate Trends
                </CardTitle>
                <CardDescription>
                  Your heart rate patterns over the past 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gradient-hero rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-primary animate-heartbeat mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Heart Rate Chart</h3>
                    <p className="text-sm text-muted-foreground">Interactive charts coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>
                  Latest health notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">
                        {alert.message}
                      </p>
                      <div className="flex items-center mt-1 space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Stress Level Chart */}
          <Card className="shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-secondary" />
                Stress Level Monitoring
              </CardTitle>
              <CardDescription>
                Track your stress patterns throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] bg-gradient-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Brain className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Stress monitoring visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FloatingChatBot />
    </div>
  );
}