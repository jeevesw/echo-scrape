import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, CheckCircle2, Calendar } from "lucide-react";

interface FormData {
  companySize: string;
  productRisk: string;
  advertisingChannels: string[];
  creativeStyle: string;
  name: string;
  email: string;
}

const TOTAL_STEPS = 5;

const HFSSAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companySize: "",
    productRisk: "",
    advertisingChannels: [],
    creativeStyle: "",
    name: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companySize !== "";
      case 2:
        return formData.productRisk !== "";
      case 3:
        return formData.advertisingChannels.length > 0;
      case 4:
        return formData.creativeStyle !== "";
      case 5:
        return formData.email !== "" && validateEmail(formData.email);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      advertisingChannels: prev.advertisingChannels.includes(channel)
        ? prev.advertisingChannels.filter((c) => c !== channel)
        : [...prev.advertisingChannels, channel],
    }));
  };

  const handleSubmit = () => {
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    // Log submission (in production, this would go to a backend)
    console.log("HFSS Assessment Submission:", {
      ...formData,
      tag: "HFSS Assessment",
      submittedAt: new Date().toISOString(),
    });

    toast({
      title: "Assessment submitted!",
      description: "We'll send your tailored overview shortly.",
    });

    setIsSubmitted(true);
  };

  const isAffected = () => {
    // Simple logic to determine if brand is likely affected
    const hasRiskyProducts = formData.productRisk === "yes-core" || formData.productRisk === "some-items";
    const usesAffectedChannels = formData.advertisingChannels.some(
      (c) => c !== "no-paid-ads"
    );
    return hasRiskyProducts && usesAffectedChannels;
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 bg-background min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-12 pb-10 px-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="heading-display text-3xl md:text-4xl text-foreground mb-4">
                  Thanks{formData.name ? `, ${formData.name}` : ""}!
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {isAffected() ? (
                    <>
                      Based on your answers, <strong className="text-foreground">your brand may be affected</strong> by the 2026 advertising rules.
                      We're preparing a tailored overview for you.
                    </>
                  ) : (
                    <>
                      Based on your answers, your brand appears to have <strong className="text-foreground">lower exposure</strong> to the 2026 rules.
                      We'll still send you a helpful overview to keep you informed.
                    </>
                  )}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Check your inbox at <strong className="text-foreground">{formData.email}</strong>
                </p>
                <Button variant="hero-outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Book a Free Compliance Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-background min-h-[80vh]">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Intro */}
          <div className="text-center mb-8">
            <h1 className="heading-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-3">
              Is Your Brand Affected by the 'Less Healthy Food' Ad Ban?
            </h1>
            <p className="text-muted-foreground text-lg">
              Find out in 60 seconds if the 2026 ad rules affect your brand.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Answer four quick questions and we'll send you a tailored compliance overview.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-8 pb-6 px-6 md:px-8">
              {/* Step 1 - Company Size */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      How many people does your business employ?
                    </CardTitle>
                  </CardHeader>
                  <RadioGroup
                    value={formData.companySize}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companySize: value })
                    }
                    className="space-y-3"
                  >
                    {[
                      { value: "under-250", label: "Fewer than 250 employees" },
                      { value: "250-plus", label: "250+ employees" },
                      { value: "not-sure", label: "Not sure" },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={option.value}
                        className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <span className="text-foreground">{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 2 - Product Risk */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      Do you sell or promote food or drink that could be classed as 'less healthy'?
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      This includes products high in fat, sugar, or salt (HFSS).
                    </CardDescription>
                  </CardHeader>
                  <RadioGroup
                    value={formData.productRisk}
                    onValueChange={(value) =>
                      setFormData({ ...formData, productRisk: value })
                    }
                    className="space-y-3"
                  >
                    {[
                      { value: "yes-core", label: "Yes — core menu includes HFSS-style products" },
                      { value: "some-items", label: "Some items, but not our main focus" },
                      { value: "mostly-compliant", label: "No — mostly compliant / healthy options" },
                      { value: "not-sure", label: "Not sure" },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`product-${option.value}`}
                        className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={option.value} id={`product-${option.value}`} />
                        <span className="text-foreground">{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 3 - Advertising Channels */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      Where do you currently advertise your food or drink products?
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      Select all that apply.
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-3">
                    {[
                      { value: "paid-social", label: "Paid social (Meta, TikTok, Snapchat)" },
                      { value: "influencer", label: "Influencer partnerships" },
                      { value: "display", label: "Display / programmatic ads" },
                      { value: "search", label: "Search ads" },
                      { value: "delivery-platforms", label: "Delivery platforms (Uber Eats, Deliveroo, etc.)" },
                      { value: "no-paid-ads", label: "We don't run paid ads" },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`channel-${option.value}`}
                        className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <Checkbox
                          id={`channel-${option.value}`}
                          checked={formData.advertisingChannels.includes(option.value)}
                          onCheckedChange={() => handleChannelToggle(option.value)}
                        />
                        <span className="text-foreground">{option.label}</span>
                      </Label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4 - Creative Style */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      How would you describe your current food advertising content?
                    </CardTitle>
                  </CardHeader>
                  <RadioGroup
                    value={formData.creativeStyle}
                    onValueChange={(value) =>
                      setFormData({ ...formData, creativeStyle: value })
                    }
                    className="space-y-3"
                  >
                    {[
                      { value: "real-photo", label: "Real photography / video of our food" },
                      { value: "ai-stylised", label: "AI-generated or stylised images" },
                      { value: "cartoon", label: "Cartoon / illustrated visuals" },
                      { value: "text-based", label: "Mostly text-based promotions" },
                      { value: "not-sure", label: "Not sure" },
                    ].map((option) => (
                      <Label
                        key={option.value}
                        htmlFor={`creative-${option.value}`}
                        className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <RadioGroupItem value={option.value} id={`creative-${option.value}`} />
                        <span className="text-foreground">{option.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Step 5 - Contact Details */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl md:text-2xl text-foreground">
                      Get Your Compliance Overview
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-2">
                      We'll only use this to send your assessment and guidance.
                    </CardDescription>
                  </CardHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground mb-2 block">
                        Name <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground mb-2 block">
                        Email address <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setEmailError("");
                        }}
                        className={`h-12 ${emailError ? "border-destructive" : ""}`}
                        required
                      />
                      {emailError && (
                        <p className="text-sm text-destructive mt-1">{emailError}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < TOTAL_STEPS ? (
                  <Button
                    variant="hero"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    Get My Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default HFSSAssessment;
