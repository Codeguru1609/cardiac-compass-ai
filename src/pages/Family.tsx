import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { useTheme } from "@/components/layout/ThemeProvider";
import { FloatingChatBot } from "@/components/chat/FloatingChatBot";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserPlus, 
  Heart, 
  Clock, 
  Search, 
  Send, 
  Check, 
  X, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Crown
} from "lucide-react";

const familyMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    relationship: "Spouse",
    status: "healthy",
    lastActive: "2 min ago",
    heartRate: 72,
    alerts: 0,
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 2,
    name: "Michael Johnson",
    email: "mike.j@email.com",
    relationship: "Child",
    status: "attention",
    lastActive: "1 hour ago",
    heartRate: 95,
    alerts: 1,
    avatar: "/placeholder-avatar.jpg"
  },
  {
    id: 3,
    name: "Mary Johnson",
    email: "mary.j@email.com",
    relationship: "Parent",
    status: "healthy",
    lastActive: "5 min ago",
    heartRate: 68,
    alerts: 0,
    avatar: "/placeholder-avatar.jpg"
  }
];

const pendingRequests = [
  {
    id: 1,
    name: "David Wilson",
    email: "david.w@email.com",
    type: "incoming",
    sentAt: "2 hours ago"
  },
  {
    id: 2,
    name: "Emma Davis",
    email: "emma.d@email.com",
    type: "outgoing",
    sentAt: "1 day ago"
  }
];

const familyAlerts = [
  {
    id: 1,
    member: "Michael Johnson",
    message: "Heart rate elevated above normal range",
    severity: "medium",
    time: "30 min ago",
    status: "active"
  },
  {
    id: 2,
    member: "Sarah Johnson",
    message: "Completed 5km run - excellent cardio session!",
    severity: "low",
    time: "2 hours ago",
    status: "resolved"
  }
];

export default function Family() {
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-success/10 text-success border-success/20";
      case "attention": return "bg-warning/10 text-warning border-warning/20";
      case "critical": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "border-l-success";
      case "medium": return "border-l-warning";
      case "high": return "border-l-destructive";
      default: return "border-l-muted";
    }
  };

  const handleSendRequest = () => {
    if (!newMemberEmail) {
      toast({
        title: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Invitation sent!",
      description: `Family invitation sent to ${newMemberEmail}`,
    });
    
    setNewMemberEmail("");
    setAddMemberOpen(false);
  };

  const handleRequestAction = (id: number, action: "accept" | "decline") => {
    toast({
      title: action === "accept" ? "Request accepted!" : "Request declined",
      description: action === "accept" ? "Family member added to your network" : "Request has been declined",
    });
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
                <Users className="h-8 w-8 text-secondary" />
                Family Health Network
                <Badge className="bg-gradient-primary text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and support your family's heart health together
              </p>
            </div>
            
            <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Add Family Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Family Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to connect and share heart health data
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="family@example.com"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setAddMemberOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendRequest}>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="members" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="members">Family Members</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="alerts">Alert History</TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              {/* Search */}
              <Card className="shadow-card">
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search family members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Family Members Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {familyMembers
                  .filter(member => 
                    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((member, index) => (
                    <Card 
                      key={member.id} 
                      className="shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader className="text-center pb-2">
                        <div className="mx-auto mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.relationship}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className={getStatusColor(member.status)} variant="outline">
                            {member.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Heart Rate</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-primary animate-heartbeat" />
                            <span className="font-medium">{member.heartRate} BPM</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Last Active</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.lastActive}</span>
                          </div>
                        </div>

                        {member.alerts > 0 && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Active Alerts</span>
                            <Badge variant="destructive">{member.alerts}</Badge>
                          </div>
                        )}

                        <Button variant="outline" className="w-full">
                          <Activity className="h-4 w-4 mr-2" />
                          View Health Data
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="grid gap-6">
                {pendingRequests.length === 0 ? (
                  <Card className="shadow-card">
                    <CardContent className="text-center py-12">
                      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                      <p className="text-muted-foreground">
                        Invite family members to start sharing health data
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingRequests.map((request) => (
                    <Card key={request.id} className="shadow-card">
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              {request.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{request.name}</h4>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={request.type === "incoming" ? "default" : "secondary"}>
                                {request.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{request.sentAt}</span>
                            </div>
                          </div>
                        </div>
                        
                        {request.type === "incoming" && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="success"
                              onClick={() => handleRequestAction(request.id, "accept")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, "decline")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        
                        {request.type === "outgoing" && (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="space-y-4">
                {familyAlerts.map((alert) => (
                  <Card 
                    key={alert.id} 
                    className={`shadow-card border-l-4 ${getAlertSeverityColor(alert.severity)}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{alert.member}</h4>
                            <Badge 
                              variant={alert.status === "active" ? "destructive" : "secondary"}
                              className="text-xs"
                            >
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{alert.time}</span>
                          </div>
                        </div>
                        <AlertTriangle 
                          className={`h-5 w-5 ${
                            alert.severity === "low" 
                              ? "text-success" 
                              : alert.severity === "medium" 
                              ? "text-warning" 
                              : "text-destructive"
                          }`} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <FloatingChatBot />
    </div>
  );
}