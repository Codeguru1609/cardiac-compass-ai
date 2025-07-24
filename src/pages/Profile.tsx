import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Navbar } from "@/components/layout/Navbar";
import { useTheme } from "@/components/layout/ThemeProvider";
import { FloatingChatBot } from "@/components/chat/FloatingChatBot";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Camera, 
  Save, 
  Phone, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight,
  Edit,
  Trash2,
  Plus,
  Crown,
  Shield
} from "lucide-react";

const emergencyContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    relationship: "Spouse"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    phone: "+1 (555) 987-6543",
    relationship: "Primary Care Doctor"
  }
];

export default function Profile() {
  const { isDark, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-06-15",
    height: "175",
    weight: "70",
    profilePicture: "/placeholder-avatar.jpg"
  });
  
  const [editData, setEditData] = useState(profileData);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });
  const [addContactOpen, setAddContactOpen] = useState(false);
  
  const { toast } = useToast();

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profile updated successfully",
      description: "Your profile information has been saved.",
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleAddContact = () => {
    if (emergencyContacts.length >= 2) {
      setShowUpgradeModal(true);
      return;
    }
    
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Emergency contact added",
      description: `${newContact.name} has been added to your emergency contacts.`,
    });
    
    setNewContact({ name: "", phone: "", relationship: "" });
    setAddContactOpen(false);
  };

  const handleDeleteContact = (id: number) => {
    toast({
      title: "Emergency contact removed",
      description: "Contact has been removed from your emergency list.",
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Redirecting to upgrade...",
      description: "Taking you to the premium plan selection.",
    });
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={true} darkMode={isDark} toggleDarkMode={toggleTheme} />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
              <User className="h-8 w-8 text-primary" />
              Profile Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your personal information and emergency contacts
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details and health metrics
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileData.profilePicture} alt="Profile" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {profileData.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={isEditing ? editData.fullName : profileData.fullName}
                        onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editData.email : profileData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={isEditing ? editData.phone : profileData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={isEditing ? editData.dateOfBirth : profileData.dateOfBirth}
                        onChange={(e) => setEditData({...editData, dateOfBirth: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height" className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        value={isEditing ? editData.height : profileData.height}
                        onChange={(e) => setEditData({...editData, height: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        value={isEditing ? editData.weight : profileData.weight}
                        onChange={(e) => setEditData({...editData, weight: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card className="shadow-card animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-destructive" />
                      Emergency Contacts
                      <Badge variant="outline">{emergencyContacts.length}/2</Badge>
                    </CardTitle>
                    <CardDescription>
                      People to contact during heart health emergencies
                    </CardDescription>
                  </div>
                  
                  <Dialog open={addContactOpen} onOpenChange={setAddContactOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Emergency Contact</DialogTitle>
                        <DialogDescription>
                          Add someone who should be notified during health emergencies
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Name *</Label>
                          <Input
                            id="contactName"
                            placeholder="Contact name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactPhone">Phone Number *</Label>
                          <Input
                            id="contactPhone"
                            placeholder="+1 (555) 123-4567"
                            value={newContact.phone}
                            onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactRelationship">Relationship</Label>
                          <Input
                            id="contactRelationship"
                            placeholder="e.g., Spouse, Doctor, Friend"
                            value={newContact.relationship}
                            onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setAddContactOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddContact}>
                            Add Contact
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                        {contact.relationship && (
                          <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {emergencyContacts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No emergency contacts added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Account Status */}
            <div className="space-y-6">
              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      Free Plan
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-4">
                      You're currently on the free plan with basic heart monitoring features.
                    </p>
                    <Button variant="hero" className="w-full">
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Account Created</span>
                    <span className="text-sm font-medium">Jan 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reports Generated</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Days Monitored</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emergency Contacts</span>
                    <span className="text-sm font-medium">{emergencyContacts.length}/2</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Upgrade Required
            </DialogTitle>
            <DialogDescription>
              Free accounts are limited to 2 emergency contacts. Upgrade to Premium for unlimited contacts and more features.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-primary/10 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Premium Benefits:</h4>
              <ul className="text-sm space-y-1">
                <li>• Unlimited emergency contacts</li>
                <li>• Family health monitoring</li>
                <li>• Advanced analytics</li>
                <li>• Weekly health reports</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                Maybe Later
              </Button>
              <Button variant="hero" onClick={handleUpgrade}>
                Upgrade Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <FloatingChatBot />
    </div>
  );
}