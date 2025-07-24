import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { useTheme } from "@/components/layout/ThemeProvider";
import { FloatingChatBot } from "@/components/chat/FloatingChatBot";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Heart, 
  Brain,
  Activity,
  Clock,
  Crown,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Weekly Heart Health Summary",
    date: "March 15, 2024",
    type: "weekly",
    status: "excellent",
    summary: "Great job this week! Your heart rate patterns show excellent cardiovascular health. Keep up the regular exercise routine.",
    metrics: {
      avgHeartRate: 72,
      maxHeartRate: 145,
      minHeartRate: 58,
      exerciseMinutes: 185,
      stressLevel: "Low"
    },
    isPremium: true,
    generated: "7 days ago"
  },
  {
    id: 2,
    title: "Bi-weekly Health Analysis",
    date: "March 8, 2024",
    type: "biweekly",
    status: "good",
    summary: "Your heart health is looking good overall. We noticed slightly elevated stress levels mid-week. Consider relaxation techniques.",
    metrics: {
      avgHeartRate: 75,
      maxHeartRate: 152,
      minHeartRate: 61,
      exerciseMinutes: 142,
      stressLevel: "Moderate"
    },
    isPremium: false,
    generated: "14 days ago"
  },
  {
    id: 3,
    title: "Monthly Cardiovascular Report",
    date: "February 28, 2024",
    type: "monthly",
    status: "attention",
    summary: "This month showed some concerning patterns. Your resting heart rate has increased. We recommend consulting with your healthcare provider.",
    metrics: {
      avgHeartRate: 78,
      maxHeartRate: 165,
      minHeartRate: 64,
      exerciseMinutes: 98,
      stressLevel: "High"
    },
    isPremium: true,
    generated: "21 days ago"
  },
  {
    id: 4,
    title: "Bi-weekly Health Analysis",
    date: "February 15, 2024",
    type: "biweekly",
    status: "excellent",
    summary: "Outstanding cardiovascular performance! Your consistent exercise routine is paying off. All metrics are within optimal ranges.",
    metrics: {
      avgHeartRate: 70,
      maxHeartRate: 140,
      minHeartRate: 56,
      exerciseMinutes: 210,
      stressLevel: "Very Low"
    },
    isPremium: false,
    generated: "35 days ago"
  }
];

export default function Reports() {
  const { isDark, toggleTheme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-5 w-5 text-success" />;
      case "good": return <Info className="h-5 w-5 text-primary" />;
      case "attention": return <AlertTriangle className="h-5 w-5 text-warning" />;
      default: return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-success/10 text-success border-success/20";
      case "good": return "bg-primary/10 text-primary border-primary/20";
      case "attention": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getTypeColor = (type: string, isPremium: boolean) => {
    if (isPremium) {
      return "bg-gradient-primary text-white";
    }
    return "bg-secondary text-secondary-foreground";
  };

  const handleDownload = (reportId: number) => {
    toast({
      title: "Downloading report...",
      description: "Your health report is being prepared for download.",
    });
  };

  const filteredReports = reports.filter(report => {
    if (selectedTab === "all") return true;
    if (selectedTab === "weekly") return report.type === "weekly";
    if (selectedTab === "biweekly") return report.type === "biweekly";
    if (selectedTab === "monthly") return report.type === "monthly";
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} darkMode={isDark} toggleDarkMode={toggleTheme} />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                AI Health Reports
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-generated insights and analysis of your heart health patterns
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <Crown className="h-3 w-3" />
                Premium: Weekly Reports
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Free: Bi-weekly Reports
              </Badge>
            </div>
          </div>

          {/* Report Frequency Info */}
          <Card className="bg-gradient-hero border-0 shadow-card animate-fade-in">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary animate-heartbeat" />
                    Current Plan: Free Tier
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You receive AI health reports every 14 days with comprehensive analysis of your heart health patterns.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    Upgrade to Premium
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get weekly detailed reports with advanced analytics and family health insights.
                  </p>
                  <Button variant="hero" size="sm">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Filters */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="biweekly">Bi-weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab} className="space-y-6">
              {/* Reports Timeline */}
              <div className="space-y-6">
                {filteredReports.map((report, index) => (
                  <Card 
                    key={report.id} 
                    className="shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(report.status)}
                          <div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                            <CardDescription className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{report.date}</span>
                              <span>•</span>
                              <Clock className="h-4 w-4" />
                              <span>Generated {report.generated}</span>
                            </CardDescription>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={getTypeColor(report.type, report.isPremium)}
                            variant="outline"
                          >
                            {report.isPremium && <Crown className="h-3 w-3 mr-1" />}
                            {report.type}
                          </Badge>
                          <Badge 
                            className={getStatusColor(report.status)} 
                            variant="outline"
                          >
                            {report.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Summary */}
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4 text-secondary" />
                          AI Analysis Summary
                        </h4>
                        <p className="text-sm text-muted-foreground">{report.summary}</p>
                      </div>
                      
                      {/* Key Metrics */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          Key Metrics
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-primary">{report.metrics.avgHeartRate}</div>
                            <div className="text-xs text-muted-foreground">Avg HR (BPM)</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-success">{report.metrics.maxHeartRate}</div>
                            <div className="text-xs text-muted-foreground">Max HR (BPM)</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-secondary">{report.metrics.minHeartRate}</div>
                            <div className="text-xs text-muted-foreground">Min HR (BPM)</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-lg font-bold text-warning">{report.metrics.exerciseMinutes}</div>
                            <div className="text-xs text-muted-foreground">Exercise (min)</div>
                          </div>
                          <div className="text-center p-3 bg-muted/20 rounded-lg">
                            <div className="text-sm font-bold text-muted-foreground">{report.metrics.stressLevel}</div>
                            <div className="text-xs text-muted-foreground">Stress Level</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Next Report Info */}
              <Card className="bg-accent/30 border-accent shadow-card">
                <CardContent className="p-6 text-center">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Next Report Generation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your next bi-weekly AI health report will be generated in <strong>7 days</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Based on continuous monitoring of your heart rate, activity, and stress patterns
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingChatBot />
    </div>
  );
}