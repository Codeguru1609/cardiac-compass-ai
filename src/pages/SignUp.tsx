import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, ArrowRight, User, Phone, Mail, Calendar, Ruler, Weight } from "lucide-react";

interface SignUpForm {
  fullName: string;
  dateOfBirth: string;
  height: string;
  weight: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  emergencyContact1Name: string;
  emergencyContact1Phone: string;
  emergencyContact2Name: string;
  emergencyContact2Phone: string;
}

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    emergencyContact1Name: "",
    emergencyContact1Phone: "",
    emergencyContact2Name: "",
    emergencyContact2Phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: keyof SignUpForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate step 1
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Account created successfully!",
      description: "Welcome to HeartClutch. Let's choose your plan.",
    });
    
    navigate("/plan-selection");
    setLoading(false);
  };

  const handleGoogleAuth = () => {
    toast({
      title: "Google authentication would be implemented here",
      description: "This is a demo implementation",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity">
            <Heart className="h-8 w-8 text-primary animate-heartbeat" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              HeartClutch
            </span>
          </Link>
        </div>

        <Card className="shadow-elevated border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">
              Step {step} of 2 - {step === 1 ? "Personal Information" : "Emergency Contacts"}
            </CardDescription>
            <Progress value={step * 50} className="mt-4" />
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="col-span-2"
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
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Weight className="h-4 w-4" />
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <Button 
                  variant="outline" 
                  onClick={handleGoogleAuth}
                  className="w-full"
                >
                  Continue with Google
                </Button>

                <Button onClick={handleNextStep} className="w-full">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center text-sm text-muted-foreground mb-6">
                  Add up to 2 emergency contacts who will be notified during heart emergencies
                </div>

                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Emergency Contact 1</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Contact Name"
                        value={formData.emergencyContact1Name}
                        onChange={(e) => handleInputChange("emergencyContact1Name", e.target.value)}
                      />
                      <Input
                        placeholder="Phone Number"
                        value={formData.emergencyContact1Phone}
                        onChange={(e) => handleInputChange("emergencyContact1Phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium">Emergency Contact 2 (Optional)</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Contact Name"
                        value={formData.emergencyContact2Name}
                        onChange={(e) => handleInputChange("emergencyContact2Name", e.target.value)}
                      />
                      <Input
                        placeholder="Phone Number"
                        value={formData.emergencyContact2Phone}
                        onChange={(e) => handleInputChange("emergencyContact2Phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    loading={loading}
                    className="flex-1"
                  >
                    Create Account
                  </Button>
                </div>

                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/plan-selection")}
                  className="w-full text-sm"
                >
                  Skip for now
                </Button>
              </div>
            )}

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}